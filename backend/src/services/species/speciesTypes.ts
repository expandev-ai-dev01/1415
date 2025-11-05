/**
 * @summary
 * Type definitions for dinosaur species management
 *
 * @module services/species
 */

export interface SpeciesCreateRequest {
  name: string;
}

export interface SpeciesEntity {
  id: number;
  name: string;
  dateCreated: Date;
  dateModified: Date;
}

export interface SpeciesListResponse {
  id: number;
  name: string;
  dateCreated: Date;
}
