import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useCallback } from 'react';
import { View, useColorScheme as useNativeColorScheme } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // 处理收藏状态变化的回调
  const handleFavoritesChange = useCallback((favoriteIds: Set<number>) => {
    // 这里可以添加全局的收藏状态变化处理逻辑
    console.log('收藏状态已更新，当前收藏数量:', favoriteIds.size);
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
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
