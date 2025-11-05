/**
 * @module species
 * @summary Species domain module for dinosaur species management
 * @domain functional
 * @dependencies TanStack Query, Axios, React Hook Form, Zod
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

// Domain public exports - Components
export * from './components/SpeciesForm';

// Domain public exports - Hooks
export * from './hooks/useSpeciesList';
export * from './hooks/useSpeciesCreate';

// Domain public exports - Services
export * from './services/speciesService';

// Domain public exports - Types
export * from './types';

// Domain public exports - Utils
export * from './utils/validation';

// Module metadata
export const moduleMetadata = {
  name: 'species',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['SpeciesForm'],
  publicHooks: ['useSpeciesList', 'useSpeciesCreate'],
  publicServices: ['speciesService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/components'],
    external: ['react', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['SpeciesForm'],
    hooks: ['useSpeciesList', 'useSpeciesCreate'],
    services: ['speciesService'],
    types: ['Species', 'CreateSpeciesDto', 'UpdateSpeciesDto', 'SpeciesFormData'],
    utils: ['validateSpeciesName', 'getCharacterCount'],
  },
} as const;
