/* istanbul ignore file */
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import ClientError from '../../../exceptions/client-error.js';

export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'src/services/indexing/files/docs');

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/pdf',                                                        // .pdf
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',      // .xlsx
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
        ];
        if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
        else cb(new ClientError('dokumen gagal diunggah, format file tidak didukung'), false);
    }
});

export default { UPLOAD_FOLDER, storage, upload };