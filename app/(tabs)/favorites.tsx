// app/(tabs)/favorites.tsx - 收藏页面
// 教学要点：本地存储，状态管理，收藏功能，数据持久化

import React, { useState, useEffect, useCallback } from 'react';
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
import { Ionicons as HeartIcon, Ionicons as TrashIcon, Ionicons as ShareIcon } from '@expo/vector-icons';
import { generateMockCases } from '../../data/mockData';
import { Case } from '../../types';

/**
 * 收藏页面
 * 展示用户收藏的案例，支持取消收藏、分享等功能
 */
export default function FavoritesScreen() {
  // 获取设备安全区域信息
  const insets = useSafeAreaInsets();
  
  // 状态管理
  const [cases, setCases] = useState<Case[]>([]);
  const [favoriteCases, setFavoriteCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 加载案例数据
   * 从本地存储或模拟数据加载
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCases = generateMockCases();
      
      // 为演示目的，随机设置一些案例为收藏状态
      const casesWithFavorites = mockCases.map((caseItem, index) => ({
        ...caseItem,
        isFavorite: index % 5 === 0 // 每5个案例中有一个是收藏的
      }));
      
      setCases(casesWithFavorites);
      
      // 过滤出收藏的案例
      const favorites = casesWithFavorites.filter(caseItem => caseItem.isFavorite);
      setFavoriteCases(favorites);
      
      // TODO: 从AsyncStorage加载收藏状态
      // const storedFavorites = await AsyncStorage.getItem('favorites');
      // if (storedFavorites) {
      //   const favoriteIds = JSON.parse(storedFavorites);
      //   const favorites = casesWithFavorites.filter(caseItem => 
      //     favoriteIds.includes(caseItem.id)
      //   );
      //   setFavoriteCases(favorites);
      // }
      
    } catch (error) {
      console.error('加载数据失败:', error);
      Alert.alert('错误', '无法加载收藏数据');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 切换收藏状态
   * 核心收藏功能实现
   */
  const toggleFavorite = useCallback(async (caseId: number) => {
    try {
      // 更新案例数据
      const updatedCases = cases.map(caseItem => 
        caseItem.id === caseId 
          ? { ...caseItem, isFavorite: !caseItem.isFavorite }
          : caseItem
      );
      
      setCases(updatedCases);
      
      // 更新收藏列表
      const favorites = updatedCases.filter(caseItem => caseItem.isFavorite);
      setFavoriteCases(favorites);
      
      // TODO: 保存到AsyncStorage
      // const favoriteIds = favorites.map(f => f.id);
      // await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIds));
      
      // 显示操作反馈
      const caseItem = cases.find(c => c.id === caseId);
      if (caseItem) {
        const isNowFavorite = !caseItem.isFavorite;
        Alert.alert(
          isNowFavorite ? '已添加到收藏' : '已取消收藏',
          `"${caseItem.title}"${isNowFavorite ? '已添加到收藏列表' : '已从收藏列表移除'}`,
          [{ text: '确定' }]
        );
      }
      
    } catch (error) {
      console.error('更新收藏状态失败:', error);
      Alert.alert('错误', '无法更新收藏状态');
    }
  }, [cases]);

  /**
   * 取消所有收藏
   */
  const clearAllFavorites = useCallback(() => {
    Alert.alert(
      '清除所有收藏',
      '确定要清除所有收藏的案例吗？此操作不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '确定', 
          style: 'destructive',
          onPress: async () => {
            try {
              // 更新所有案例的收藏状态
              const updatedCases = cases.map(caseItem => ({
                ...caseItem,
                isFavorite: false
              }));
              
              setCases(updatedCases);
              setFavoriteCases([]);
              
              // TODO: 清除AsyncStorage中的收藏数据
              // await AsyncStorage.removeItem('favorites');
              
              Alert.alert('成功', '已清除所有收藏');
              
            } catch (error) {
              console.error('清除收藏失败:', error);
              Alert.alert('错误', '无法清除收藏数据');
            }
          }
        }
      ]
    );
  }, [cases]);

  /**
   * 分享案例
   */
  const shareCase = useCallback((caseItem: Case) => {
    // TODO: 实现分享功能
    Alert.alert(
      '分享案例',
      `分享 "${caseItem.title}" 到社交媒体`,
      [
        { text: '取消', style: 'cancel' },
        { text: '分享', onPress: () => {
          // 这里将实现实际的分享功能
          console.log('分享案例:', caseItem.title);
        }}
      ]
    );
  }, []);

  /**
   * 组件挂载时加载数据
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 渲染收藏案例项
  const renderFavoriteItem = ({ item }: { item: Case }) => (
    <TouchableOpacity style={styles.favoriteItem}>
      {/* 案例信息 */}
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.favoriteDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.favoriteMeta}>
          <Text style={styles.favoriteAuthor}>👤 {item.author}</Text>
          <Text style={styles.favoriteCategory}>📁 {item.category}</Text>
        </View>
        <View style={styles.favoriteTags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <Text key={index} style={styles.favoriteTag}>#{tag}</Text>
          ))}
        </View>
      </View>
      
      {/* 操作按钮 */}
      <View style={styles.favoriteActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.unfavoriteButton]}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIcon name="heart" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => shareCase(item)}
        >
          <ShareIcon name="share" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // 渲染空状态
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🤍</Text>
      <Text style={styles.emptyTitle}>暂无收藏</Text>
      <Text style={styles.emptyDescription}>
        快去浏览案例，点击爱心图标收藏你喜欢的作品吧！
      </Text>
    </View>
  );

  // 渲染头部
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>我的收藏</Text>
      <Text style={styles.headerSubtitle}>
        共 {favoriteCases.length} 个收藏案例
      </Text>
      {favoriteCases.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearAllFavorites}
        >
          <TrashIcon name="trash" size={16} color="#f44336" />
          <Text style={styles.clearButtonText}>清除所有</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>加载收藏中...</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      {
        // 适配安全区域
        // paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
    backgroundColor: '#f8f9fa',
  },
  
  listContainer: {
    padding: 16,
  },
  
  // 头部样式
  header: {
    backgroundColor: '#ffffff',
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
    color: '#1a1a1a',
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  
  clearButtonText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '600',
  },
  
  // 收藏项样式
  favoriteItem: {
    backgroundColor: '#ffffff',
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
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  
  favoriteDescription: {
    fontSize: 14,
    color: '#666',
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
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  favoriteCategory: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
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
    color: '#666',
    backgroundColor: '#f8f9fa',
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
  
  shareButton: {
    backgroundColor: '#4CAF50',
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
    color: '#333',
    marginBottom: 8,
  },
  
  emptyDescription: {
    fontSize: 14,
    color: '#666',
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
    color: '#666',
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