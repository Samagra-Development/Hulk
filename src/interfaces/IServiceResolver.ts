interface IServiceResolver {
  validator: IValidator;
  resolve(context: IContext, cadence: Cadence);
}