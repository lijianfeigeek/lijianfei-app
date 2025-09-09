// hooks/useFavorites.ts - 收藏功能Hook
// 教学要点：React Context使用，状态管理，本地存储，实时同步

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Case } from '../types';

// 收藏状态接口
interface FavoritesState {
  favoriteIds: Set<number>;
  favoriteCases: Case[];
  isLoading: boolean;
}

// 收藏Context接口
interface FavoritesContextType extends FavoritesState {
  toggleFavorite: (caseItem: Case) => Promise<void>;
  isFavorite: (caseId: number) => boolean;
  clearAllFavorites: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
  onFavoritesChange?: (favoriteIds: Set<number>) => void;
}

// 创建Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// 收藏Provider组件
interface FavoritesProviderProps {
  children: ReactNode;
  onFavoritesChange?: (favoriteIds: Set<number>) => void;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children, onFavoritesChange }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [favoriteCases, setFavoriteCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从本地存储加载收藏状态
  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // 加载收藏ID列表
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favoriteIdArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      const favoriteIdSet = new Set<number>(favoriteIdArray);
      
      setFavoriteIds(favoriteIdSet);
      
      // 加载收藏案例数据
      const storedCases = await AsyncStorage.getItem('favoriteCases');
      if (storedCases) {
        const cases = JSON.parse(storedCases);
        setFavoriteCases(cases);
      }
      
    } catch (error) {
      console.error('加载收藏数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存收藏状态到本地存储
  const saveFavorites = useCallback(async (newFavoriteIds: Set<number>, cases: Case[]) => {
    try {
      // 保存收藏ID列表
      await AsyncStorage.setItem('favorites', JSON.stringify([...newFavoriteIds]));
      
      // 保存收藏案例数据
      await AsyncStorage.setItem('favoriteCases', JSON.stringify(cases));
      
    } catch (error) {
      console.error('保存收藏数据失败:', error);
    }
  }, []);

  // 切换收藏状态
  const toggleFavorite = useCallback(async (caseItem: Case) => {
    try {
      const newFavoriteIds = new Set(favoriteIds);
      let newFavoriteCases = [...favoriteCases];
      
      if (newFavoriteIds.has(caseItem.id)) {
        // 取消收藏
        newFavoriteIds.delete(caseItem.id);
        newFavoriteCases = newFavoriteCases.filter(c => c.id !== caseItem.id);
      } else {
        // 添加收藏
        newFavoriteIds.add(caseItem.id);
        newFavoriteCases.push(caseItem);
      }
      
      setFavoriteIds(newFavoriteIds);
      setFavoriteCases(newFavoriteCases);
      
      // 保存到本地存储
      await saveFavorites(newFavoriteIds, newFavoriteCases);
      
      // 通知外部组件收藏状态变化
      if (onFavoritesChange) {
        onFavoritesChange(newFavoriteIds);
      }
      
    } catch (error) {
      console.error('切换收藏状态失败:', error);
    }
  }, [favoriteIds, favoriteCases, saveFavorites]);

  // 检查是否收藏
  const isFavorite = useCallback((caseId: number) => {
    return favoriteIds.has(caseId);
  }, [favoriteIds]);

  // 清除所有收藏
  const clearAllFavorites = useCallback(async () => {
    try {
      const emptySet = new Set<number>();
      setFavoriteIds(emptySet);
      setFavoriteCases([]);
      
      // 清除本地存储
      await AsyncStorage.removeItem('favorites');
      await AsyncStorage.removeItem('favoriteCases');
      
      // 通知外部组件收藏状态变化
      if (onFavoritesChange) {
        onFavoritesChange(emptySet);
      }
      
    } catch (error) {
      console.error('清除收藏失败:', error);
    }
  }, []);

  // 刷新收藏数据
  const refreshFavorites = useCallback(async () => {
    await loadFavorites();
  }, [loadFavorites]);

  // 组件挂载时加载收藏数据
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // 提供Context值
  const contextValue: FavoritesContextType = {
    favoriteIds,
    favoriteCases,
    isLoading,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    refreshFavorites,
    onFavoritesChange,
  };

  return (
    React.createElement(FavoritesContext.Provider, { value: contextValue }, children)
  );
};

// 使用收藏Context的Hook
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// 导出类型供其他组件使用
export type { FavoritesContextType };