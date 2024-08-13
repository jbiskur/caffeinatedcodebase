import { eventTransformerFactory } from "@flowcore/sdk-nextjs-backend"
import { webhookFactory } from "@flowcore/sdk-transformer-core"

export const webhookClient = webhookFactory({
  webhook: {
    baseUrl: process.env.FLOWCORE_WEBHOOK_BASEURL ?? "",
    apiKey: process.env.FLOWCORE_KEY ?? "",
    tenant: process.env.FLOWCORE_TENANT ?? "",
    dataCore: process.env.FLOWCORE_DATACORE ?? "",
    retryCount: 3,
    retryDelayMs: 250,
  },
  localTransform: !process.env.DEV_LOCAL_TRANSFORMER_BASEURL
    ? undefined
    : {
        baseUrl: process.env.DEV_LOCAL_TRANSFORMER_BASEURL ?? "",
        secret: process.env.TRANSFORMER_SECRET ?? "",
      },
  redisPredicateCheck: {
    url: process.env.REDIS_URL ?? "",
    keyPrefix: process.env.REDIS_KEY_PATTERN ?? "",
    retryCount: 20,
    retryDelayMs: 250,
  },
})

export const eventTransformClient = eventTransformerFactory({
  redisUrl: process.env.REDIS_URL ?? "",
  redisEventIdKey: process.env.REDIS_KEY_PATTERN ?? "",
  secret: process.env.TRANSFORMER_SECRET ?? "",
})
