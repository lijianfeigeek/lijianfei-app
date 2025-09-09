// app/(tabs)/cases/index.tsx - 案例列表主页面
// 教学要点：页面组件结构，状态管理，数据流，错误处理，导航

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaseList } from '../../components/CaseList';
import { generateMockCases } from '../../data/mockData';
import { Case } from '../../types';

/**
 * 案例列表主页面
 * 展示所有AI生成案例，支持下拉刷新和导航到详情页
 */
export default function CasesScreen() {
  // 获取设备安全区域信息
  const insets = useSafeAreaInsets();
  
  // 状态管理 - 教学重点：React Hooks使用
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 加载案例数据
   * 模拟网络请求和数据加载过程
   */
  const loadCases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 生成模拟数据
      const mockCases = generateMockCases();
      
      // 按创建时间排序（最新的在前）
      const sortedCases = mockCases.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setCases(sortedCases);
      
      console.log('案例数据加载完成，共', sortedCases.length, '个案例');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '加载失败';
      setError(errorMessage);
      console.error('加载案例数据失败:', err);
      
      // 显示错误提示
      Alert.alert(
        '加载失败',
        '无法加载案例数据，请检查网络连接后重试。',
        [
          { text: '取消', style: 'cancel' },
          { text: '重试', onPress: loadCases }
        ]
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 下拉刷新处理
   * 重新加载案例数据
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadCases();
    } finally {
      setRefreshing(false);
    }
  }, [loadCases]);

  /**
   * 处理案例点击事件
   * 导航到案例详情页面
   */
  const handleCasePress = useCallback((caseItem: Case) => {
    // TODO: 实现导航到详情页的逻辑
    console.log('点击案例:', caseItem.title);
    Alert.alert(
      '案例详情',
      `你点击了案例: ${caseItem.title}\n\n${caseItem.description}`,
      [
        { text: '取消', style: 'cancel' },
        { text: '查看详情', onPress: () => {
          // 这里将实现导航到详情页
          console.log('导航到详情页，案例ID:', caseItem.id);
        }}
      ]
    );
  }, []);

  /**
   * 组件挂载时加载数据
   * useEffect的使用示例
   */
  useEffect(() => {
    loadCases();
  }, [loadCases]);

  // 错误状态显示
  if (error && cases.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>加载失败</Text>
        <Text style={styles.errorMessage}>{error}</Text>
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
      {/* 页面标题 */}
      <View style={[
        styles.header,
        // {
        //   // 适配顶部安全区域
        //   paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 20,
        // }
      ]}>
        <Text style={styles.title}>🤖 Nano Banana AI</Text>
        <Text style={styles.subtitle}>探索AI创意生成的无限可能</Text>
      </View>

      {/* 案例列表组件 */}
      <CaseList
        cases={cases}
        onCasePress={handleCasePress}
        loading={loading}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

// 样式定义 - 教学要点：页面布局，响应式设计，视觉层次
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // 页面头部样式
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  // 错误状态样式
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

/**
 * 教学要点总结：
 * 
 * 1. 组件结构：
 *    - 函数式组件的定义和使用
 *    - TypeScript类型注解
 *    - 组件的职责分离
 * 
 * 2. 状态管理：
 *    - useState hook的使用
 *    - 状态类型定义
 *    - 状态更新逻辑
 * 
 * 3. 副作用处理：
 *    - useEffect hook的使用
 *    - 依赖数组的管理
 *    - 清理函数的重要性
 * 
 * 4. 性能优化：
 *    - useCallback hook的使用
 *    - 避免不必要的重渲染
 *    - 事件处理函数的优化
 * 
 * 5. 错误处理：
 *    - try-catch错误捕获
 *    - 用户友好的错误提示
 *    - 错误状态的UI展示
 * 
 * 6. 数据流：
 *    - 数据加载逻辑
 *    - 数据传递给子组件
 *    - 事件冒泡和处理
 * 
 * 7. 用户体验：
 *    - 加载状态显示
 *    - 下拉刷新功能
 *    - 空状态和错误状态处理
 */