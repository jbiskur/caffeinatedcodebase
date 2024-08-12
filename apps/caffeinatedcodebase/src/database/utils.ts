import { pgTableCreator } from "drizzle-orm/pg-core"

export const createTable = pgTableCreator((name) => `cb_${name}`)
