export function readError(message: unknown): string {
  if (message instanceof Error) {
    return message.message
  }

  if (typeof message === "string") {
    return message
  }

  return JSON.stringify(message)
}
