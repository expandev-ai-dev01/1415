/**
 * @utility speciesValidation
 * @summary Validation utilities for species data
 * @domain species
 * @category validation
 */

import type { SpeciesValidationError } from '../types';

/**
 * @validation Species name validation
 * @rule {binomial-nomenclature} Must contain genus and species (two words)
 * @rule {capitalization} Genus must start with uppercase, species with lowercase
 * @rule {max-length} Maximum 100 characters
 * @rule {allowed-characters} Only latin characters, hyphens, and spaces
 */
export const validateSpeciesName = (name: string): SpeciesValidationError[] => {
  const errors: SpeciesValidationError[] = [];

  // Check if empty
  if (!name || name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Nome científico completo da espécie de dinossauro é obrigatório',
    });
    return errors;
  }

  // Check max length (RU-004)
  if (name.length > 100) {
    errors.push({
      field: 'name',
      message: 'O nome científico deve ter no máximo 100 caracteres',
    });
  }

  // Check allowed characters (RU-005)
  const allowedCharsRegex = /^[a-zA-Z\s-]+$/;
  if (!allowedCharsRegex.test(name)) {
    errors.push({
      field: 'name',
      message: 'O nome deve conter apenas caracteres latinos, hífens e espaços',
    });
  }

  // Check binomial nomenclature (RU-002)
  const words = name.trim().split(/\s+/);
  if (words.length !== 2) {
    errors.push({
      field: 'name',
      message: 'O nome deve seguir a nomenclatura binomial (gênero e espécie)',
    });
    return errors;
  }

  const [genus, species] = words;

  // Check genus capitalization (RU-003)
  if (genus[0] !== genus[0].toUpperCase()) {
    errors.push({
      field: 'name',
      message: 'O gênero deve iniciar com letra maiúscula',
    });
  }

  // Check species capitalization (RU-003)
  if (species[0] !== species[0].toLowerCase()) {
    errors.push({
      field: 'name',
      message: 'A espécie deve iniciar com letra minúscula',
    });
  }

  return errors;
};

/**
 * @utility Character counter
 * @summary Returns character count and remaining characters
 */
export const getCharacterCount = (value: string, maxLength: number = 100) => {
  const current = value.length;
  const remaining = maxLength - current;
  const isOverLimit = current > maxLength;

  return {
    current,
    remaining,
    isOverLimit,
    percentage: (current / maxLength) * 100,
  };
};
