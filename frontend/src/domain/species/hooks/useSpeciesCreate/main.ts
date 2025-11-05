/**
 * @hook useSpeciesCreate
 * @summary Hook for creating new species
 * @domain species
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides species creation functionality with automatic cache invalidation.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { speciesService } from '../../services/speciesService';
import type { UseSpeciesCreateOptions, UseSpeciesCreateReturn } from './types';

export const useSpeciesCreate = (options: UseSpeciesCreateOptions = {}): UseSpeciesCreateReturn => {
  const { onSuccess, onError } = options;
  const queryClient = useQueryClient();

  const {
    mutateAsync: create,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: speciesService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['species', 'list'] });
      onSuccess?.(data);
    },
    onError: (err: Error) => {
      onError?.(err);
    },
  });

  return {
    create,
    isCreating,
    error: error as Error | null,
  };
};
