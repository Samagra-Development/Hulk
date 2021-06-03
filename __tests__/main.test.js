"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileBackend_1 = require("../src/interfaces/impl/backends/FileBackend");
describe('filebackend', () => {
    test("should update status", () => {
        const fileBackend = new FileBackend_1.default(__dirname + "/resources/backend.json");
        const task1 = fileBackend.getTask("1");
        // expect(task1.status).toEqual("queued");
        expect(task1).toMatchSnapshot();
        fileBackend.updateTask("2", 1 /* processing */, 10);
        const task2 = fileBackend.getTask("2");
        expect(task2.progress).toEqual(10);
        expect(task2).toMatchSnapshot();
    });
});
//# sourceMappingURL=main.test.js.map