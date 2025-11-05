/**
 * @module species/types
 * @summary Type definitions for species domain
 * @domain species
 * @category types
 */

export interface Species {
  id: number;
  name: string;
  dateCreated: string;
  dateModified: string;
}

export interface CreateSpeciesDto {
  name: string;
}

export interface UpdateSpeciesDto {
  name: string;
}

export interface SpeciesListParams {
  page?: number;
  pageSize?: number;
}

export interface SpeciesFormData {
  name: string;
}

export interface SpeciesValidationError {
  field: string;
  message: string;
}
