import { getTranslationProcedure } from "@/server/api/routers/translation/translation-get.procedure"
import { createTRPCRouter } from "@/server/api/trpc"

export const translationRouter = createTRPCRouter({
  get: getTranslationProcedure,
})
