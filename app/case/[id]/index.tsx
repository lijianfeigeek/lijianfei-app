// app/case/[id]/index.tsx - 案例详情页面
// 教学要点：Expo Router动态路由，参数获取，图片查看器，状态管理，用户体验

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { generateMockCases } from '../../../data/mockData';
import { Case } from '../../../types';

/**
 * 案例详情页面
 * 展示案例的详细信息，包括图片轮播、描述、提示词等
 */
export default function CaseDetailScreen() {
  // 获取路由参数和导航器
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // 状态管理
  const [caseItem, setCaseItem] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [favoriteAnimating, setFavoriteAnimating] = useState(false);

  // 模拟数据获取
  React.useEffect(() => {
    const loadCaseDetail = async () => {
      try {
        setLoading(true);
        
        // 模拟网络请求延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 获取所有案例数据
        const allCases = generateMockCases();
        const caseId = parseInt(id || '1');
        const foundCase = allCases.find(c => c.id === caseId);
        
        if (foundCase) {
          setCaseItem(foundCase);
        } else {
          Alert.alert('错误', '找不到该案例', [
            { text: '返回', onPress: () => router.back() }
          ]);
        }
      } catch (error) {
        console.error('加载案例详情失败:', error);
        Alert.alert('错误', '加载案例详情失败', [
          { text: '返回', onPress: () => router.back() }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCaseDetail();
  }, [id, router]);

  /**
   * 处理图片点击事件
   * 打开图片查看器
   */
  const handleImagePress = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  }, []);

  /**
   * 分享功能
   */
  const handleShare = useCallback(async () => {
    if (!caseItem) return;
    
    try {
      await Share.share({
        title: `Nano Banana AI案例: ${caseItem.title}`,
        message: `${caseItem.title}\n\n${caseItem.description}\n\n来自 Nano Banana AI`,
        url: 'https://github.com/yourusername/Awesome-Nano-Banana-images',
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  }, [caseItem]);

  /**
   * 收藏功能
   */
  const handleToggleFavorite = useCallback(() => {
    if (!caseItem) return;
    
    setFavoriteAnimating(true);
    
    const updatedCase = {
      ...caseItem,
      isFavorite: !caseItem.isFavorite,
    };
    setCaseItem(updatedCase);
    
    setTimeout(() => {
      setFavoriteAnimating(false);
    }, 300);
  }, [caseItem]);

  // 加载状态
  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    );
  }

  // 案例不存在
  if (!caseItem) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>案例不存在</Text>
        </View>
      </View>
    );
  }

  // 获取所有图片（输入图片 + 输出图片）
  const allImages = [...caseItem.inputImages, ...caseItem.outputImages];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {caseItem.title}
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              favoriteAnimating && styles.favoriteButtonAnimating
            ]}
            onPress={handleToggleFavorite}
          >
            <Ionicons 
              name={caseItem.isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={caseItem.isFavorite ? "#ff3b30" : "#333"} 
              style={[
                favoriteAnimating && styles.favoriteIconAnimating
              ]}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 图片轮播区域 */}
        <View style={styles.imageCarousel}>
          <ScrollView 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
              setCurrentImageIndex(index);
            }}
          >
            {allImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.imageSlide}
                onPress={() => handleImagePress(index)}
                activeOpacity={0.9}
              >
                <Image
                  source={image}
                  style={styles.mainImage}
                  resizeMode="contain"
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={(e) => {
                    console.log('图片加载错误:', e.nativeEvent.error);
                    setImageLoading(false);
                  }}
                />
                
                {/* 图片加载指示器 */}
                {imageLoading && (
                  <View style={styles.imageLoadingOverlay}>
                    <Text style={styles.loadingText}>加载中...</Text>
                  </View>
                )}
                
                {/* 图片类型标签 */}
                <View style={styles.imageTypeLabel}>
                  <Text style={styles.imageTypeText}>
                    {index < caseItem.inputImages.length ? '输入图片' : '输出图片'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* 图片指示器 */}
          <View style={styles.imageIndicator}>
            {allImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  index === currentImageIndex && styles.indicatorDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* 案例信息区域 */}
        <View style={styles.infoSection}>
          {/* 标题和分类 */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{caseItem.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.author}>👤 {caseItem.author}</Text>
              <Text style={styles.category}>📁 {caseItem.category}</Text>
            </View>
          </View>

          {/* 描述 */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>案例描述</Text>
            <Text style={styles.description}>{caseItem.description}</Text>
          </View>

          {/* AI提示词 */}
          <View style={styles.promptSection}>
            <Text style={styles.sectionTitle}>AI提示词</Text>
            <View style={styles.promptContainer}>
              <Text style={styles.prompt}>{caseItem.prompt}</Text>
            </View>
          </View>

          {/* 标签 */}
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>相关标签</Text>
            <View style={styles.tagsContainer}>
              {caseItem.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 创建时间 */}
          <View style={styles.timeSection}>
            <Text style={styles.timeText}>
              创建时间: {new Date(caseItem.createdAt).toLocaleString('zh-CN')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 图片查看器 */}
      {showImageViewer && (
        <ImageViewerModal
          images={allImages}
          initialIndex={currentImageIndex}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </View>
  );
}

/**
 * 图片查看器模态框组件
 */
const ImageViewerModal: React.FC<{
  images: any[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollViewRef = React.useRef<ScrollView>(null);

  /**
   * 滚动到指定图片
   */
  const scrollToImage = useCallback((index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * Dimensions.get('window').width,
        y: 0,
        animated: true,
      });
    }
  }, []);

  /**
   * 处理缩略图点击
   */
  const handleThumbnailPress = useCallback((index: number) => {
    console.log('点击缩略图:', index);
    setCurrentIndex(index);
    scrollToImage(index);
  }, [scrollToImage]);

  return (
    <View style={styles.viewerContainer}>
      {/* 顶部操作栏 */}
      <View style={styles.viewerHeader}>
        <TouchableOpacity style={styles.viewerCloseButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.viewerCounter}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View>

      {/* 图片查看器 */}
      <View style={styles.viewerScrollView}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentIndex(index);
          }}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.viewerImageContainer}>
              <Image
                source={image}
                style={styles.viewerImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 底部缩略图 */}
      <View style={styles.viewerThumbnails}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.viewerThumbnail,
                index === currentIndex && styles.viewerThumbnailActive
              ]}
              onPress={() => handleThumbnailPress(index)}
              activeOpacity={0.7}
            >
              <Image
                source={image}
                style={styles.viewerThumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 顶部关闭按钮 */}
      <TouchableOpacity 
        style={styles.viewerCloseButton}
        onPress={onClose}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* 可点击的背景 - 点击两侧关闭查看器 */}
      <TouchableOpacity 
        style={styles.viewerBackground} 
        onPress={onClose}
        activeOpacity={1}
      />
    </View>
  );
};

// 样式定义 - 教学要点：响应式设计，用户体验，视觉层次
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  errorText: {
    fontSize: 16,
    color: '#666',
  },

  // 顶部导航栏
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    textAlign: 'center',
  },
  
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  
  favoriteButtonAnimating: {
    transform: [{ scale: 1.2 }],
  },
  
  favoriteIconAnimating: {
    transform: [{ scale: 1.3 }],
  },

  // 主滚动视图
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 40,
  },

  // 图片轮播
  imageCarousel: {
    position: 'relative',
    height: 300,
    backgroundColor: '#000',
  },
  
  imageSlide: {
    width: Dimensions.get('window').width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  mainImage: {
    width: '100%',
    height: '100%',
  },
  
  imageTypeLabel: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  imageTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  
  indicatorDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },

  // 信息区域
  infoSection: {
    padding: 20,
  },
  
  titleSection: {
    marginBottom: 24,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 12,
    lineHeight: 32,
  },
  
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  author: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontWeight: '500',
  },
  
  category: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontWeight: '500',
  },

  // 描述区域
  descriptionSection: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },

  // 提示词区域
  promptSection: {
    marginBottom: 24,
  },
  
  promptContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  
  prompt: {
    fontSize: 15,
    color: '#856404',
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // 标签区域
  tagsSection: {
    marginBottom: 24,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  tag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  
  tagText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  // 时间区域
  timeSection: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 16,
  },
  
  timeText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  // 图片查看器
  viewerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  viewerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  
  viewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // 只保留 paddingTop，移除 padding 属性
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1001,
  },
  
  viewerCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 8,
    zIndex: 1002,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  
  viewerCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
  viewerScrollView: {
    flex: 1,
  },
  
  viewerImageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200, // 减去顶部和底部控制栏的高度
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  viewerImage: {
    width: '100%',
    height: '100%',
  },
  
  viewerThumbnails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30, // 增加底部内边距，避免被系统手势条遮挡
    zIndex: 1001,
  },
  
  viewerThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  
  viewerThumbnailActive: {
    borderColor: '#007AFF',
  },
  
  viewerThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  
  });

// 平台特定样式
if (Platform.OS === 'android') {
  styles.header = { ...styles.header, elevation: 4 };
  styles.actionButton = { ...styles.actionButton, elevation: 2 };
  styles.backButton = { ...styles.backButton, elevation: 2 };
}