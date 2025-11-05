/**
 * @module species/hooks/useSpeciesCreate
 * @summary Type definitions for useSpeciesCreate hook
 */

import type { Species, CreateSpeciesDto } from '../../types';

export interface UseSpeciesCreateOptions {
  onSuccess?: (data: Species) => void;
  onError?: (error: Error) => void;
}

export interface UseSpeciesCreateReturn {
  create: (data: CreateSpeciesDto) => Promise<Species>;
  isCreating: boolean;
  error: Error | null;
}
