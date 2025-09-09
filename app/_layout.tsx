import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useCallback } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FavoritesProvider } from '@/hooks/useFavorites';

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

  return (
    <FavoritesProvider onFavoritesChange={handleFavoritesChange}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{headerShown:false,animation:"slide_from_right"}}
        >
        </Stack>
      </ThemeProvider>
    </FavoritesProvider>
  );
}
