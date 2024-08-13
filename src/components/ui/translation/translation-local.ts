import fs from "node:fs";
import path from "node:path";

import {type z} from "zod";

import {TranslationSchema} from "./translation-interface";

export class LocalTranslationService {
  public static loadTranslation(language: string): z.infer<typeof TranslationSchema> {
    const languageFile = path.join(process.cwd(), "translations", `${language}.json`);
    return TranslationSchema.parse(JSON.parse(fs.readFileSync(languageFile, "utf-8")));
  }
}
