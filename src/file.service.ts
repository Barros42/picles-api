import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import IFileService from './pet/interfaces/file.service.interface';

@Injectable()
export default class FileService implements IFileService {
  async readFile(path: string) {
    return fs.readFileSync(path);
  }
}
