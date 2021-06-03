"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const got_1 = require("got");
class RestServiceResolver {
    constructor() {
    }
    resolve(context, cadence) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { protocol, host, path, method, headers } = context;
            const { retries, timeout, linearBackoff } = cadence;
            const url = `${protocol}://${host}${path}`;
            // console.log(url, method, headers, retries, linearBackoff, timeout);
            try {
                return yield got_1.default(url, {
                    method,
                    headers,
                    retry: {
                        limit: retries,
                        calculateDelay: ({ attemptCount, retryOptions }) => retryOptions.limit >= attemptCount ? linearBackoff : 0
                    },
                    timeout
                }).text();
            }
            catch (error) {
                console.error(error);
                throw new Error("ad");
            }
        });
    }
}
exports.default = RestServiceResolver;
//# sourceMappingURL=RestServiceResolver.js.map