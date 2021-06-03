"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let backendFilePath;
function save(json) {
    fs.writeFileSync(backendFilePath, JSON.stringify(json));
}
class FileBackend {
    constructor(filePath) {
        backendFilePath = filePath;
        this.json = JSON.parse(fs.readFileSync(backendFilePath, 'utf-8'));
    }
    updateTask(taskId, status, progress) {
        this.json[taskId] = { status, progress };
        save(this.json);
    }
    getTask(taskId) {
        return this.json[taskId];
    }
    deleteTask(taskId) {
        delete this.json[taskId];
        save(this.json);
    }
}
exports.default = FileBackend;
//# sourceMappingURL=FileBackend.js.map