import { ARCHIVE_RECORDS, HERITAGE_SITES } from "./data";
import {
  ArchiveCategory,
  ArchiveRecord,
  EntityCategory,
  ExtractedEntity,
  HeritageSite,
  MonumentId,
  SearchFilterOptions,
} from "./types";

export * from "./types";
export * from "./data";

/**
 * Returns all registered heritage sites.
 */
export function getHeritageSites(): HeritageSite[] {
  return Object.values(HERITAGE_SITES);
}

/**
 * Returns a specific heritage site by its ID.
 */
export function getHeritageSite(id: MonumentId): HeritageSite | undefined {
  return HERITAGE_SITES[id];
}

/**
 * Returns all verified archival records across monuments.
 */
export function getAllArchiveRecords(): ArchiveRecord[] {
  return ARCHIVE_RECORDS;
}

/**
 * Retrieves a single archival record by its unique ID.
 */
export function getRecordById(id: string): ArchiveRecord | undefined {
  return ARCHIVE_RECORDS.find((record) => record.id === id);
}

/**
 * Returns records associated with a specific monument.
 */
export function getRecordsByMonument(monumentId: MonumentId): ArchiveRecord[] {
  return ARCHIVE_RECORDS.filter((record) => record.monumentId === monumentId);
}

/**
 * Returns records mapped to a specific subterranean tier within a monument.
 */
export function getRecordsByTier(monumentId: MonumentId, tier: string): ArchiveRecord[] {
  return ARCHIVE_RECORDS.filter(
    (record) => record.monumentId === monumentId && record.tier === tier
  );
}

/**
 * Returns records filtered by archival category.
 */
export function getRecordsByCategory(category: ArchiveCategory): ArchiveRecord[] {
  return ARCHIVE_RECORDS.filter((record) => record.category === category);
}

/**
 * Returns records that possess 3D hotspot coordinates for spatial rendering.
 */
export function getRecordsWithHotspots(monumentId?: MonumentId): ArchiveRecord[] {
  return ARCHIVE_RECORDS.filter((record) => {
    if (!record.hotspot) return false;
    if (monumentId && record.monumentId !== monumentId) return false;
    return true;
  });
}

/**
 * Aggregates all extracted named entities across archival documents.
 */
export function getAllExtractedEntities(entityType?: EntityCategory): ExtractedEntity[] {
  const entityMap = new Map<string, ExtractedEntity>();

  for (const record of ARCHIVE_RECORDS) {
    for (const entity of record.entities) {
      if (!entityType || entity.category === entityType) {
        if (!entityMap.has(entity.id)) {
          entityMap.set(entity.id, entity);
        }
      }
    }
  }

  return Array.from(entityMap.values());
}

/**
 * Multi-criteria search function supporting text queries, filters,
 * entities, verification statuses, and subterranean tiers.
 */
export function searchArchive(options: SearchFilterOptions): ArchiveRecord[] {
  const { query, monumentId, category, verificationStatus, tier, entityType } = options;

  return ARCHIVE_RECORDS.filter((record) => {
    // Filter by Monument
    if (monumentId && monumentId !== "all" && record.monumentId !== monumentId) {
      return false;
    }

    // Filter by Category
    if (category && category !== "all" && record.category !== category) {
      return false;
    }

    // Filter by Verification Status
    if (
      verificationStatus &&
      verificationStatus !== "all" &&
      record.verificationStatus !== verificationStatus
    ) {
      return false;
    }

    // Filter by Subterranean Tier
    if (tier && tier !== "all" && record.tier !== tier) {
      return false;
    }

    // Filter by Entity Type presence
    if (entityType && !record.entities.some((e) => e.category === entityType)) {
      return false;
    }

    // Search query matching (title, description, tags, entities, transcription)
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      const inTitle = record.title.toLowerCase().includes(q);
      const inDesc = record.description.toLowerCase().includes(q);
      const inTags = record.tags.some((t) => t.toLowerCase().includes(q));
      const inEntities = record.entities.some(
        (e) =>
          e.text.toLowerCase().includes(q) ||
          (e.verifiedMeaning && e.verifiedMeaning.toLowerCase().includes(q))
      );
      const inTranscription =
        record.transcription &&
        (record.transcription.rawText.toLowerCase().includes(q) ||
          record.transcription.englishTranslation.toLowerCase().includes(q));

      if (!inTitle && !inDesc && !inTags && !inEntities && !inTranscription) {
        return false;
      }
    }

    return true;
  });
}
