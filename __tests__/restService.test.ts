import RestContext from "../src/interfaces/impl/contexts/RestContext";
import RestService from "../src/interfaces/impl/services/RestService";

describe("", () => {
    test("", async (done) => {
        const config = {
            cadence: {
                retries: 1,
                timeout: 1000,
                concurrent: false,
                linearBackoff: 100
            }
        }
        const service = new RestService(config);

        const context: RestContext = new RestContext(
            "jsonplaceholder.typicode.com",
            "GET",
            "https",
            "/todos/200",
            new Map()
        );
        
        const results = await service.resolve(context).catch(err => {
            console.error(err);
            done();
        });
        // expect(results).toMatchSnapshot();
        console.log(results);
        done();
    })
})