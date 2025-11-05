/**
 * @component SpeciesForm
 * @summary Form component for creating/editing species with real-time validation
 * @domain species
 * @type domain-component
 * @category form
 *
 * @description
 * Implements comprehensive validation for species scientific names:
 * - Binomial nomenclature (genus + species)
 * - Proper capitalization (Genus species)
 * - Character restrictions (latin, hyphens, spaces)
 * - Maximum length (100 characters)
 * - Real-time validation feedback
 * - Character counter
 */

import { useState, useEffect } from 'react';
import { validateSpeciesName, getCharacterCount } from '../../utils/validation';
import type { SpeciesFormProps } from './types';
import {
  getSpeciesFormClassName,
  getInputClassName,
  getLabelClassName,
  getErrorClassName,
  getHelpTextClassName,
  getCharCountClassName,
  getButtonClassName,
} from './variants';

export const SpeciesForm = (props: SpeciesFormProps) => {
  const { initialData, onSubmit, onCancel, isSubmitting = false } = props;

  const [name, setName] = useState(initialData?.name || '');
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  // Real-time validation (FRONT-060)
  useEffect(() => {
    if (touched) {
      const validationErrors = validateSpeciesName(name);
      setErrors(validationErrors.map((e) => e.message));
    }
  }, [name, touched]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const validationErrors = validateSpeciesName(name);
    if (validationErrors.length > 0) {
      setErrors(validationErrors.map((e) => e.message));
      return;
    }

    try {
      await onSubmit({ name });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      }
    }
  };

  const charCount = getCharacterCount(name, 100);
  const hasErrors = touched && errors.length > 0;
  const canSubmit = !hasErrors && name.trim().length > 0 && !isSubmitting;

  return (
    <form onSubmit={handleSubmit} className={getSpeciesFormClassName({})}>
      <div>
        <label htmlFor="species-name" className={getLabelClassName()}>
          Nome Científico da Espécie *
        </label>

        <input
          id="species-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          className={getInputClassName(hasErrors)}
          placeholder="Ex: Tyrannosaurus rex"
          maxLength={100}
          disabled={isSubmitting}
          aria-invalid={hasErrors}
          aria-describedby="species-name-help species-name-error species-name-count"
        />

        <p id="species-name-help" className={getHelpTextClassName()}>
          Nome científico completo da espécie de dinossauro no formato taxonômico padrão (gênero e
          espécie)
        </p>

        {hasErrors && (
          <div id="species-name-error" role="alert">
            {errors.map((error, index) => (
              <p key={index} className={getErrorClassName()}>
                {error}
              </p>
            ))}
          </div>
        )}

        <p id="species-name-count" className={getCharCountClassName(charCount.isOverLimit)}>
          {charCount.current} / 100 caracteres
          {charCount.isOverLimit && ' (limite excedido)'}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className={getButtonClassName('primary', !canSubmit)}
        >
          {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={getButtonClassName('secondary', isSubmitting)}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
