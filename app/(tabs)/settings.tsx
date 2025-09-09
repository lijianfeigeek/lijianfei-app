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
import { 
  Ionicons as MoonIcon, 
  Ionicons as SunIcon, 
  Ionicons as BellIcon, 
  Ionicons as DatabaseIcon,
  Ionicons as InfoIcon,
  Ionicons as MailIcon,
  Ionicons as GithubIcon,
  Ionicons as ShareIcon 
} from '@expo/vector-icons';

/**
 * 设置页面
 * 提供应用设置、主题切换、关于信息等功能
 */
export default function SettingsScreen() {
  // 获取设备安全区域信息
  const insets = useSafeAreaInsets();
  
  // 状态管理 - 教学重点：设置项的状态管理
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highQualityImages, setHighQualityImages] = useState(false);
  const [cacheSize, setCacheSize] = useState('45.2 MB');

  /**
   * 切换深色模式
   */
  const toggleDarkMode = (value: boolean) => {
    setDarkMode(value);
    // TODO: 实现深色模式切换逻辑
    console.log('深色模式:', value ? '开启' : '关闭');
    
    // 显示切换提示
    Alert.alert(
      '深色模式',
      `深色模式已${value ? '开启' : '关闭'}`,
      [{ text: '确定' }]
    );
  };

  /**
   * 切换通知设置
   */
  const toggleNotifications = (value: boolean) => {
    setNotifications(value);
    // TODO: 实现通知权限管理
    console.log('推送通知:', value ? '开启' : '关闭');
  };

  /**
   * 切换自动保存
   */
  const toggleAutoSave = (value: boolean) => {
    setAutoSave(value);
    // TODO: 实现自动保存逻辑
    console.log('自动保存:', value ? '开启' : '关闭');
  };

  /**
   * 切换高质量图片
   */
  const toggleHighQualityImages = (value: boolean) => {
    setHighQualityImages(value);
    // TODO: 实现图片质量控制
    console.log('高质量图片:', value ? '开启' : '关闭');
  };

  /**
   * 清除缓存
   */
  const clearCache = () => {
    Alert.alert(
      '清除缓存',
      '确定要清除应用缓存吗？这可能会使应用加载变慢。',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '确定', 
          style: 'destructive',
          onPress: () => {
            // 模拟清除缓存
            setCacheSize('0 MB');
            Alert.alert('成功', '缓存已清除');
          }
        }
      ]
    );
  };

  /**
   * 分享应用
   */
  const shareApp = () => {
    // TODO: 实现应用分享功能
    Alert.alert(
      '分享应用',
      '分享 Nano Banana AI 给你的朋友',
      [
        { text: '取消', style: 'cancel' },
        { text: '分享', onPress: () => {
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
      '关于 Nano Banana AI',
      '版本: 1.0.0\n\n基于 Awesome-Nano-Banana-images 项目构建的移动端展示应用。\n\n展示 AI 生成的精彩创意作品。',
      [{ text: '确定' }]
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
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        {icon}
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
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
      <Text style={styles.groupTitle}>{title}</Text>
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
      }
    ]}>
      {/* 外观设置 */}
      {renderSettingGroup({
        title: '外观',
        children: (
          <>
            {renderSettingItem({
              icon: darkMode ? <MoonIcon name="moon" size={20} color="#007AFF" /> : <SunIcon name="sunny" size={20} color="#FF9500" />,
              title: '深色模式',
              subtitle: darkMode ? '当前使用深色主题' : '当前使用浅色主题',
              children: (
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#e9ecef', true: '#007AFF' }}
                  thumbColor={darkMode ? '#ffffff' : '#ffffff'}
                />
              ),
            })}
          </>
        ),
      })}

      {/* 功能设置 */}
      {renderSettingGroup({
        title: '功能',
        children: (
          <>
            {renderSettingItem({
              icon: <BellIcon name="notifications" size={20} color="#007AFF" />,
              title: '推送通知',
              subtitle: '接收新案例和功能更新通知',
              children: (
                <Switch
                  value={notifications}
                  onValueChange={toggleNotifications}
                  trackColor={{ false: '#e9ecef', true: '#007AFF' }}
                  thumbColor={notifications ? '#ffffff' : '#ffffff'}
                />
              ),
            })}

            {renderSettingItem({
              icon: <DatabaseIcon name="folder" size={20} color="#007AFF" />,
              title: '自动保存',
              subtitle: '自动保存收藏到本地',
              children: (
                <Switch
                  value={autoSave}
                  onValueChange={toggleAutoSave}
                  trackColor={{ false: '#e9ecef', true: '#007AFF' }}
                  thumbColor={autoSave ? '#ffffff' : '#ffffff'}
                />
              ),
            })}

            {renderSettingItem({
              icon: <DatabaseIcon name="folder" size={20} color="#007AFF" />,
              title: '高质量图片',
              subtitle: '加载高质量图片（消耗更多流量）',
              children: (
                <Switch
                  value={highQualityImages}
                  onValueChange={toggleHighQualityImages}
                  trackColor={{ false: '#e9ecef', true: '#007AFF' }}
                  thumbColor={highQualityImages ? '#ffffff' : '#ffffff'}
                />
              ),
            })}
          </>
        ),
      })}

      {/* 存储设置 */}
      {renderSettingGroup({
        title: '存储',
        children: (
          <>
            {renderSettingItem({
              icon: <DatabaseIcon name="folder" size={20} color="#007AFF" />,
              title: '清除缓存',
              subtitle: `当前缓存大小: ${cacheSize}`,
              children: (
                <TouchableOpacity style={styles.actionButton} onPress={clearCache}>
                  <Text style={styles.actionButtonText}>清除</Text>
                </TouchableOpacity>
              ),
            })}
          </>
        ),
      })}

      {/* 其他设置 */}
      {renderSettingGroup({
        title: '其他',
        children: (
          <>
            {renderSettingItem({
              icon: <ShareIcon name="share" size={20} color="#007AFF" />,
              title: '分享应用',
              subtitle: '分享给朋友',
              children: (
                <TouchableOpacity style={styles.actionButton} onPress={shareApp}>
                  <Text style={styles.actionButtonText}>分享</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <MailIcon name="mail" size={20} color="#007AFF" />,
              title: '意见反馈',
              subtitle: '发送邮件给我们',
              children: (
                <TouchableOpacity style={styles.actionButton} onPress={sendFeedback}>
                  <Text style={styles.actionButtonText}>反馈</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <GithubIcon name="logo-github" size={20} color="#007AFF" />,
              title: '源代码',
              subtitle: '查看 GitHub 项目',
              children: (
                <TouchableOpacity style={styles.actionButton} onPress={openGithub}>
                  <Text style={styles.actionButtonText}>查看</Text>
                </TouchableOpacity>
              ),
            })}

            {renderSettingItem({
              icon: <InfoIcon name="information-circle" size={20} color="#007AFF" />,
              title: '关于',
              subtitle: '版本 1.0.0',
              children: (
                <TouchableOpacity style={styles.actionButton} onPress={showAbout}>
                  <Text style={styles.actionButtonText}>关于</Text>
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
    backgroundColor: '#f8f9fa',
  },

  // 设置组样式
  settingGroup: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
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
    borderBottomColor: '#f0f0f0',
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
    color: '#333',
    marginBottom: 2,
  },

  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },

  // 操作按钮样式
  actionButton: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 12,
    color: '#007AFF',
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