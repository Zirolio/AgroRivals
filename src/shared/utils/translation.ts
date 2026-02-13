import type { TranslationLanguage, TranslationTextKey } from "@shared/config/types/translation";
import { TRANSLATIONS } from "@app/constants";
import Settings from "./Settings";


export default function t(key: TranslationTextKey, language: TranslationLanguage = Settings.languague) {
    return TRANSLATIONS[language][key] || key;
}