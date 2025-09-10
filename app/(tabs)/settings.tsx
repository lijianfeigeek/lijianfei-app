// app/(tabs)/settings.tsx - 设置页面
// 教学要点：设置页面设计，用户偏好，主题切换，应用配置

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme, Appearance } from 'react-native';
import { 
  Ionicons as MoonIcon, 
  Ionicons as SunIcon, 
  Ionicons as InfoIcon,
  Ionicons as MailIcon,
  Ionicons as GithubIcon,
  Ionicons as ShareIcon 
} from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * 设置页面
 * 提供应用设置、主题切换、关于信息等功能
 */
export default function SettingsScreen() {
  // 获取设备安全区域信息和颜色方案
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t, switchLanguage, currentLanguage, availableLanguages } = useTranslation();
  
  // 状态管理 - 教学重点：设置项的状态管理
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  // 监听系统主题变化
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    
    return () => listener.remove();
  }, []);

  /**
   * 切换深色模式
   */
  const toggleDarkMode = (value: boolean) => {
    setDarkMode(value);
    // 实现深色模式切换逻辑 - 使用 Appearance API 来切换系统主题
    Appearance.setColorScheme(value ? 'dark' : 'light');
    console.log('深色模式:', value ? '开启' : '关闭');
    
    // 显示切换提示
    Alert.alert(
      t('settings.darkModeAlert'),
      `${t('settings.darkMode')}${value ? t('settings.darkModeEnabledAlert') : t('settings.darkModeDisabledAlert')}`,
      [{ text: t('common.confirm') }]
    );
  };





  /**
   * 分享应用
   */
  const shareApp = () => {
    // TODO: 实现应用分享功能
    Alert.alert(
      t('settings.shareApp'),
      t('settings.shareAppAlert'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.share'), onPress: () => {
          console.log('分享应用');
        }}
      ]
    );
  };

  /**
   * 发送反馈邮件
   */
  const sendFeedback = () => {
    Linking.openURL('mailto:support@nanobanana.com?subject=Nano Banana AI 反馈');
  };

  /**
   * 打开GitHub页面
   */
  const openGithub = () => {
    Linking.openURL('https://github.com/yourusername/nano-banana-rn-app');
  };

  /**
   * 显示关于信息
   */
  const showAbout = () => {
    Alert.alert(
      t('settings.aboutAlert'),
      t('settings.aboutContent'),
      [{ text: t('common.confirm') }]
    );
  };

  // 渲染设置项组件
  const renderSettingItem = ({
    icon,
    title,
    subtitle,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <View style={[
      styles.settingItem,
      {
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
      }
    ]}>
      <View style={styles.settingInfo}>
        {icon}
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.tabIconDefault }]}>{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );

  // 渲染设置组
  const renderSettingGroup = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.settingGroup}>
      <Text style={[styles.groupTitle, { color: colors.tabIconDefault }]}>{title}</Text>
      {children}
    </View>
  );

  return (
    <ScrollView style={[
      styles.container,
      {
        // 适配安全区域
        // paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.background,
      }
    ]}>
      {/* 外观设置 */}
      {renderSettingGroup({
        title: t('settings.appearance'),
        children: (
          <>
            {renderSettingItem({
              icon: darkMode ? <MoonIcon name="moon" size={20} color={colors.primary} /> : <SunIcon name="sunny" size={20} color="#FF9500" />,
              title: t('settings.darkMode'),
              subtitle: darkMode ? t('settings.darkModeEnabled') : t('settings.darkModeDisabled'),
              children: (
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#e9ecef', true: '#007AFF' }}
                  thumbColor={darkMode ? '#ffffff' : '#ffffff'}
                />
              ),
            })}
            
            {renderSettingItem({
              icon: <ShareIcon name="language" size={20} color={colors.primary} />,
              title: '语言',
              subtitle: currentLanguage === 'zh' ? '中文' : 'English',
              children: (
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} 
                  onPress={() => {
                    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
                    switchLanguage(newLanguage);
                  }}
                >
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                    {currentLanguage === 'zh' ? 'English' : '中文'}
                  </Text>
                </TouchableOpacity>
              ),
            })}
          </>
        ),
      })}



      {/* 其他设置 */}
      {renderSettingGroup({
        title: t('settings.other'),
        children: (
          <>
            {renderSettingItem({
              icon: <ShareIcon name="share" size={20} color={colors.primary} />,
              title: t('settings.shareApp'),
              subtitle: t('settings.shareAppHint'),
              children: (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} onPress={shareApp}>
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>{t('common.share')}</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <MailIcon name="mail" size={20} color={colors.primary} />,
              title: t('settings.feedback'),
              subtitle: t('settings.feedbackHint'),
              children: (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} onPress={sendFeedback}>
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>{t('common.feedback')}</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <GithubIcon name="logo-github" size={20} color={colors.primary} />,
              title: t('settings.sourceCode'),
              subtitle: t('settings.sourceCodeHint'),
              children: (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} onPress={openGithub}>
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>{t('common.view')}</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <InfoIcon name="information-circle" size={20} color={colors.primary} />,
              title: t('settings.about'),
              subtitle: t('settings.aboutHint'),
              children: (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} onPress={showAbout}>
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>{t('common.about')}</Text>
                </TouchableOpacity>
              ),
            })}
          </>
        ),
      })}
    </ScrollView>
  );
}

// 样式定义 - 教学要点：设置页面UI设计，布局层次
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // 设置组样式
  settingGroup: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  // 设置项样式
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingText: {
    marginLeft: 12,
    flex: 1,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },

  settingSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  // 操作按钮样式
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

/**
 * 教学要点总结：
 * 
 * 1. 设置页面设计：
 *    - 设置项的组织结构
 *    - 设置分组的逻辑
 *    - 设置项的UI一致性
 * 
 * 2. 状态管理：
 *    - 设置项的状态存储
 *    - 状态变更的处理
 *    - 状态同步的问题
 * 
 * 3. 用户交互：
 *    - Switch组件的使用
 *    - 按钮的点击反馈
 *    - 确认对话框的使用
 * 
 * 4. 系统集成：
 *    - Linking API的使用
 *    - 邮件发送功能
 *    - 外部链接跳转
 * 
 * 5. UI设计原则：
 *    - 清晰的信息层次
 *    - 直观的操作反馈
 *    - 一致的视觉风格
 * 
 * 6. 功能扩展：
 *    - 主题切换的架构
 *    - 通知权限的管理
 *    - 缓存管理的策略
 * 
 * 7. 用户体验：
 *    - 设置的即时生效
 *    - 友好的提示信息
 *    - 操作的可撤销性
 */