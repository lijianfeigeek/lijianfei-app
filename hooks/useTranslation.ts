import { useTranslation as useReactI18nextTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage, getAvailableLanguages } from '../i18n';

/**
 * 自定义翻译 Hook
 * 扩展 react-i18next 的功能，添加语言切换方法
 */
export const useTranslation = () => {
  const { t, i18n } = useReactI18nextTranslation();

  // 切换语言
  const switchLanguage = async (language: string) => {
    await changeLanguage(language);
  };

  // 获取当前语言 - 使用 i18n.language 以避免重新渲染问题
  const currentLanguage = i18n.language || getCurrentLanguage();

  // 获取可用语言列表
  const availableLanguages = getAvailableLanguages();

  return {
    t,
    i18n,
    switchLanguage,
    currentLanguage,
    availableLanguages,
  };
};

export default useTranslation;