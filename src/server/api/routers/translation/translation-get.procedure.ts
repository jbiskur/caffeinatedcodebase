import { z } from "zod"

import { LocalTranslationService } from "@/components/ui/translation/translation-local"
import { publicProcedure } from "@/server/api/trpc"

const GetTranslationInput = z.object({
  language: z.string(),
})

export const getTranslationProcedure = publicProcedure.input(GetTranslationInput).query(({ input }) => {
  return LocalTranslationService.loadTranslation(input.language)
})
