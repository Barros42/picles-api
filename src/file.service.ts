import { Injectable } from "@nestjs/common";
import * as fs from 'fs'

@Injectable()
export default class FileService {

    async readFile(path: string) {
        return fs.readFileSync(path)
    }

}