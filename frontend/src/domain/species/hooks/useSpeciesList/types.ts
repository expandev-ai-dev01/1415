/**
 * @module species/hooks/useSpeciesList
 * @summary Type definitions for useSpeciesList hook
 */

import type { Species, SpeciesListParams } from '../../types';

export interface UseSpeciesListOptions {
  filters?: SpeciesListParams;
  enabled?: boolean;
}

export interface UseSpeciesListReturn {
  data: Species[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
