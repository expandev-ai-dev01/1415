import { Router } from 'express';
import * as speciesController from '@/api/v1/internal/species/controller';

const router = Router();

router.get('/species', speciesController.listHandler);
router.post('/species', speciesController.createHandler);
router.get('/species/:id', speciesController.getHandler);
router.put('/species/:id', speciesController.updateHandler);
router.delete('/species/:id', speciesController.deleteHandler);

export default router;
