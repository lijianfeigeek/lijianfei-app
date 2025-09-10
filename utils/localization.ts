// utils/localization.ts - 本地化工具函数
// 教学要点：多语言文本处理，类型安全，工具函数设计

import { LocalizedText } from '../types';
import { useTranslation } from '../hooks/useTranslation';

/**
 * 获取本地化文本的工具函数
 * @param localizedText 包含中英文的本地化文本对象
 * @param currentLanguage 当前语言代码
 * @returns 对应语言的文本
 */
export const getLocalizedText = (localizedText: LocalizedText, currentLanguage: string): string => {
  return localizedText[currentLanguage as keyof LocalizedText] || localizedText.zh;
};

/**
 * 获取本地化标签数组的工具函数
 * @param localizedTags 本地化标签数组
 * @param currentLanguage 当前语言代码
 * @returns 对应语言的标签数组
 */
export const getLocalizedTags = (localizedTags: LocalizedText[], currentLanguage: string): string[] => {
  return localizedTags.map(tag => getLocalizedText(tag, currentLanguage));
};

/**
 * React Hook 用于获取本地化文本
 * @returns 包含获取本地化文本函数的对象
 */
export const useLocalizedText = () => {
  const { currentLanguage } = useTranslation();
  
  const getText = (localizedText: LocalizedText): string => {
    return getLocalizedText(localizedText, currentLanguage);
  };
  
  const getTags = (localizedTags: LocalizedText[]): string[] => {
    return getLocalizedTags(localizedTags, currentLanguage);
  };
  
  return { getText, getTags, currentLanguage };
};