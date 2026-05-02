import { nanoid } from "nanoid";
import ClientError from "../../../exceptions/client-error.js";
import IndexingRepositories from "../repositories/indexing-repositories.js";
import response from "../../../utils/response.js";
import UploadDocsService from "../producers/upload-docs-service.js";

export const postDocs = async (req, res, next) => {
    if (!req.file) {
        return next(new ClientError('dokumen gagal diunggah, pastikan file diunggah'));
    }

    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const encodedFilename = encodeURIComponent(req.file.filename);
    const fileLocation = `http://${host}:${port}/indexing/uploads/${encodedFilename}`;
    const id = `upload-${nanoid(16)}`;

    const message = {
        fileLocation, 
        type: 'docs',
    };

    await UploadDocsService.sendMessage({ message: JSON.stringify(message) });
    await IndexingRepositories.addDocs(id, req.file.originalname);

    return response(res, 201);
}