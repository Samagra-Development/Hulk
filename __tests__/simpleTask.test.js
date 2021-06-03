"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RestContext_1 = require("../src/interfaces/impl/contexts/RestContext");
const RestService_1 = require("../src/interfaces/impl/services/RestService");
const SimpleTask_1 = require("../src/interfaces/impl/tasks/SimpleTask");
describe("simple task test", () => {
    test("should execute", (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const config = {
            cadence: {
                retries: 1,
                timeout: 1000,
                concurrent: false,
                linearBackoff: 100
            }
        };
        const context = new RestContext_1.default("jsonplaceholder.typicode.com", "GET", "https", "/todos/200", new Map());
        const service = new RestService_1.default(config);
        const task = new SimpleTask_1.default(service, context);
        const results = yield task.resolve();
        expect(results).toMatchSnapshot();
        done();
    }));
});
//# sourceMappingURL=simpleTask.test.js.map