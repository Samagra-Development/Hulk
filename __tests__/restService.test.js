"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RestContext_1 = require("../src/interfaces/impl/contexts/RestContext");
const RestService_1 = require("../src/interfaces/impl/services/RestService");
describe("", () => {
    test("", (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const config = {
            cadence: {
                retries: 1,
                timeout: 1000,
                concurrent: false,
                linearBackoff: 100
            }
        };
        const service = new RestService_1.default(config);
        const context = new RestContext_1.default("jsonplaceholder.typicode.com", "GET", "https", "/todos/200", new Map());
        const results = yield service.resolve(context).catch(err => {
            console.error(err);
            done();
        });
        // expect(results).toMatchSnapshot();
        console.log(results);
        done();
    }));
});
//# sourceMappingURL=restService.test.js.map