// app/(tabs)/cases/_layout.tsx - 案例页面布局
// 教学要点：Expo Router文件路由，Tab导航，页面布局

import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Ionicons as HomeIcon, 
  Ionicons as HeartIcon, 
  Ionicons as SearchIcon, 
  Ionicons as SettingsIcon 
} from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * 案例页面的Tab布局
 * 定义底部导航栏和页面结构
 */
export default function CasesLayout() {
  // 获取设备安全区域信息和翻译功能
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();
  
  return (
    <Tabs
      // 整体Tab配置
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          {
            // 为iPhone适配安全区域
            paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 4,
            height: insets.bottom > 0 ? 60 + insets.bottom : 60,
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          }
        ],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: [
          styles.header,
          {
            // 为iPhone适配顶部安全区域
            height: Platform.OS === 'ios' ? 44 + insets.top : 56,
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          }
        ],
        headerTitleStyle: [styles.headerTitle, { color: colors.text }],
        headerShadowVisible: false,
      }}
    >
      {/* 案例列表Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabTitles.home'),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />

      {/* 搜索Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: t('tabTitles.search'),
          tabBarIcon: ({ color, size }) => (
            <SearchIcon name="search" color={color} size={size} />
          ),
        }}
      />

      {/* 收藏Tab */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('tabTitles.favorites'),
          tabBarIcon: ({ color, size }) => (
            <HeartIcon name="heart" color={color} size={size} />
          ),
        }}
      />

      {/* 设置Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabTitles.settings'),
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// 样式定义 - 教学要点：Tab导航样式，平台适配，安全区域处理
const styles = StyleSheet.create({
  // 底部Tab栏样式
  tabBar: {
    borderTopWidth: 1,
    paddingTop: 4,
    elevation: 8, // Android阴影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Tab标签文字样式
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },

  // 页面头部样式
  header: {
    borderBottomWidth: 1,
  },

  // 页面标题样式
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});