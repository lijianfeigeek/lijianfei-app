import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, Text, View, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { Colors } from '@/constants/Colors';
import { initializeLanguage } from '@/i18n';

// 防止启动屏幕自动隐藏
SplashScreen.preventAutoHideAsync();

// 用户协议弹窗组件
function EulaModal({ onAccept, onReject, colorScheme }: { 
  onAccept: () => void; 
  onReject: () => void; 
  colorScheme: string | null | undefined;
}) {
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
        <Text style={[styles.modalTitle, { color: colors.text }]}>用户协议</Text>
        
        <ScrollView style={styles.modalScroll}>
          <Text style={[styles.modalText, { color: colors.text }]}>
            欢迎使用本应用！在使用前，请仔细阅读以下条款：
            
            {'\n\n'}1. 内容说明
            本应用展示来自Twitter等平台的第三方用户使用AI生成的案例。所有内容已经过我们预先审核筛选。
            
            {'\n\n'}2. 内容政策
            我们严禁任何形式的不当内容，包括但不限于：违法内容、暴力色情、仇恨言论等。一旦发现，我们会立即移除相关内容。
            
            {'\n\n'}3. 知识产权
            所有展示内容的版权归原作者所有，本应用仅用于展示目的。
            
            {'\n\n'}4. 用户反馈
            如您发现任何不当内容或有其他问题，请通过设置页面的「意见反馈」功能联系我们，我们会在24小时内处理。
            
            {'\n\n'}5. 免责声明
            本应用提供的案例仅供参考，不对使用效果做出任何保证。
            
            {'\n\n'}6. 协议更新
            我们可能会更新本协议，请定期查看最新版本。
          </Text>
        </ScrollView>
        
        <View style={styles.modalButtons}>
          <TouchableOpacity 
            style={[styles.modalButton, styles.rejectButton]} 
            onPress={onReject}
          >
            <Text style={styles.rejectButtonText}>拒绝</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.modalButton, styles.acceptButton]} 
            onPress={onAccept}
          >
            <Text style={styles.acceptButtonText}>同意</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    maxHeight: '80%',
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  rejectButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#3b82f6',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [showEulaModal, setShowEulaModal] = useState(false);
  const [eulaAccepted, setEulaAccepted] = useState(false);

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

  // 检查用户协议是否已接受
  useEffect(() => {
    const checkEulaAccepted = async () => {
      try {
        // 这里在实际应用中应该使用AsyncStorage
        // 为了快速实现，我们每次启动都显示协议
        if (loaded && i18nInitialized && !splashVisible) {
          setShowEulaModal(true);
        }
      } catch (error) {
        console.error('Error checking EULA status:', error);
      }
    };

    checkEulaAccepted();
  }, [loaded, i18nInitialized, splashVisible]);

  // 控制启动屏幕显示1.5秒
  useEffect(() => {
    if (loaded && i18nInitialized) {
      const timer = setTimeout(() => {
        setSplashVisible(false);
        SplashScreen.hideAsync();
      }, 1500); // 1.5秒延迟

      return () => clearTimeout(timer);
    }
  }, [loaded, i18nInitialized]);

  // 处理收藏状态变化的回调
  const handleFavoritesChange = useCallback((favoriteIds: Set<number>) => {
    // 这里可以添加全局的收藏状态变化处理逻辑
    console.log('收藏状态已更新，当前收藏数量:', favoriteIds.size);
  }, []);

  // 处理用户协议接受
  const handleAcceptEula = useCallback(() => {
    setEulaAccepted(true);
    setShowEulaModal(false);
    // 在实际应用中，这里应该保存到AsyncStorage
  }, []);

  // 处理用户协议拒绝
  const handleRejectEula = useCallback(() => {
    Alert.alert(
      '必须同意协议',
      '您必须同意用户协议才能使用本应用',
      [{ text: '确定' }]
    );
  }, []);

  if (!loaded || !i18nInitialized || splashVisible) {
    // Async font loading and i18n initialization only occurs in development.
    return null;
  }

  // 如果用户未接受协议，显示协议弹窗
  if (!eulaAccepted && showEulaModal) {
    return (
      <Modal
        visible={true}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <EulaModal 
          onAccept={handleAcceptEula}
          onReject={handleRejectEula}
          colorScheme={colorScheme}
        />
      </Modal>
    );
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
