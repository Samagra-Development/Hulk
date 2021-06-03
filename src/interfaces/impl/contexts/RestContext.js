"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestContext {
    constructor(host, method, protocol, path, headers) {
        this.host = host;
        this.method = method;
        this.protocol = protocol;
        this.path = path;
        this.headers = headers;
    }
    update(key, value) {
        this[key] = value;
    }
    clear(key) {
        delete this[key];
    }
    get(key) {
        return this[key];
    }
}
exports.default = RestContext;
//# sourceMappingURL=RestContext.js.map