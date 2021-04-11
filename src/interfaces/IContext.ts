interface IContext {
  update(key: string, value: any);
  get(key: string);
  clear(key: string);
}