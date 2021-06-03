"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RestContext_1 = require("../src/interfaces/impl/contexts/RestContext");
const RestServiceResolver_1 = require("../src/interfaces/impl/serviceResolvers/RestServiceResolver");
describe("", () => {
    test("", (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const resolver = new RestServiceResolver_1.default();
        const context = new RestContext_1.default("jsonplaceholder.typicode.com", "GET", "https", "/todos/200", new Map());
        const cadence = {
            retries: 1,
            timeout: 1000,
            concurrent: false,
            linearBackoff: 100
        };
        const results = yield resolver.resolve(context, cadence).catch(err => {
            console.error(err);
            done();
        });
        expect(results).toMatchSnapshot();
        done();
    }));
});
//# sourceMappingURL=restResolver.test.js.map