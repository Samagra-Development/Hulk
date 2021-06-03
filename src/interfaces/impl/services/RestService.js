"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestServiceResolver_1 = require("../serviceResolvers/RestServiceResolver");
class RestService {
    constructor(config) {
        this.resolver = new RestServiceResolver_1.default();
        this.config = config;
    }
    resolve(context) {
        return this.resolver.resolve(context, this.config.cadence);
    }
    validate() {
        throw new Error("Method not implemented.");
    }
}
exports.default = RestService;
//# sourceMappingURL=RestService.js.map