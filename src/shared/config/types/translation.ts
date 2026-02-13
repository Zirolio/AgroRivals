import type { TRANSLATIONS } from "@app/constants";

export type TranslationLanguage = keyof typeof TRANSLATIONS;
export type TranslationTextKey = keyof typeof TRANSLATIONS[TranslationLanguage];