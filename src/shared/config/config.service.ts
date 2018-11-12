import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    private readonly envConfig: {[key:string]:string}

    constructor(filePath: string) {
        // 讀取.env檔，透過dotenv.parse方法形成key-value pairs
        // 存在envConfig變數裡
        this.envConfig= dotenv.parse(fs.readFileSync(filePath))
    }

    // 傳進來key，回傳value
    get(key:string){
        return this.envConfig[key];
    }

    // 可以寫方法處理env變數，這樣也比較好除錯
    getDbPassword(){
        return this.envConfig['DB_PW'];
    }
    
}