import { type ZodSchema, z } from "zod"

export const SourceEventDto = z.object({
  aggregator: z.string(),
  dataCore: z.string(),
  eventId: z.string(),
  eventType: z.string(),
  metadata: z.unknown().optional(),
  payload: z.unknown(),
  timeBucket: z.string(),
  validTime: z.string(),
})

export const EventDataDto = <TPayload, TMetadata = Record<string, unknown>>(
  event: z.infer<typeof SourceEventDto>,
  validator?: ZodSchema,
) => {
  return {
    ...event,
    metadata: event.metadata as TMetadata,
    payload: validator ? (validator.parse(event.payload) as TPayload) : (event.payload as TPayload),
  }
}

export type SourceEvent = z.infer<typeof SourceEventDto>

export type ParsedSourceEvent<TPayload> = ReturnType<typeof EventDataDto<TPayload>>
