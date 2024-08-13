export type AuditLog = {
  id: string
  userId?: string
  action: string
  entity: string
  entityId: string
  data: string
  timestamp: string
  remoteIp?: string
}

export type AuditMetadata = {
  userId?: string
  remoteIp?: string
}
