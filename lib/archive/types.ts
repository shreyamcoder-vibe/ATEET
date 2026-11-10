/**
 * ATEET Heritage Archive Data Types
 * Cultural & Architectural Heritage Archive Data Model
 * 
 * Reusable, strongly typed archival data model designed to support:
 * 1. Heritage Archive Management & Provenance
 * 2. OCR & Document Understanding
 * 3. Intelligent Multi-Tier Search
 * 4. Geospatial Heritage Mapping
 * 5. Source-Grounded AI Knowledge Retrieval
 * 6. Interactive 3D Architectural Hotspots
 */

export type MonumentId = "adalaj_stepwell" | "rani_ki_vav";

/**
 * Strict verification status distinguishing authentic historical evidence
 * from approximate annotations or machine-extracted inferences.
 *
 * - primary_source_verified: Historical claim is directly supported by a primary historical source (in situ epigraph, primary manuscript, 19th-c photograph).
 * - scholarly_verified: Historical claim is supported by credible scholarly or institutional evidence (ASI surveys, peer-reviewed monographs).
 * - approximate_historical: Historical claim is plausible but insufficiently established.
 * - machine_extracted: Extracted via OCR or NER algorithms (pending human scholar verification).
 * - illustrative_demonstration: Included for architectural diagramming or UI demonstration.
 */
export type ArchiveVerificationStatus =
  | "primary_source_verified"
  | "scholarly_verified"
  | "approximate_historical"
  | "machine_extracted"
  | "illustrative_demonstration";

export type ArchiveCategory =
  | "historical_photograph"
  | "architectural_drawing"
  | "epigraphic_inscription"
  | "archival_survey_report"
  | "field_notebook_record";

export type SubterraneanTierAdalaj =
  | "ground_level"
  | "tier_1_entrance_mandapa"
  | "tier_2_intermediate_colonnade"
  | "tier_3_octagonal_shaft"
  | "tier_4_lower_gallery"
  | "tier_5_water_basin";

export type SubterraneanTierRaniKiVav =
  | "ground_level"
  | "level_1"
  | "level_2"
  | "level_3"
  | "level_4_pillared_hall"
  | "level_5"
  | "level_6"
  | "level_7_deep_shaft";

export type SubterraneanTier = SubterraneanTierAdalaj | SubterraneanTierRaniKiVav | string;

export interface GeospatialCoordinate {
  latitude: number;
  longitude: number;
  elevationMeters?: number;
  /** Subterranean depth below ground surface in meters */
  subterraneanDepthMeters?: number;
}

export type EntityCategory =
  | "architectural_term"
  | "historical_figure"
  | "ruling_dynasty"
  | "historical_date"
  | "geographic_location"
  | "monetary_amount"
  | "deity_or_mythology";

export interface ExtractedEntity {
  id: string;
  text: string;
  category: EntityCategory;
  /** Confidence score between 0.0 and 1.0 */
  confidenceScore: number;
  /** Grounded scholarly translation or definition */
  verifiedMeaning?: string;
}

export interface TranscriptionData {
  originalLanguage: "sanskrit" | "persian" | "english" | "gujarati";
  script: "devanagari" | "nastaliq" | "latin" | "gujarati";
  rawText: string;
  englishTranslation: string;
  scholarlyNotes?: string;
  ocrConfidence: number;
  isHumanVerified: boolean;
}

export interface ProvenanceMetadata {
  /** Holding archive, museum, or official survey collection */
  repositoryOrCollection: string;
  /** Custodial provenance or historical survey history */
  custodialHistory?: string;
  /** Plate number, folio, or catalog identifier */
  accessionOrPlateNumber?: string;
  /** Verifiable copyright / open license status */
  license: string;
  /** Author or photographer attribution */
  attribution: string;
  /** Direct URL to primary repository or verified Wikimedia Commons file */
  sourceUrl: string;
  sourceType:
    | "wikimedia_commons"
    | "asi_official"
    | "scholarly_publication"
    | "epigraphia_indica"
    | "inha_archives";
}

/**
 * 3D Hotspot Anchor linking an archival record directly
 * to architectural spatial coordinates in Three.js / React Three Fiber.
 */
export interface HotspotAnchor {
  hotspotId: string;
  label: string;
  targetTier: SubterraneanTier;
  /** Normalized 3D position vector in procedural/architectural stepwell space */
  spatialCoordinates3D: {
    x: number;
    y: number;
    z: number;
  };
  architecturalZone: string;
}

export interface HeritageSite {
  id: MonumentId;
  name: string;
  vernacularName: string;
  typology: "stepwell_vav" | "temple" | "palace" | "fort";
  location: {
    cityOrVillage: string;
    district: string;
    state: string;
    country: string;
    coordinates: GeospatialCoordinate;
  };
  period: string;
  completionYearVerified: number | null;
  completionYearApproximate?: string;
  dynasty: string;
  patrons: string[];
  architecturalStyle: string;
  totalSubterraneanTiers: number;
  depthMeters: number;
  lengthMeters: number;
  orientation: string;
  summaryDescription: string;
  primaryImage: {
    url: string;
    attribution: string;
    license: string;
    sourceUrl: string;
  };
}

export interface ArchiveRecord {
  /** Unique archival identifier, e.g. ADL-EPI-1498 */
  id: string;
  monumentId: MonumentId;
  title: string;
  category: ArchiveCategory;
  verificationStatus: ArchiveVerificationStatus;
  /** Exact historical year or date if verified by inscription/record */
  dateCreatedVerified?: string;
  /** Approximate date, e.g. "Late 15th Century (c. 1498)" */
  dateCreatedApproximate?: string;
  /** Spatial tier within subterranean monument */
  tier?: SubterraneanTier;
  geospatial?: GeospatialCoordinate;
  hotspot?: HotspotAnchor;
  description: string;
  /** Authentic high-res image URL or document scan URL */
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: "image/jpeg" | "image/png" | "text/plain";
  /**
   * Explicit relationship between the media asset and the archival record:
   * - authentic_original: The media file directly depicts or is the primary historical asset.
   * - contextual_representative: The media depicts the architectural space/context rather than the specific artifact itself.
   * - illustrative_proxy: The media is an illustrative contemporary or comparative photo used where historical scans are pending.
   */
  mediaRole?: "authentic_original" | "contextual_representative" | "illustrative_proxy";
  /** Explanatory note detailing the relationship between the media and the record */
  mediaNote?: string;
  provenance: ProvenanceMetadata;
  transcription?: TranscriptionData;
  entities: ExtractedEntity[];
  relatedRecordIds: string[];
  tags: string[];
}

export interface SearchFilterOptions {
  query?: string;
  monumentId?: MonumentId | "all";
  category?: ArchiveCategory | "all";
  verificationStatus?: ArchiveVerificationStatus | "all";
  tier?: string;
  entityType?: EntityCategory;
}

