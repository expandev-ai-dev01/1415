/**
 * @module species/components/SpeciesForm
 * @summary Type definitions for SpeciesForm component
 */

import type { Species, SpeciesFormData } from '../../types';

export interface SpeciesFormProps {
  initialData?: Species;
  onSubmit: (data: SpeciesFormData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}
