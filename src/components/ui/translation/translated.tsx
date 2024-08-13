"use client";
import { useContext, type FC } from "react";

import { TranslationContext } from "@/components/ui/translation/translation-provider";
import { type Translations } from "@/types/translations";

export const Translated: FC<{
  path: keyof Translations;
  params?: Record<string, string | number> | undefined;
}> = ({ path, params }) => {
  const translator = useContext(TranslationContext);

  return <>{translator(path as keyof Translations, params)}</>;
};
