/**
 * @summary
 * Validation functions for dinosaur species data
 *
 * @module services/species
 */

/**
 * @summary
 * Validates scientific name format following binomial nomenclature
 *
 * @function validateScientificNameFormat
 * @module services/species
 *
 * @param {string} name - Scientific name to validate
 *
 * @throws {Error} When name doesn't follow binomial nomenclature
 * @throws {Error} When genus doesn't start with uppercase
 * @throws {Error} When species doesn't start with lowercase
 * @throws {Error} When name contains invalid characters
 * @throws {Error} When name exceeds maximum length
 *
 * @returns {void}
 */
export function validateScientificNameFormat(name: string): void {
  if (!name || name.trim().length === 0) {
    throw new Error('scientificNameRequired');
  }

  if (name.length > 100) {
    throw new Error('scientificNameExceedsMaxLength');
  }

  const latinCharactersPattern = /^[A-Za-z\s-]+$/;
  if (!latinCharactersPattern.test(name)) {
    throw new Error('scientificNameInvalidCharacters');
  }

  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) {
    throw new Error('scientificNameMustFollowBinomialNomenclature');
  }

  const genus = parts[0];
  const species = parts[1];

  if (genus.length === 0 || genus[0] !== genus[0].toUpperCase()) {
    throw new Error('genusMustStartWithUppercase');
  }

  if (species.length === 0 || species[0] !== species[0].toLowerCase()) {
    throw new Error('speciesMustStartWithLowercase');
  }
}
