import { z } from "zod"

export const EventDto = z.object({
  eventId: z.string(),
  aggregator: z.string(),
  eventType: z.string(),
  validTime: z.string(),
  payload: z.any(),
})

export const EventMetadataDto = EventDto.omit({
  payload: true,
})

export const SearchTermDto = z.object({
  searchTerm: z.string().nullish(),
})

export type EventMetdata = z.infer<typeof EventMetadataDto>
export type SearchTerm = z.infer<typeof SearchTermDto>
