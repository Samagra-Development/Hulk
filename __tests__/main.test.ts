import FileBackend from "../src/interfaces/impl/backends/FileBackend";
import { TaskStatus } from "../src/interfaces/ITaskBackend";

describe('filebackend', () => {
  test("should update status", () => {
    const fileBackend = new FileBackend(__dirname + "/resources/backend.json");
    const task1 = fileBackend.getTask("1");
    // expect(task1.status).toEqual("queued");
    expect(task1).toMatchSnapshot();
    fileBackend.updateTask("2", TaskStatus.processing, 10);
    
    const task2 = fileBackend.getTask("2");
    expect(task2.progress).toEqual(10);
    expect(task2).toMatchSnapshot();
  })
});
