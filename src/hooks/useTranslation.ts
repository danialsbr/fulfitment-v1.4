import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../translations';

export function useTranslation() {
  const { language } = useLanguage();
  return useTranslations(language);
}