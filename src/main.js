"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bullmq_1 = require("bullmq");
const RestService_1 = require("./interfaces/impl/services/RestService");
const SimpleTask_1 = require("./interfaces/impl/tasks/SimpleTask");
const connection = {
    host: process.env.REDIS_HOST | "localhost",
    port: parseInt(process.env.REDIS_PORT) | 6379,
};
const queueConfig = {
    connection,
};
const workerConfig = {
    connection,
    concurrency: 1,
};
const queueID = "queue";
const resultQueue = new bullmq_1.Queue("resultQueue", queueConfig);
const worker = new bullmq_1.Worker(queueID, (job) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const results = yield getTask(job.data).resolve().catch(error => {
        console.error(error);
    });
    console.log(results);
    return results;
}), workerConfig);
function getTask(data) {
    const { context, config, serviceType } = data;
    console.log(data);
    let service;
    switch (serviceType) {
        case 'rest': {
            service = new RestService_1.default(config);
        }
    }
    return new SimpleTask_1.default(service, context);
}
//# sourceMappingURL=main.js.map