"use client"

import {createContext, type FC, type PropsWithChildren, useCallback} from "react";

import Loading from "@/app/loading";
import {api} from "@/trpc/react";
import {type Translations} from "@/types/translations";

export const TranslationContext = createContext<(path: keyof Translations, params?: Record<string, string | number> | undefined) => string>(() => "not loaded");

export const TranslationProvider: FC<{
  language: string;
} & PropsWithChildren> = ({ language, children }) => {

  const { data, isLoading} = api.translation.get.useQuery({ language }, {
    refetchInterval: false,
  });

  const translate = useCallback((path: keyof Translations, params?: Record<string, string | number> | undefined): string => {
    const translation = data?.[path];
    if (!translation) {
      console.warn(`Translation for key "${path}" not found`);
      return path;
    }

    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, value.toString());
      }, translation);
    }

    return translation;
  },[data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TranslationContext.Provider value={translate}>
      {children}
    </TranslationContext.Provider>
  );
}
