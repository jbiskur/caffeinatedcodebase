import { z } from "zod"

import { webhookClient } from "@/app/api/transform/flowcore-clients"

import { type TrackedMetadata } from "../../lib/events/tracked-webhook"

export const journal = {
  flowType: "ground.journal.0",
  eventType: {
    created: "ground.journal.created.0",
    updated: "ground.journal.updated.0",
    archived: "ground.journal.archived.0",
  },
} as const

export const JournalEventCreatedPayload = z.object({
  id: z.string(),
  externalId: z.string(),
  referenceId: z.string(),
  referenceType: z.string(),
  contactType: z.string(),
  initType: z.string(),
  note: z.string(),
})

export const JournalEventUpdatedPayload = z.object({
  id: z.string(),
  externalId: z.string(),
  referenceId: z.string(),
  referenceType: z.string(),
  contactType: z.string(),
  initType: z.string(),
  note: z.string(),
})

export const JournalEventArchievedPayload = z.object({
  id: z.string(),
  _reason: z.string().optional(),
})

export type JournalEventCreated = z.infer<typeof JournalEventCreatedPayload>
export type JournalEventUpdated = z.infer<typeof JournalEventUpdatedPayload>
export type JournalEventArchived = z.infer<typeof JournalEventArchievedPayload>

export const sendJournalCreatedEvent = webhookClient<z.infer<typeof JournalEventCreatedPayload>, TrackedMetadata>(
  journal.flowType,
  journal.eventType.created,
)

export const sendJournalUpdatedEvent = webhookClient<z.infer<typeof JournalEventArchievedPayload>, TrackedMetadata>(
  journal.flowType,
  journal.eventType.created,
)
export const sendJournalArchivedEvent = webhookClient<z.infer<typeof JournalEventArchievedPayload>, TrackedMetadata>(
  journal.flowType,
  journal.eventType.archived,
)
