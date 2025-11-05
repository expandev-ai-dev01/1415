import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
