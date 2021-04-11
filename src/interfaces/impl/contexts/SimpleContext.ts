export default class SimpleContext implements IContext {
  context;
  constructor() {
    this.context = {};
  }
  update(key: string, value: any) {
    this.context[key] = value;
  }
  get(key: string) {
    return this.context[key];
  }
  clear(key: string) {
    delete this.context[key];
  }
  
}