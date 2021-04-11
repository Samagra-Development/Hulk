import RestContext from "../src/interfaces/impl/contexts/RestContext";
import RestService from "../src/interfaces/impl/services/RestService"
import SimpleTask from "../src/interfaces/impl/tasks/SimpleTask";

describe("simple task test", () => {
    test("should execute", async (done) => {
        const config = {
            cadence: {
                retries: 1,
                timeout: 1000,
                concurrent: false,
                linearBackoff: 100
            }
        }
        const context: RestContext = new RestContext(
            "jsonplaceholder.typicode.com",
            "GET",
            "https",
            "/todos/200",
            new Map()
        );
        const service = new RestService(config);
        const task = new SimpleTask(service, context);
        const results = await task.resolve();
        expect(results).toMatchSnapshot();
        done();
    })
})