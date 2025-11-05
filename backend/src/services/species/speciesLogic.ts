/**
 * @summary
 * Business logic for dinosaur species management
 *
 * @module services/species
 */

import { validateScientificNameFormat } from '@/services/species/speciesValidation';
import {
  SpeciesCreateRequest,
  SpeciesEntity,
  SpeciesListResponse,
} from '@/services/species/speciesTypes';

const speciesStorage: SpeciesEntity[] = [];
let nextId = 1;

/**
 * @summary
 * Creates a new dinosaur species
 *
 * @function speciesCreate
 * @module services/species
 *
 * @param {SpeciesCreateRequest} params - Species creation parameters
 *
 * @returns {Promise<SpeciesEntity>} Created species entity
 *
 * @throws {Error} When validation fails
 */
export async function speciesCreate(params: SpeciesCreateRequest): Promise<SpeciesEntity> {
  validateScientificNameFormat(params.name);

  const existingSpecies = speciesStorage.find(
    (s) => s.name.toLowerCase() === params.name.toLowerCase()
  );

  if (existingSpecies) {
    throw new Error('speciesAlreadyExists');
  }

  const newSpecies: SpeciesEntity = {
    id: nextId++,
    name: params.name.trim(),
    dateCreated: new Date(),
    dateModified: new Date(),
  };

  speciesStorage.push(newSpecies);

  return newSpecies;
}

/**
 * @summary
 * Lists all dinosaur species
 *
 * @function speciesList
 * @module services/species
 *
 * @returns {Promise<SpeciesListResponse[]>} List of species
 */
export async function speciesList(): Promise<SpeciesListResponse[]> {
  return speciesStorage.map((species) => ({
    id: species.id,
    name: species.name,
    dateCreated: species.dateCreated,
  }));
}

/**
 * @summary
 * Gets a specific dinosaur species by ID
 *
 * @function speciesGet
 * @module services/species
 *
 * @param {number} id - Species identifier
 *
 * @returns {Promise<SpeciesEntity>} Species entity
 *
 * @throws {Error} When species not found
 */
export async function speciesGet(id: number): Promise<SpeciesEntity> {
  const species = speciesStorage.find((s) => s.id === id);

  if (!species) {
    throw new Error('speciesNotFound');
  }

  return species;
}

/**
 * @summary
 * Updates a dinosaur species
 *
 * @function speciesUpdate
 * @module services/species
 *
 * @param {number} id - Species identifier
 * @param {SpeciesCreateRequest} params - Updated species data
 *
 * @returns {Promise<SpeciesEntity>} Updated species entity
 *
 * @throws {Error} When species not found or validation fails
 */
export async function speciesUpdate(
  id: number,
  params: SpeciesCreateRequest
): Promise<SpeciesEntity> {
  validateScientificNameFormat(params.name);

  const speciesIndex = speciesStorage.findIndex((s) => s.id === id);

  if (speciesIndex === -1) {
    throw new Error('speciesNotFound');
  }

  const existingSpecies = speciesStorage.find(
    (s) => s.id !== id && s.name.toLowerCase() === params.name.toLowerCase()
  );

  if (existingSpecies) {
    throw new Error('speciesAlreadyExists');
  }

  speciesStorage[speciesIndex] = {
    ...speciesStorage[speciesIndex],
    name: params.name.trim(),
    dateModified: new Date(),
  };

  return speciesStorage[speciesIndex];
}

/**
 * @summary
 * Deletes a dinosaur species
 *
 * @function speciesDelete
 * @module services/species
 *
 * @param {number} id - Species identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When species not found
 */
export async function speciesDelete(id: number): Promise<void> {
  const speciesIndex = speciesStorage.findIndex((s) => s.id === id);

  if (speciesIndex === -1) {
    throw new Error('speciesNotFound');
  }

  speciesStorage.splice(speciesIndex, 1);
}
