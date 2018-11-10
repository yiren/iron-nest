import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    private readonly envConfig: {[key:string]:string}
    constructor(filePath: string) {
        this.envConfig= dotenv.parse(fs.readFileSync(filePath))
    }

    get(key:string){
        return this.envConfig[key];
    }

    getDbPassword(){
        return this.envConfig['DB_PW'];
    }
    
}