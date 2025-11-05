/**
 * @summary
 * Unit tests for species business logic
 *
 * @module services/species
 */

import {
  speciesCreate,
  speciesList,
  speciesGet,
  speciesUpdate,
  speciesDelete,
} from '@/services/species/speciesLogic';

describe('speciesCreate', () => {
  it('should create a species with valid scientific name', async () => {
    const params = { name: 'Tyrannosaurus rex' };
    const result = await speciesCreate(params);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Tyrannosaurus rex');
    expect(result).toHaveProperty('dateCreated');
    expect(result).toHaveProperty('dateModified');
  });

  it('should reject invalid scientific name format', async () => {
    const params = { name: 'InvalidName' };
    await expect(speciesCreate(params)).rejects.toThrow();
  });

  it('should reject duplicate species names', async () => {
    const params = { name: 'Velociraptor mongoliensis' };
    await speciesCreate(params);
    await expect(speciesCreate(params)).rejects.toThrow('speciesAlreadyExists');
  });
});

describe('speciesList', () => {
  it('should return list of all species', async () => {
    const result = await speciesList();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('speciesGet', () => {
  it('should retrieve species by id', async () => {
    const created = await speciesCreate({ name: 'Brachiosaurus altithorax' });
    const result = await speciesGet(created.id);
    expect(result.id).toBe(created.id);
    expect(result.name).toBe('Brachiosaurus altithorax');
  });

  it('should throw error for non-existent species', async () => {
    await expect(speciesGet(99999)).rejects.toThrow('speciesNotFound');
  });
});

describe('speciesUpdate', () => {
  it('should update species with valid data', async () => {
    const created = await speciesCreate({ name: 'Stegosaurus stenops' });
    const updated = await speciesUpdate(created.id, { name: 'Stegosaurus armatus' });
    expect(updated.name).toBe('Stegosaurus armatus');
  });

  it('should reject invalid scientific name on update', async () => {
    const created = await speciesCreate({ name: 'Triceratops horridus' });
    await expect(speciesUpdate(created.id, { name: 'Invalid' })).rejects.toThrow();
  });
});

describe('speciesDelete', () => {
  it('should delete existing species', async () => {
    const created = await speciesCreate({ name: 'Allosaurus fragilis' });
    await speciesDelete(created.id);
    await expect(speciesGet(created.id)).rejects.toThrow('speciesNotFound');
  });

  it('should throw error when deleting non-existent species', async () => {
    await expect(speciesDelete(99999)).rejects.toThrow('speciesNotFound');
  });
});
