import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useCallback, useEffect, useState } from 'react';
import { View, useColorScheme as useNativeColorScheme } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { Colors } from '@/constants/Colors';
import { initializeLanguage } from '@/i18n';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [i18nInitialized, setI18nInitialized] = useState(false);

  // 初始化 i18n
  useEffect(() => {
    const initI18n = async () => {
      try {
        await initializeLanguage();
        setI18nInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setI18nInitialized(true); // 即使失败也继续，使用默认语言
      }
    };

    initI18n();
  }, []);

  // 处理收藏状态变化的回调
  const handleFavoritesChange = useCallback((favoriteIds: Set<number>) => {
    // 这里可以添加全局的收藏状态变化处理逻辑
    console.log('收藏状态已更新，当前收藏数量:', favoriteIds.size);
  }, []);

  if (!loaded || !i18nInitialized) {
    // Async font loading and i18n initialization only occurs in development.
    return null;
  }

  const colors = Colors[colorScheme ?? 'light'];
  
  // 创建自定义主题，包含背景色
  const theme = colorScheme === 'dark' ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    }
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    }
  };
  
  return (
    <FavoritesProvider onFavoritesChange={handleFavoritesChange}>
      <ThemeProvider value={theme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{headerShown:false,animation:"slide_from_right"}}
        >
        </Stack>
      </ThemeProvider>
    </FavoritesProvider>
  );
}
