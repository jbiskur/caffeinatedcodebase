import z from "zod"

export const AuditLogDto = z.object({
  id: z.string().min(1),
  userId: z.string().nullable(),
  action: z.string(),
  personId: z.string().nullable(),
  businessId: z.string().nullable(),
  entity: z.string(),
  entityId: z.string().nullable(),
  data: z.string().nullable(),
  timestamp: z.string().nullable(),
  remoteIp: z.string().nullable(),
  usersName: z.string().nullable(),
})

export type AuditLogType = z.infer<typeof AuditLogDto>

export type AuditLog = {
  id: string
  userId?: string
  action: string
  personId: string | null
  businessId: string | null
  entity: string
  entityId: string
  data: string
  timestamp: string
  remoteIp?: string
  usersName?: string
}

export type AuditMetadata = {
  userId?: string
  remoteIp?: string
}

export enum AuditLogEntityOptions {
  ALL = "all",
  AREA = "ground.area.0",
  ASSOCIATION = "ground.association.0",
  BUSINESS = "ground.business.0",
  PERSON = "ground.person.0",
  APPLICATION = "ground.application.0",
  JOURNAL = "ground.journal.0",
}
