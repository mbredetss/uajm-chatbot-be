/* istanbul ignore file */
import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';
import { MulterError } from 'multer';

const ErrorHandler = (err, req, res, next) => {
  // Handle ClientError and its subclasses (InvariantError, NotFoundError)
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return response(res, 413, 'dokumen gagal diunggah, ukuran file melebihi batas maksimal 10MB', null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error('Unhandled error:', err);
  return response(res, status, message, null);
};

export default ErrorHandler;