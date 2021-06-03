"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleContext {
    constructor() {
        this.context = {};
    }
    update(key, value) {
        this.context[key] = value;
    }
    get(key) {
        return this.context[key];
    }
    clear(key) {
        delete this.context[key];
    }
}
exports.default = SimpleContext;
//# sourceMappingURL=SimpleContext.js.map