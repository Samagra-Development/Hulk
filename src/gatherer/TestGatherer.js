"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileBackend_1 = require("../interfaces/impl/backends/FileBackend");
class TestGatherer {
    constructor() {
        this.backend = new FileBackend_1.default("/Users/anshul.malik/Desktop/Hulk/src/backend.json");
        console.log("Test gatherer backend initiated", this.backend);
    }
    processTask(task, resultQueue) {
        console.log(`Scheduler Status: ✅ ${task.data.number}`);
        const taskF = this.backend.getTask(task.data.number);
        console.log(taskF);
        this.backend.updateTask(task.data.number, 1 /* processing */, 50);
    }
    verify() {
    }
}
exports.default = TestGatherer;
//# sourceMappingURL=TestGatherer.js.map