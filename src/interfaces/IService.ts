interface IService {
  resolver: IServiceResolver;
  resolve(context: IContext);
  validate();
}