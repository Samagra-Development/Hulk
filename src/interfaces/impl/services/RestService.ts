import RestContext from "../contexts/RestContext";
import RestServiceResolver from "../serviceResolvers/RestServiceResolver";

export default class RestService implements IService {
    resolver: IServiceResolver;
    config: ServiceConfig;
    constructor(config: ServiceConfig) {
        this.resolver = new RestServiceResolver();
        this.config = config;
    }
    resolve(context: RestContext) {
      return this.resolver.resolve(context, this.config.cadence);
    }
    validate() {
        throw new Error("Method not implemented.");
    }
    
}