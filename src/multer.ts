import multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import path from 'path';
import { randomUUID } from 'crypto';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import { cloudinaryStorage } from './cloudinary';

const typeStorage = process.env.MULTER_TYPE_STORAGE;

const diskStorages = multer.diskStorage({
  destination: path.join(__dirname, '../temp'),
  filename(_, file, callback) {
    const typeFile = file.mimetype.split('/')[1];

    const originalName = file.originalname;
    const newName = `${randomUUID()}-${originalName}.${typeFile}`;

    return callback(null, newName);
  },
});

export const multerOptions: MulterOptions = {
  storage: typeStorage == 'production' ? cloudinaryStorage : diskStorages,
  fileFilter: (_, file, callback) => {
    const typeAccepets = ['JPEG', 'JPG', 'PNG'];
    const fileType = file.mimetype.split('/')[1];
    if (!typeAccepets.includes(fileType.toUpperCase())) {
      return callback(new UnsupportedMediaTypeException(), false);
    }

    return callback(null, true);
  },

  limits: {
    fileSize: 4194304,
  },
};
