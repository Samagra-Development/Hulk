export default class SimpleTask implements ITask {
    service: IService;
    context: IContext;

    constructor(service: IService, context: IContext) {
        this.service = service;
        this.context = context;
    }
    
    resolve() {
        return this.service.resolve(this.context);
    }
}