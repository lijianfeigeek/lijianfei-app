// app/(tabs)/search.tsx - 搜索页面
// 教学要点：搜索功能实现，实时搜索，状态管理，UI组件

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons as SearchIcon, Ionicons as XIcon, Ionicons as FilterIcon, Ionicons as ChevronIcon } from '@expo/vector-icons';
import { generateMockCases, getCategories, getAllTags } from '../../data/mockData';
import { Case } from '../../types';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useTranslation } from '../../hooks/useTranslation';
import { useLocalizedText } from '../../utils/localization';

/**
 * 搜索页面
 * 提供案例搜索和筛选功能
 */
export default function SearchScreen() {
  // 获取设备安全区域信息、路由器和颜色方案
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();
  const { getText, getTags } = useLocalizedText();
  
  // 状态管理 - 教学重点：复杂状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  /**
   * 加载初始数据
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCases = generateMockCases();
      const caseCategories = getCategories(mockCases);
      const tags = getAllTags(mockCases);
      
      setCases(mockCases);
      setCategories(caseCategories);
      setAllTags(tags);
      setFilteredCases([]);
      
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 过滤案例数据
   * 核心搜索逻辑实现
   */
  const filterCases = useCallback(() => {
    // 如果没有搜索查询、分类和标签，则显示空结果
    if (!searchQuery.trim() && !selectedCategory && selectedTags.length === 0) {
      setFilteredCases([]);
      return;
    }

    let filtered = cases;

    // 按搜索关键词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(caseItem => 
        getText(caseItem.title).toLowerCase().includes(query) ||
        getText(caseItem.description).toLowerCase().includes(query) ||
        getText(caseItem.prompt).toLowerCase().includes(query) ||
        caseItem.author.toLowerCase().includes(query) ||
        getTags(caseItem.tags).some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 按分类过滤
    if (selectedCategory) {
      filtered = filtered.filter(caseItem => 
        getText(caseItem.category) === selectedCategory
      );
    }

    // 按标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter(caseItem => 
        selectedTags.every(tag => getTags(caseItem.tags).includes(tag))
      );
    }

    setFilteredCases(filtered);
  }, [cases, searchQuery, selectedCategory, selectedTags]);

  /**
   * 处理搜索输入变化
   * 实现实时搜索
   */
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  /**
   * 选择分类
   */
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(prev => prev === category ? '' : category);
  }, []);

  /**
   * 切换标签选择
   */
  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  /**
   * 清除所有筛选
   */
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
  }, []);

  /**
   * 处理搜索结果点击事件
   * 导航到案例详情页面
   */
  const handleResultPress = useCallback((caseItem: Case) => {
    // 使用Expo Router导航到详情页面
    console.log('搜索结果点击，导航到详情页，案例ID:', caseItem.id);
    router.push(`/case/${caseItem.id}`);
  }, [router]);

  /**
   * 组件挂载时加载数据
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * 当筛选条件变化时重新过滤数据
   */
  useEffect(() => {
    filterCases();
  }, [filterCases]);

  // 渲染搜索输入框
  const renderSearchBar = () => (
    <View style={[
      styles.searchContainer,
      {
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
      }
    ]}>
      <View style={[
        styles.searchInputContainer,
        {
          backgroundColor: colors.border + '20',
        }
      ]}>
        <SearchIcon name="search" size={20} color={colors.tabIconDefault} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholderTextColor={colors.tabIconDefault}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <XIcon name="close" size={16} color={colors.tabIconDefault} />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.filterButton,
          {
            backgroundColor: colors.primary + '20',
          }
        ]}
        onPress={() => setShowFilters(!showFilters)}
      >
        <FilterIcon name="filter" size={20} color={colors.primary} />
        <Text style={[styles.filterButtonText, { color: colors.primary }]}>{t('common.filter')}</Text>
      </TouchableOpacity>
    </View>
  );

  // 渲染筛选面板
  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <View style={[
        styles.filtersContainer,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        }
      ]}>
        {/* 分类筛选 */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterTitle, { color: colors.text }]}>{t('search.categories')}</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected,
                  {
                    backgroundColor: selectedCategory === category ? colors.primary : colors.border + '20',
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextSelected,
                  {
                    color: selectedCategory === category ? '#ffffff' : colors.text,
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 标签筛选 */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterTitle, { color: colors.text }]}>{t('search.tags')}</Text>
          <View style={styles.tagsContainer}>
            {allTags.slice(0, 12).map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagChip,
                  selectedTags.includes(tag) && styles.tagChipSelected,
                  {
                    backgroundColor: selectedTags.includes(tag) ? colors.primary : colors.border + '20',
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => handleTagToggle(tag)}
              >
                <Text style={[
                  styles.tagChipText,
                  selectedTags.includes(tag) && styles.tagChipTextSelected,
                  {
                    color: selectedTags.includes(tag) ? '#ffffff' : colors.text,
                  }
                ]}>
                  #{tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 清除按钮 */}
        {(selectedCategory || selectedTags.length > 0) && (
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>{t('search.clearFilters')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // 渲染搜索结果统计
  const renderSearchStats = () => {
    // 只有当有搜索条件时才显示统计信息
    if (!searchQuery.trim() && !selectedCategory && selectedTags.length === 0) {
      return null;
    }

    return (
      <View style={[
        styles.searchStats,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        }
      ]}>
        <Text style={[styles.searchStatsText, { color: colors.tabIconDefault }]}>
          {t('search.resultsFound', { count: filteredCases.length })}
          {(searchQuery || selectedCategory || selectedTags.length > 0) && (
            <Text style={[styles.searchStatsQuery, { color: colors.primary }]}>
              {searchQuery && ` "${searchQuery}"`}
              {selectedCategory && ` ${t('search.categories')}: ${selectedCategory}`}
              {selectedTags.length > 0 && ` ${t('search.tags')}: ${selectedTags.join(', ')}`}
            </Text>
          )}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>{t('common.loading')}</Text>
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
      {/* 搜索栏 */}
      {renderSearchBar()}
      
      {/* 筛选面板 */}
      {renderFilters()}
      
      {/* 搜索结果统计 */}
      {renderSearchStats()}
      
      {/* 搜索结果列表 */}
      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.resultItem, { backgroundColor: colors.card, borderLeftColor: colors.primary }]}
            onPress={() => handleResultPress(item)}
          >
            <View style={styles.resultContent}>
              <View style={styles.resultText}>
                <Text style={[styles.resultTitle, { color: colors.text }]}>{getText(item.title)}</Text>
                <Text style={[styles.resultDescription, { color: colors.tabIconDefault }]} numberOfLines={2}>
                  {getText(item.description)}
                </Text>
                <View style={styles.resultMeta}>
                  <Text style={[styles.resultAuthor, { color: colors.tabIconDefault }]}>{item.author}</Text>
                  <Text style={[styles.resultCategory, { color: colors.primary }]}>{getText(item.category)}</Text>
                </View>
              </View>
              <ChevronIcon name="chevron-forward" size={20} color={colors.tabIconDefault} style={styles.chevronIcon} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {!searchQuery.trim() && !selectedCategory && selectedTags.length === 0 
                ? t('search.startSearch') 
                : t('search.noResults')
              }
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.tabIconDefault }]}>
              {!searchQuery.trim() && !selectedCategory && selectedTags.length === 0 
                ? t('search.searchHint')
                : t('search.tryAdjustSearch')
              }
            </Text>
          </View>
        )}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );
}

// 样式定义 - 教学要点：复杂UI布局，交互设计
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // 搜索栏样式
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    gap: 12,
  },
  
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  
  searchIcon: {
    marginRight: 8,
  },
  
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  
  clearButton: {
    padding: 4,
  },
  
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // 筛选面板样式
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  
  filterSection: {
    marginBottom: 16,
  },
  
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  
  categoryChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  categoryChipTextSelected: {
    color: '#ffffff',
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  
  tagChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  
  tagChipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  
  tagChipTextSelected: {
    color: '#ffffff',
  },
  
  clearFiltersButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  
  clearFiltersText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '600',
  },
  
  // 搜索结果统计
  searchStats: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  searchStatsText: {
    fontSize: 14,
    color: '#666',
  },
  
  searchStatsQuery: {
    color: '#007AFF',
    fontWeight: '500',
  },
  
  // 搜索结果列表
  resultsList: {
    padding: 16,
  },
  
  resultItem: {
    // backgroundColor: '#ffffff', // 动态设置
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    // borderLeftColor: '#007AFF', // 动态设置
  },
  
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    // color: '#333', // 动态设置
    marginBottom: 4,
  },
  
  resultDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
    marginBottom: 8,
    lineHeight: 20,
  },
  
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  resultAuthor: {
    fontSize: 12,
    // color: '#999', // 动态设置
  },
  
  resultCategory: {
    fontSize: 12,
    // color: '#007AFF', // 动态设置
    fontWeight: '500',
  },
  
  // 搜索结果内容布局
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  resultText: {
    flex: 1,
    marginRight: 12,
  },
  
  chevronIcon: {
    marginLeft: 8,
  },
  
  // 空状态
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
  },
  
  emptyDescription: {
    fontSize: 14,
    // color: '#666', // 动态设置
    textAlign: 'center',
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
 * 1. 复杂状态管理：
 *    - 多个相关状态的协同管理
 *    - 状态之间的依赖关系
 *    - 状态更新的时机控制
 * 
 * 2. 搜索算法实现：
 *    - 多条件过滤逻辑
 *    - 实时搜索性能优化
 *    - 搜索结果的排序和分页
 * 
 * 3. 用户体验设计：
 *    - 搜索输入的实时反馈
 *    - 筛选条件的直观展示
 *    - 空状态的友好提示
 * 
 * 4. 组件化思维：
 *    - 复杂UI的拆分
 *    - 可复用组件的设计
 *    - 组件间的数据传递
 * 
 * 5. 性能优化：
 *    - useCallback的使用
 *    - 列表渲染的性能优化
 *    - 避免不必要的重渲染
 * 
 * 6. 响应式设计：
 *    - 不同屏幕尺寸的适配
 *    - 触摸区域的合理设置
 *    - 键盘弹出时的布局调整
 */