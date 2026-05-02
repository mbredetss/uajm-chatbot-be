import { Router } from 'express';
import indexing  from '../services/indexing/routes/index.js';

const router = Router();

router.use('/indexing', indexing);

export default router;