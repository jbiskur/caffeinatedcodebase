import { z } from "zod"

export const ScrollPaginationInput = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().min(0).default(0),
  direction: z.enum(["forward", "backward"]).nullish(),
})

export const ScrollPaginationResult = z.object({
  nextCursor: z.number().nullish(),
})

export const SortEntry = z.object({
  id: z.string(),
  desc: z.boolean(),
})

export const SearchableScrollPaginationInput = ScrollPaginationInput.extend({
  searchTerm: z.string().nullish(),
  sort: z.array(SortEntry).nullish(),
})

export type ScrollPaginationInput = z.infer<typeof ScrollPaginationInput>
export type ScrollPaginationResult = z.infer<typeof ScrollPaginationResult>
export type SearchableScrollPaginationInput = z.infer<typeof SearchableScrollPaginationInput>
