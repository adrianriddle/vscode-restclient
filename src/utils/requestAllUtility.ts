"use strict";

import * as fs from 'fs-extra';
import * as path from 'path';

export class RequestAllUtility {
    static getClosestDirectory(filePath: string): string | null {
        try {
            let isDirectory = fs.statSync(filePath).isDirectory();
            return isDirectory ? filePath : path.resolve(filePath, '..');
        } catch (e) {
            return null;
        }
    }

    static getAllFiles(dir): string[] {
        const files = fs.readdirSync(dir).reduce((files: string[], file) => {
            const name = path.join(dir, file);
            const isDirectory = fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...RequestAllUtility.getAllFiles(name)] : [...files, name];
        }, []);
        return files.filter(file => ['.http', '.rest'].indexOf(path.extname(file)) > -1);
    }

    static readFileSync(file): string {
        return fs.readFileSync(file, { encoding: 'utf8' });
    }
}