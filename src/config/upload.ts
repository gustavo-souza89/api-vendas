import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
  fileFilter: (request, file, callback) => {
    const formatosAceitos = ['image/jpeg', 'image/png', 'image/gif'];

    if (formatosAceitos.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError('Formato invalido', 400));
    }
  },
};
