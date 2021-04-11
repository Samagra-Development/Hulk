import got from "got";

import RestContext from "../contexts/RestContext";

export default class RestServiceResolver implements IServiceResolver {
  validator: IValidator;
  constructor() {

  }
  async resolve(context: RestContext, cadence: Cadence) {
    const { protocol, host, path , method, headers } = context;
    const { retries, timeout, linearBackoff } = cadence;
    const url = `${protocol}://${host}${path}`;
    // console.log(url, method, headers, retries, linearBackoff, timeout);

    try {
      return await got(url, {
        method,
        headers,
        retry: {
          limit: retries,
          calculateDelay: ({ attemptCount, retryOptions }) => retryOptions.limit >= attemptCount ? linearBackoff: 0
        },
        timeout 
      }).text();
    } catch(error) {
      console.error(error);
      throw new Error("ad");
    }
  }

}