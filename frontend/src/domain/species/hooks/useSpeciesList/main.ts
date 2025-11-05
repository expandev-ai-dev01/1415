/**
 * @hook useSpeciesList
 * @summary Hook for fetching and managing species list
 * @domain species
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides species list data with TanStack Query caching and refetching capabilities.
 */

import { useQuery } from '@tanstack/react-query';
import { speciesService } from '../../services/speciesService';
import type { UseSpeciesListOptions, UseSpeciesListReturn } from './types';

export const useSpeciesList = (options: UseSpeciesListOptions = {}): UseSpeciesListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['species', 'list', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => speciesService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
