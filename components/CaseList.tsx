// components/CaseList.tsx - 案例列表组件
// 教学要点：FlatList使用，图片加载优化，状态管理，性能优化，错误处理

import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { Case } from '../types';

interface CaseListProps {
  cases: Case[];
  onCasePress: (caseItem: Case) => void;
  loading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

/**
 * 案例列表组件
 * 展示所有AI生成案例的列表，支持下拉刷新和性能优化
 */
export const CaseList: React.FC<CaseListProps> = ({
  cases,
  onCasePress,
  loading = false,
  onRefresh,
  refreshing = false,
}) => {
  /**
   * 渲染单个案例项
   * 使用TouchableOpacity提供点击反馈
   */
  const renderItem = ({ item }: { item: Case }) => (
    <TouchableOpacity 
      style={styles.caseItem}
      onPress={() => onCasePress(item)}
      activeOpacity={0.7} // 点击时的透明度变化
    >
      {/* 案例图片容器 */}
      <View style={styles.imageContainer}>
        <Image
          source={{ 
            uri: item.outputImages[0] || 'https://via.placeholder.com/400x200'
          }}
          style={styles.caseImage}
          resizeMode="cover"
          // 图片加载错误处理
          onError={(e) => {
            console.log('图片加载错误:', e.nativeEvent.error);
            // 可以在这里显示占位图
          }}
          // 图片加载完成回调
          onLoad={() => {
            console.log('图片加载完成:', item.title);
          }}
        />
        
        {/* 收藏标识 */}
        {item.isFavorite && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteText}>❤️</Text>
          </View>
        )}
      </View>
      
      {/* 案例信息容器 */}
      <View style={styles.caseInfo}>
        {/* 案例标题 */}
        <Text style={styles.caseTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        {/* 案例描述 */}
        <Text style={styles.caseDescription} numberOfLines={3}>
          {item.description}
        </Text>
        
        {/* 元信息行 */}
        <View style={styles.metaRow}>
          <Text style={styles.caseAuthor}>
            👤 {item.author}
          </Text>
          <Text style={styles.caseCategory}>
            📁 {item.category}
          </Text>
        </View>
        
        {/* 标签列表 */}
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
          {item.tags.length > 3 && (
            <Text style={styles.moreTags}>+{item.tags.length - 3}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * 列表为空时的显示组件
   */
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📱</Text>
      <Text style={styles.emptyTitle}>暂无案例数据</Text>
      <Text style={styles.emptyDescription}>
        {loading ? '正在加载中...' : '请检查网络连接或稍后重试'}
      </Text>
    </View>
  );

  /**
   * 列表头部组件
   */
  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        🤖 Nano Banana AI 案例展示
      </Text>
      <Text style={styles.headerSubtitle}>
        共 {cases.length} 个精彩案例
      </Text>
    </View>
  );

  /**
   * 下拉刷新配置
   */
  const refreshControl = onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      // iOS配置
      tintColor="#007AFF"
      title="正在刷新..."
      titleColor="#666"
      // Android配置
      colors={['#007AFF']}
      progressBackgroundColor="#ffffff"
    />
  ) : undefined;

  return (
    <FlatList
      data={cases}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      
      // 性能优化配置 - 教学重点：FlatList性能优化
      windowSize={10}                    // 渲染区域大小（屏幕高度的倍数）
      initialNumToRender={10}             // 初始渲染数量
      maxToRenderPerBatch={10}            // 每批渲染最大数量
      removeClippedSubviews={true}       // 移除不可见子视图（提升性能）
      maintainVisibleContentPosition={{ 
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 100 
      }} // 保持内容位置
      
      // 下拉刷新
      refreshControl={refreshControl}
      
      // 空状态和头部
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      
      // 列表样式
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      
      // 分隔线
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      
      // 平滑滚动
      decelerationRate="normal"
    />
  );
};

// 样式定义 - 教学要点：响应式设计，平台适配，视觉层次
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  caseItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Android阴影
    overflow: 'hidden', // 确保子视图不超出圆角
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  caseImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0', // 图片加载前的背景色
  },
  favoriteBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteText: {
    fontSize: 16,
  },
  caseInfo: {
    padding: 16,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 24,
  },
  caseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseAuthor: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  caseCategory: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tagText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 8,
  },
});

// 平台特定样式
if (Platform.OS === 'android') {
  styles.caseItem.elevation = 4;
  styles.favoriteBadge.elevation = 2;
}