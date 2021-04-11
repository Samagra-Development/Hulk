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

    updateTask(taskId: string, status: TaskStatus, progress: number) {
        this.json[taskId] = { status, progress };
        save(this.json);
    }
    getTask(taskId: string) {
        return this.json[taskId];
    }
    deleteTask(taskId: string) {
        delete this.json[taskId];
        save(this.json);
    }
    
}