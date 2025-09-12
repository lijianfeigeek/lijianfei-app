// app/(tabs)/favorites.tsx - 收藏页面
// 教学要点：本地存储，状态管理，收藏功能，数据持久化

import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Ionicons as HeartIcon, Ionicons as TrashIcon } from '@expo/vector-icons';
import { useFavorites } from '../../hooks/useFavorites';
import { useTranslation } from '../../hooks/useTranslation';
import { useLocalizedText } from '../../utils/localization';
import { Case } from '../../types';
import { Colors } from '../../constants/Colors';

/**
 * 收藏页面
 * 展示用户收藏的案例，支持取消收藏、分享等功能
 */
export default function FavoritesScreen() {
  // 获取设备安全区域信息和收藏状态
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t, currentLanguage } = useTranslation();
  const { getText, getTags } = useLocalizedText();
  
  const { 
    favoriteCases, 
    isLoading, 
    toggleFavorite, 
    clearAllFavorites 
  } = useFavorites();


  /**
   * 取消所有收藏
   */
  const handleClearAllFavorites = useCallback(() => {
    Alert.alert(
      t('common.clear') + t('tabs.favorites'),
      t('alerts.clearFavoritesConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.confirm'), 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllFavorites();
              Alert.alert(t('alerts.success'), t('alerts.allFavoritesCleared'));
            } catch (error) {
              console.error('清除收藏失败:', error);
              Alert.alert(t('alerts.error'), t('alerts.clearFavoritesFailed'));
            }
          }
        }
      ]
    );
  }, [clearAllFavorites, t, currentLanguage]);

  // 渲染收藏案例项
  const renderFavoriteItem = ({ item }: { item: Case }) => (
    <TouchableOpacity style={[styles.favoriteItem, { backgroundColor: colors.card }]}>
      {/* 案例信息 */}
      <View style={styles.favoriteContent}>
        <Text style={[styles.favoriteTitle, { color: colors.text }]} numberOfLines={2}>
          {getText(item.title)}
        </Text>
        <Text style={[styles.favoriteDescription, { color: colors.tabIconDefault }]} numberOfLines={3}>
          {getText(item.description)}
        </Text>
        <View style={styles.favoriteMeta}>
          <Text style={[styles.favoriteAuthor, { color: colors.tabIconDefault, backgroundColor: colors.border + '20' }]}>👤 {item.author}</Text>
          <Text style={[styles.favoriteCategory, { color: colors.primary, backgroundColor: colors.primary + '20' }]}>📁 {getText(item.category)}</Text>
        </View>
        <View style={styles.favoriteTags}>
          {getTags(item.tags).slice(0, 3).map((tag, index) => (
            <Text key={index} style={[styles.favoriteTag, { color: colors.tabIconDefault, backgroundColor: colors.border + '20' }]}>#{tag}</Text>
          ))}
        </View>
      </View>
      
      {/* 操作按钮 */}
      <View style={styles.favoriteActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.unfavoriteButton]}
          onPress={() => toggleFavorite(item)}
        >
          <HeartIcon name="heart" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // 渲染空状态
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🤍</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{t('favorites.empty')}</Text>
      <Text style={[styles.emptyDescription, { color: colors.tabIconDefault }]}>
        {t('favorites.emptyHint')}
      </Text>
    </View>
  );

  // 渲染头部
  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>{t('favorites.title')}</Text>
      <Text style={[styles.headerSubtitle, { color: colors.tabIconDefault }]}>
        {favoriteCases.length} {t('case.favorite')}
      </Text>
      {favoriteCases.length > 0 && (
        <TouchableOpacity 
          style={[styles.clearButton, { backgroundColor: colors.border + '20' }]}
          onPress={handleClearAllFavorites}
        >
          <TrashIcon name="trash" size={16} color="#f44336" />
          <Text style={[styles.clearButtonText, { color: '#f44336' }]}>{t('common.clear')}{t('tabs.favorites')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>{t('favorites.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      {
        // 适配安全区域
        // paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        backgroundColor: colors.background,
      }
    ]}>
      <FlatList
        data={favoriteCases}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        // 性能优化配置
        windowSize={10}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
      />
    </View>
  );
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f9fa', // 动态设置
  },
  
  listContainer: {
    padding: 16,
  },
  
  // 头部样式
  header: {
    // backgroundColor: '#ffffff', // 动态设置
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    // color: '#1a1a1a', // 动态设置
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 14,
    // color: '#666', // 动态设置
    marginBottom: 12,
  },
  
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ffebee', // 动态设置
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  
  clearButtonText: {
    fontSize: 12,
    // color: '#f44336', // 动态设置
    fontWeight: '600',
  },
  
  // 收藏项样式
  favoriteItem: {
    // backgroundColor: '#ffffff', // 动态设置
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  favoriteContent: {
    flex: 1,
    marginRight: 12,
  },
  
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    // color: '#333', // 动态设置
    marginBottom: 8,
    lineHeight: 22,
  },
  
  favoriteDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
    marginBottom: 12,
    lineHeight: 20,
  },
  
  favoriteMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  favoriteAuthor: {
    fontSize: 12,
    // color: '#888', // 动态设置
    // backgroundColor: '#f0f0f0', // 动态设置
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  favoriteCategory: {
    fontSize: 12,
    // color: '#007AFF', // 动态设置
    // backgroundColor: '#e3f2fd', // 动态设置
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  favoriteTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  
  favoriteTag: {
    fontSize: 11,
    // color: '#666', // 动态设置
    // backgroundColor: '#f8f9fa', // 动态设置
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  // 操作按钮样式
  favoriteActions: {
    justifyContent: 'center',
    gap: 8,
  },
  
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  
  unfavoriteButton: {
    backgroundColor: '#f44336',
  },
  
  // 空状态样式
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    // color: '#333', // 动态设置
    marginBottom: 8,
  },
  
  emptyDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
  
  // 加载状态
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: 16,
    // color: '#666', // 动态设置
    marginTop: 12,
  },
});

/**
 * 教学要点总结：
 * 
 * 1. 本地存储概念：
 *    - AsyncStorage的基本使用
 *    - 数据的序列化和反序列化
 *    - 数据持久化的最佳实践
 * 
 * 2. 状态管理：
 *    - 复杂状态的同步更新
 *    - 状态间的依赖关系
 *    - 状态更新的性能优化
 * 
 * 3. 用户交互设计：
 *    - 收藏/取消收藏的即时反馈
 *    - 批量操作的确认机制
 *    - 用户操作的撤销能力
 * 
 * 4. 数据处理：
 *    - 数组的过滤和映射
 *    - 数据的同步和异步处理
 *    - 错误处理和异常捕获
 * 
 * 5. UI/UX设计：
 *    - 空状态的友好展示
 *    - 操作按钮的视觉反馈
 *    - 列表的性能优化
 * 
 * 6. 功能扩展性：
 *    - 分享功能的预留接口
 *    - 云同步的可能性
 *    - 数据导入导出的考虑
 */