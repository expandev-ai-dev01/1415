/**
 * @summary
 * Unit tests for species validation functions
 *
 * @module services/species
 */

import { validateScientificNameFormat } from '@/services/species/speciesValidation';

describe('validateScientificNameFormat', () => {
  it('should accept valid binomial nomenclature', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus rex')).not.toThrow();
    expect(() => validateScientificNameFormat('Velociraptor mongoliensis')).not.toThrow();
    expect(() => validateScientificNameFormat('Brachiosaurus altithorax')).not.toThrow();
  });

  it('should accept names with hyphens', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus-rex magnus')).not.toThrow();
  });

  it('should reject empty or null names', () => {
    expect(() => validateScientificNameFormat('')).toThrow('scientificNameRequired');
    expect(() => validateScientificNameFormat('   ')).toThrow('scientificNameRequired');
  });

  it('should reject names exceeding 100 characters', () => {
    const longName = 'A'.repeat(50) + ' ' + 'b'.repeat(51);
    expect(() => validateScientificNameFormat(longName)).toThrow('scientificNameExceedsMaxLength');
  });

  it('should reject names with invalid characters', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus rex123')).toThrow(
      'scientificNameInvalidCharacters'
    );
    expect(() => validateScientificNameFormat('Tyrannosaurus rex!')).toThrow(
      'scientificNameInvalidCharacters'
    );
    expect(() => validateScientificNameFormat('Tyrannosaurus_rex')).toThrow(
      'scientificNameInvalidCharacters'
    );
  });

  it('should reject names not following binomial nomenclature', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus')).toThrow(
      'scientificNameMustFollowBinomialNomenclature'
    );
  });

  it('should reject genus not starting with uppercase', () => {
    expect(() => validateScientificNameFormat('tyrannosaurus rex')).toThrow(
      'genusMustStartWithUppercase'
    );
  });

  it('should reject species not starting with lowercase', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus Rex')).toThrow(
      'speciesMustStartWithLowercase'
    );
  });

  it('should handle multiple spaces between words', () => {
    expect(() => validateScientificNameFormat('Tyrannosaurus  rex')).not.toThrow();
  });
});
