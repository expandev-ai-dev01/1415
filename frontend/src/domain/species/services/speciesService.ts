/**
 * @service speciesService
 * @summary Species management service for authenticated endpoints
 * @domain species
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/species/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Species, CreateSpeciesDto, UpdateSpeciesDto, SpeciesListParams } from '../types';

export const speciesService = {
  /**
   * @endpoint GET /api/v1/internal/species
   * @summary Fetches list of species
   */
  async list(params?: SpeciesListParams): Promise<Species[]> {
    const response = await authenticatedClient.get('/species', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/species/:id
   * @summary Fetches single species by ID
   */
  async getById(id: number): Promise<Species> {
    const response = await authenticatedClient.get(`/species/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/species
   * @summary Creates new species
   */
  async create(data: CreateSpeciesDto): Promise<Species> {
    const response = await authenticatedClient.post('/species', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/species/:id
   * @summary Updates existing species
   */
  async update(id: number, data: UpdateSpeciesDto): Promise<Species> {
    const response = await authenticatedClient.put(`/species/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/species/:id
   * @summary Deletes species
   */
  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/species/${id}`);
  },
};
