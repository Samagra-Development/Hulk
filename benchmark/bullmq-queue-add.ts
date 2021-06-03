import { Benchmark, BenchmarkConfig, BenchmarkReport } from "./benchmark";
import Uuid from "uuid";
import { Queue, QueueOptions, JobsOptions } from "bullmq";
import * as Util from "./util";

const DEFAULT_CONFIG = {
  type: "bullmq-queue-add-benchmark",
  warmupJobsNum: 100,
  benchmarkJobsNum: 1000,
  bulkSize: 0,
  jobData: {}
};

export class BullmqQueueAddBenchmark extends Benchmark<
  BullmqQueueAddBenchmarkConfig,
  BullmqQueueAddBenchmarkReport
> {
  private queue: Queue;

  private data: any;

  constructor(config: BullmqQueueAddBenchmarkConfig) {
    super(config, DEFAULT_CONFIG);

    if (!this.config.queueName) {
      this.config.queueName = Uuid.v4();
    }

    if (this.config.warmupJobsNum < 0) {
      throw new Error("config.warmupJobsNum must be non-negative");
    }
    if (this.config.benchmarkJobsNum < 0) {
      throw new Error("config.benchmarkJobsNum must be non-negative");
    }
    if (this.config.bulkSize < 0) {
      throw new Error("config.bulkSize must be non-negative");
    }
  }

  public async setUp(): Promise<void> {
    this.data = this.config.jobData;
    if (this.config.generateSampleJobData) {
      const { widthFactor, depthFactor } = this.config.generateSampleJobData;
      this.data = Util.generateSampleDataObject(widthFactor, depthFactor);
    }

    const queue = new Queue(this.config.queueName, {});
    await queue.waitUntilReady();
    this.report.result.redisVersion = await Util.getRedisVersion(queue.client);
    this.queue = queue;
  };

  public async run(): Promise<void> {
    const { bulkSize } = this.config;
    if (bulkSize > 0) {
      await this.runBulk(bulkSize);
    } else {
      await this.runAdd();
    }
  };

  public async tearDown(): Promise<void> {
    if (this.queue) {
      await Util.flushQueueKeys(this.queue.client, this.config.queueName);
      await this.queue.close();
    }
  };

  private async runBulk(bulkSize: number) {
    const { result } = this.report;
    const { warmupJobsNum, benchmarkJobsNum } = this.config;
    const jobsTotal = warmupJobsNum + benchmarkJobsNum;
    let count = 0;
    let startTime = 0;

    while (count < jobsTotal) {
      const bulk: {
        name: string;
        data: any;
        opts?: JobsOptions;
      }[] = [];
      for (let i = 0; i < bulkSize && count < jobsTotal; i++) {
        bulk.push({ name: "test", data: this.data, opts: {} });
        count++;

        if (count === warmupJobsNum) {
          startTime = Date.now();
        } else if (count === jobsTotal) {
          result.time = Date.now() - startTime;
          result.rate = Math.round((1000 * jobsTotal) / result.time);
          result.rateUnit = "jobs/sec";
        }
      }
      await this.queue.addBulk(bulk);
    }
  };

  private async runAdd() {
    const { result } = this.report;
    const { warmupJobsNum, benchmarkJobsNum } = this.config;
    const jobsTotal = warmupJobsNum + benchmarkJobsNum;
    let count = 0;
    let startTime = 0;

    while (count < jobsTotal) {
      count++;
      if (count === warmupJobsNum) {
        startTime = Date.now();
      } else if (count === jobsTotal) {
        result.time = Date.now() - startTime;
        result.rate = Math.round((1000 * jobsTotal) / result.time);
        result.rateUnit = "jobs/sec";
      }
      await this.queue.add("test", this.data, {});
    }
  };
}

export interface BullmqQueueAddBenchmarkConfig extends BenchmarkConfig {
  /*
   * How many jobs to process before start the stopwatch
   */
  warmupJobsNum?: number;

  /*
   * Amount of jobs involved in benchmark itself
   */
  benchmarkJobsNum?: number;

  /*
   * Name of queue to use; random-generated by default
   */
  queueName?: string;

  /*
   * Options to create Queue
   */
  queueOptions?: QueueOptions;

  /*
   * If > 0, use queue.addBulk() with that bulk size instead of queue.add();
   */
  bulkSize?: number;

  /*
   * Object to use as a job data
   */
  jobData?: any;

  /*
   * Options to generate sample data object used in every job.
   * Allows to conveniently create large JSON payloads.
   */
  generateSampleJobData?: {
    widthFactor: number;
    depthFactor: number;
  };
}

export interface BullmqQueueAddBenchmarkReport extends BenchmarkReport {
  config?: BullmqQueueAddBenchmarkConfig;

  result: {
    time?: number;
    rate?: number;
    rateUnit?: string;
    redisVersion?: string;
  };
}