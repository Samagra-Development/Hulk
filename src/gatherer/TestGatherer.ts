import FileBackend from "../interfaces/impl/backends/FileBackend";
import type { ITaskBackend } from "../interfaces/ITaskBackend";
import { TaskStatus } from "../interfaces/ITaskBackend";

export default class TestGatherer {
  backend: ITaskBackend;

  constructor() {
    this.backend = new FileBackend("/Users/anshul.malik/Desktop/Hulk/src/backend.json");
    console.log("Test gatherer backend initiated", this.backend);
    
  }
  processTask(task, resultQueue) {
      console.log(`Scheduler Status: ✅ ${task.data.number}`)
      const taskF = this.backend.getTask(task.data.number);
      console.log(taskF);
      this.backend.updateTask(task.data.number, TaskStatus.processing, 50);
  }

  verify() {

  }
}