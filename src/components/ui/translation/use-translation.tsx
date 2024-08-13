import {useContext} from "react";

import {TranslationContext} from "@/components/ui/translation/translation-provider";

export const useTranslation = () => {
  const translator = useContext(TranslationContext);

  return {
    translator,
  };
}
