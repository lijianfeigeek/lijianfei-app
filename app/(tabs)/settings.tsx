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
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme, Appearance } from 'react-native';
import { 
  Ionicons as MoonIcon, 
  Ionicons as SunIcon, 
  Ionicons as InfoIcon,
  Ionicons as MailIcon,
  Ionicons,
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
  const { t, switchLanguage, currentLanguage } = useTranslation();
  
  // 状态管理 - 教学重点：设置项的状态管理
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

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
  };

  /**
   * 获取当前语言显示名称
   */
  const getCurrentLanguageName = () => {
    const languages = [
      { code: 'zh', name: '中文', nativeName: '中文' },
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
    ];
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    return currentLang ? currentLang.nativeName : '中文';
  };

  /**
   * 切换语言
   */
  const handleLanguageSelect = (languageCode: string) => {
    switchLanguage(languageCode);
    setShowLanguageModal(false);
  };






  /**
   * 发送反馈邮件
   */
  const sendFeedback = () => {
    Linking.openURL('mailto:support@nanobanana.com?subject=Nano Banana AI 反馈');
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
              icon: <Ionicons name="language" size={20} color={colors.primary} />,
              title: t('settings.language'),
              subtitle: getCurrentLanguageName(),
              children: (
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]} 
                  onPress={() => setShowLanguageModal(true)}
                >
                  <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                    {t('settings.languageSwitch')}
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
      
      {/* 语言选择弹窗 */}
      <Modal
        visible={showLanguageModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.languageSelector, { backgroundColor: colors.card }]}>
            {/* 标题栏 */}
            <View style={[styles.selectorHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.selectorTitle, { color: colors.text }]}>{t('settings.selectLanguage')}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Ionicons name="close" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            {/* 语言选项 */}
            <View style={styles.languageOptions}>
              {[
                { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳' },
                { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
                { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
                { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={[
                    styles.languageOption,
                    {
                      backgroundColor: currentLanguage === item.code ? colors.primary + '15' : 'transparent',
                      borderColor: currentLanguage === item.code ? colors.primary : colors.border,
                    }
                  ]}
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageFlag}>{item.flag}</Text>
                    <View style={styles.languageTextContainer}>
                      <Text style={[styles.languageName, { color: colors.text }]}>
                        {item.nativeName}
                      </Text>
                      <Text style={[styles.languageEnglishName, { color: colors.tabIconDefault }]}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  {currentLanguage === item.code && (
                    <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]}>
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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

  // 新的弹窗样式
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  languageSelector: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },

  selectorTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  languageOptions: {
    padding: 8,
  },

  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 8,
  },

  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  languageFlag: {
    fontSize: 28,
    marginRight: 16,
  },

  languageTextContainer: {
    flex: 1,
  },

  languageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },

  languageEnglishName: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
  },

  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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