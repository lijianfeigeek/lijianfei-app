import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 导入翻译文件
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';

// 语言存储键名
const LANGUAGE_STORAGE_KEY = 'app_language';

// 获取存储的语言设置
const getStoredLanguage = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language || 'en'; // 默认英文
  } catch (error) {
    console.error('Error getting stored language:', error);
    return 'zh';
  }
};

// 保存语言设置
const storeLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error storing language:', error);
  }
};

// i18n 配置
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // 默认语言，会在初始化后更新
  fallbackLng: 'en',
  
  interpolation: {
    escapeValue: false, // React 已经进行了转义
  },
  
  // 调试选项
  debug: __DEV__,
  
  // 初始化选项
  initImmediate: false,
});

// 初始化语言设置
export const initializeLanguage = async (): Promise<void> => {
  try {
    const storedLanguage = await getStoredLanguage();
    await i18n.changeLanguage(storedLanguage);
    console.log('Language initialized:', storedLanguage);
  } catch (error) {
    console.error('Error initializing language:', error);
  }
};

// 切换语言
export const changeLanguage = async (language: string): Promise<void> => {
  try {
    await i18n.changeLanguage(language);
    await storeLanguage(language);
    console.log('Language changed to:', language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// 获取当前语言
export const getCurrentLanguage = (): string => {
  return i18n.language;
};

// 获取可用语言列表
export const getAvailableLanguages = () => {
  return [
    { code: 'zh', name: '中文', nativeName: '中文' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
  ];
};

export default i18n;