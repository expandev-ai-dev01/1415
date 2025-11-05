/**
 * @summary
 * Integration tests for species API endpoints
 *
 * @module api/v1/internal/species
 */

import request from 'supertest';
import express from 'express';
import { Router } from 'express';
import * as speciesController from '@/api/v1/internal/species/controller';

const app = express();
app.use(express.json());

const router = Router();
router.get('/species', speciesController.listHandler);
router.post('/species', speciesController.createHandler);
router.get('/species/:id', speciesController.getHandler);
router.put('/species/:id', speciesController.updateHandler);
router.delete('/species/:id', speciesController.deleteHandler);

app.use('/api/v1/internal', router);

describe('Species API Endpoints', () => {
  describe('POST /api/v1/internal/species', () => {
    it('should create species with valid data', async () => {
      const response = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Tyrannosaurus rex' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe('Tyrannosaurus rex');
    });

    it('should return 400 for invalid scientific name', async () => {
      const response = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'InvalidName' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 409 for duplicate species', async () => {
      await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Velociraptor mongoliensis' });

      const response = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Velociraptor mongoliensis' })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('speciesAlreadyExists');
    });
  });

  describe('GET /api/v1/internal/species', () => {
    it('should return list of species', async () => {
      const response = await request(app).get('/api/v1/internal/species').expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/internal/species/:id', () => {
    it('should return species by id', async () => {
      const createResponse = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Brachiosaurus altithorax' });

      const id = createResponse.body.data.id;

      const response = await request(app).get(`/api/v1/internal/species/${id}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(id);
    });

    it('should return 404 for non-existent species', async () => {
      const response = await request(app).get('/api/v1/internal/species/99999').expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('speciesNotFound');
    });
  });

  describe('PUT /api/v1/internal/species/:id', () => {
    it('should update species with valid data', async () => {
      const createResponse = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Stegosaurus stenops' });

      const id = createResponse.body.data.id;

      const response = await request(app)
        .put(`/api/v1/internal/species/${id}`)
        .send({ name: 'Stegosaurus armatus' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Stegosaurus armatus');
    });

    it('should return 404 for non-existent species', async () => {
      const response = await request(app)
        .put('/api/v1/internal/species/99999')
        .send({ name: 'Triceratops horridus' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/internal/species/:id', () => {
    it('should delete existing species', async () => {
      const createResponse = await request(app)
        .post('/api/v1/internal/species')
        .send({ name: 'Allosaurus fragilis' });

      const id = createResponse.body.data.id;

      const response = await request(app).delete(`/api/v1/internal/species/${id}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.deleted).toBe(true);
    });

    it('should return 404 for non-existent species', async () => {
      const response = await request(app).delete('/api/v1/internal/species/99999').expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
