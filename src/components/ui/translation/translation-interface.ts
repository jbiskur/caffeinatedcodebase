import {z} from "zod";

export const TranslationSchema = z.record(z.string(), z.string());

export type Translation = z.infer<typeof TranslationSchema>;

