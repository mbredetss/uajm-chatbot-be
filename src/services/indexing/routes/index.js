import { Router } from 'express';
import userAuthentication from '../../../middlewares/userAuthenctication.js';
import { postDocs } from '../controller/indexing-controller.js';
import { upload } from '../storage/storage-config.js';

const router = Router();

router.post('/uploadDocs', upload.single('file'), userAuthentication, postDocs);

export default router;