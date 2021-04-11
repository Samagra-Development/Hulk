const { Queue, RedisOptions, Worker } = require("bullmq");

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

const queue = new Queue(queueID);


let i = 1;
for(i = 1; i <= 1; i++) {
  const config = {
    serviceType: 'rest',
    config: {
      cadence: {
        retries: 1,
        timeout: 1000,
        concurrent: false,
        linearBackoff: 100
      }
    },
    context: {
      host: "jsonplaceholder.typicode.com",
      method: "GET",
      protocol: "https",
      path: "/todos/200",
      headers: {}
    }
  };
  queue.add("test", config);
}