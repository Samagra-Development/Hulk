import { Queue, RedisOptions, Worker } from "bullmq";
import getProcessor from "./gatherer";
import RestService from "./interfaces/impl/services/RestService";
import SimpleTask from "./interfaces/impl/tasks/SimpleTask";

const connection: RedisOptions = {
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
const resultQueue = new Queue("resultQueue", queueConfig);

const worker = new Worker(
  queueID,
  async job => {
    const results = await getTask(job.data).resolve().catch(error => {
      console.error(error);
    });
    console.log(results);
    return results;
  },
  workerConfig
);

function getTask(data: BullJobData): ITask {
  const { context, config, serviceType } = data;
  console.log(data);
  let service;
  switch(serviceType) {
    case 'rest': {
      service = new RestService(config);
    }
  }
  return new SimpleTask(service, context);
}
