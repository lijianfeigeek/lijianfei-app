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
import { useColorScheme } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import { useTranslation } from '../hooks/useTranslation';
import { useLocalizedText } from '../utils/localization';
import { Case } from '../types';
import { Colors } from '../constants/Colors';

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
  const { isFavorite } = useFavorites();
  const { t, currentLanguage } = useTranslation();
  const { getText, getTags } = useLocalizedText();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  /**
   * 渲染单个案例项
   * 使用TouchableOpacity提供点击反馈
   */
  const renderItem = ({ item }: { item: Case }) => (
    <TouchableOpacity 
      style={[styles.caseItem, { backgroundColor: colors.card }]}
      onPress={() => onCasePress(item)}
      activeOpacity={0.7} // 点击时的透明度变化
    >
      {/* 案例图片容器 */}
      <View style={styles.imageContainer}>
        <Image
          source={item.outputImages && item.outputImages.length > 0 ? item.outputImages[0] : require('../assets/images/adaptive-icon.png')}
          style={styles.caseImage}
          resizeMode="cover"
          // 图片加载错误处理
          onError={(e) => {
            console.log('图片加载错误:', e.nativeEvent.error);
            // 可以在这里显示占位图
          }}
          // 图片加载完成回调
          onLoad={() => {
            console.log('图片加载完成:', getText(item.title));
          }}
        />
        
        {/* 收藏标识 */}
        {isFavorite(item.id) && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteText}>❤️</Text>
          </View>
        )}
      </View>
      
      {/* 案例信息容器 */}
      <View style={styles.caseInfo}>
        {/* 案例标题 */}
        <Text style={[styles.caseTitle, { color: colors.text }]} numberOfLines={2}>
          {getText(item.title)}
        </Text>
        
        {/* 案例描述 */}
        <Text style={[styles.caseDescription, { color: colors.tabIconDefault }]} numberOfLines={3}>
          {getText(item.description)}
        </Text>
        
        {/* 元信息行 */}
        <View style={styles.metaRow}>
          <Text style={[styles.caseAuthor, { color: colors.tabIconDefault, backgroundColor: colors.border + '20' }]}>
            📎 来源：{item.author}
          </Text>
          <Text style={[styles.caseCategory, { color: colors.primary, backgroundColor: colors.primary + '20' }]}>
            📁 {getText(item.category)}
          </Text>
        </View>
        
        {/* 标签列表 */}
        <View style={styles.tagsContainer}>
          {getTags(item.tags).slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: colors.border + '20', borderColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.tabIconDefault }]}>#{tag}</Text>
            </View>
          ))}
          {item.tags.length > 3 && (
            <Text style={[styles.moreTags, { color: colors.tabIconDefault }]}>+{item.tags.length - 3}</Text>
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
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{t('home.noCases')}</Text>
      <Text style={[styles.emptyDescription, { color: colors.tabIconDefault }]}>
        {loading ? t('common.loading') : t('home.checkConnection')}
      </Text>
    </View>
  );

  /**
   * 列表头部组件
   */
  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        {t('app.title')}
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.tabIconDefault }]}>
        {t('home.caseCount', { count: cases.length })}
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
      tintColor={colors.primary}
      title={t('home.refreshing')}
      titleColor={colors.tabIconDefault}
      // Android配置
      colors={[colors.primary]}
      progressBackgroundColor={colors.card}
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
      contentContainerStyle={[styles.listContainer, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      
      // 分隔线
      ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      
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
    // backgroundColor: '#f8f9fa', // 动态设置
  },
  caseItem: {
    // backgroundColor: '#ffffff', // 动态设置
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
    // color: '#1a1a1a', // 动态设置
    marginBottom: 8,
    lineHeight: 24,
  },
  caseDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
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
    // color: '#888', // 动态设置
    // backgroundColor: '#f0f0f0', // 动态设置
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  caseCategory: {
    fontSize: 12,
    // color: '#007AFF', // 动态设置
    // backgroundColor: '#e3f2fd', // 动态设置
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
    // backgroundColor: '#f8f9fa', // 动态设置
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: '#e9ecef', // 动态设置
  },
  tagText: {
    fontSize: 11,
    // color: '#666', // 动态设置
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 11,
    // color: '#999', // 动态设置
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
    // color: '#333', // 动态设置
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
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
    // color: '#1a1a1a', // 动态设置
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    // color: '#666', // 动态设置
  },
  separator: {
    height: 1,
    // backgroundColor: '#e9ecef', // 动态设置
    marginVertical: 8,
  },
});

// 平台特定样式
if (Platform.OS === 'android') {
  styles.caseItem.elevation = 4;
  styles.favoriteBadge.elevation = 2;
}