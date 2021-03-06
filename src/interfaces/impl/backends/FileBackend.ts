import * as fs from "fs";

import type { ITaskBackend } from "../../ITaskBackend";
import { TaskStatus } from "../../ITaskBackend";

let backendFilePath;
function save(json) {
    fs.writeFileSync(backendFilePath, JSON.stringify(json));
}

export default class FileBackend implements ITaskBackend {
    json;
    constructor(filePath: string) {
        backendFilePath = filePath;
        this.json = JSON.parse(fs.readFileSync(backendFilePath, 'utf-8'));
    }

    updateTask(taskId: string, status: TaskStatus, progress: number): void {
        this.json[taskId] = { status, progress };
        save(this.json);
    }
    getTask(taskId: string): void {
        return this.json[taskId];
    }
    deleteTask(taskId: string) : void {
        delete this.json[taskId];
        save(this.json);
    }
    
}