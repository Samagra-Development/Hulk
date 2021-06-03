"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleTask {
    constructor(service, context) {
        this.service = service;
        this.context = context;
    }
    resolve() {
        return this.service.resolve(this.context);
    }
}
exports.default = SimpleTask;
//# sourceMappingURL=SimpleTask.js.map