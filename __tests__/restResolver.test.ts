import RestContext from "../src/interfaces/impl/contexts/RestContext";
import RestServiceResolver from "../src/interfaces/impl/serviceResolvers/RestServiceResolver";

describe("Rest Service Resolver", () => {
    test("Simple GET Service", async (done) => {
        const resolver = new RestServiceResolver();
        const context: RestContext = new RestContext(
            "jsonplaceholder.typicode.com",
            "GET",
            "https",
            "/todos/200",
            new Map()
        );
        const cadence = {
            retries: 1,
            timeout: 1000,
            concurrent: false,
            linearBackoff: 100
        }
        
        const results = await resolver.resolve(context, cadence).catch(err => {
            console.error(err);
            done();
        });
        expect(results).toMatchSnapshot();
        done();
    })
})