type Cadence = {
  retries: number,
  timeout: number,
  concurrent: boolean,
  linearBackoff: number
}

type ServiceConfig = {
  cadence: Cadence
}

type BullJobData = {
  serviceType: ServiceType,
  config: ServiceConfig,
  context: IContext
}

type ServiceType = 'rest' | 'graphql';