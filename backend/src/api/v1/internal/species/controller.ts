/**
 * @api {get} /api/v1/internal/species List Species
 * @apiName ListSpecies
 * @apiGroup Species
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all dinosaur species
 *
 * @apiSuccess {Array} data Array of species
 * @apiSuccess {Number} data.id Species identifier
 * @apiSuccess {String} data.name Scientific name
 * @apiSuccess {Date} data.dateCreated Creation date
 *
 * @apiError {String} ServerError Internal server error
 */
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  speciesCreate,
  speciesList,
  speciesGet,
  speciesUpdate,
  speciesDelete,
} from '@/services/species';

const createBodySchema = z.object({
  name: z.string().min(1).max(100),
});

const updateBodySchema = z.object({
  name: z.string().min(1).max(100),
});

const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await speciesList();
    res.json(successResponse(data));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || 'internalServerError'));
  }
}

/**
 * @api {post} /api/v1/internal/species Create Species
 * @apiName CreateSpecies
 * @apiGroup Species
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new dinosaur species
 *
 * @apiParam {String} name Scientific name (binomial nomenclature)
 *
 * @apiSuccess {Number} id Species identifier
 * @apiSuccess {String} name Scientific name
 * @apiSuccess {Date} dateCreated Creation timestamp
 * @apiSuccess {Date} dateModified Modification timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = createBodySchema.parse(req.body);
    const data = await speciesCreate(validated);
    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('validationError', 'ValidationError', error.errors));
    } else if (error.message === 'speciesAlreadyExists') {
      res.status(409).json(errorResponse(error.message));
    } else if (
      error.message === 'scientificNameRequired' ||
      error.message === 'scientificNameExceedsMaxLength' ||
      error.message === 'scientificNameInvalidCharacters' ||
      error.message === 'scientificNameMustFollowBinomialNomenclature' ||
      error.message === 'genusMustStartWithUppercase' ||
      error.message === 'speciesMustStartWithLowercase'
    ) {
      res.status(400).json(errorResponse(error.message));
    } else {
      res.status(500).json(errorResponse('internalServerError'));
    }
  }
}

/**
 * @api {get} /api/v1/internal/species/:id Get Species
 * @apiName GetSpecies
 * @apiGroup Species
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a specific dinosaur species
 *
 * @apiParam {Number} id Species identifier
 *
 * @apiSuccess {Number} id Species identifier
 * @apiSuccess {String} name Scientific name
 * @apiSuccess {Date} dateCreated Creation timestamp
 * @apiSuccess {Date} dateModified Modification timestamp
 *
 * @apiError {String} NotFound Species not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = idParamsSchema.parse(req.params);
    const data = await speciesGet(validated.id);
    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('validationError', 'ValidationError', error.errors));
    } else if (error.message === 'speciesNotFound') {
      res.status(404).json(errorResponse(error.message));
    } else {
      res.status(500).json(errorResponse('internalServerError'));
    }
  }
}

/**
 * @api {put} /api/v1/internal/species/:id Update Species
 * @apiName UpdateSpecies
 * @apiGroup Species
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates a dinosaur species
 *
 * @apiParam {Number} id Species identifier
 * @apiParam {String} name Scientific name (binomial nomenclature)
 *
 * @apiSuccess {Number} id Species identifier
 * @apiSuccess {String} name Scientific name
 * @apiSuccess {Date} dateCreated Creation timestamp
 * @apiSuccess {Date} dateModified Modification timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFound Species not found
 * @apiError {String} ServerError Internal server error
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedParams = idParamsSchema.parse(req.params);
    const validatedBody = updateBodySchema.parse(req.body);
    const data = await speciesUpdate(validatedParams.id, validatedBody);
    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('validationError', 'ValidationError', error.errors));
    } else if (error.message === 'speciesNotFound') {
      res.status(404).json(errorResponse(error.message));
    } else if (error.message === 'speciesAlreadyExists') {
      res.status(409).json(errorResponse(error.message));
    } else if (
      error.message === 'scientificNameRequired' ||
      error.message === 'scientificNameExceedsMaxLength' ||
      error.message === 'scientificNameInvalidCharacters' ||
      error.message === 'scientificNameMustFollowBinomialNomenclature' ||
      error.message === 'genusMustStartWithUppercase' ||
      error.message === 'speciesMustStartWithLowercase'
    ) {
      res.status(400).json(errorResponse(error.message));
    } else {
      res.status(500).json(errorResponse('internalServerError'));
    }
  }
}

/**
 * @api {delete} /api/v1/internal/species/:id Delete Species
 * @apiName DeleteSpecies
 * @apiGroup Species
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a dinosaur species
 *
 * @apiParam {Number} id Species identifier
 *
 * @apiSuccess {Boolean} success Operation success status
 *
 * @apiError {String} NotFound Species not found
 * @apiError {String} ServerError Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = idParamsSchema.parse(req.params);
    await speciesDelete(validated.id);
    res.json(successResponse({ deleted: true }));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('validationError', 'ValidationError', error.errors));
    } else if (error.message === 'speciesNotFound') {
      res.status(404).json(errorResponse(error.message));
    } else {
      res.status(500).json(errorResponse('internalServerError'));
    }
  }
}
