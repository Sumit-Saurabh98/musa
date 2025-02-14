// ... existing code ...
import * as express from 'express';
import { IUser } from './src/models';

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
        file?: Express.Multer.File;
      }
    }
  }