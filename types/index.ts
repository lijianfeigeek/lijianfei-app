// types/index.ts - 数据类型定义
// 教学要点：TypeScript接口定义，React Native常用数据类型，类型安全

/**
 * 图片资源类型
 * React Native 中使用 require() 返回的图片资源类型
 */
export type ImageResource = number | any;

/**
 * 案例数据接口
 * 定义了Nano Banana AI生成案例的完整数据结构
 */
export interface Case {
  id: number;                    // 案例唯一标识符 - 用于列表渲染和路由参数
  title: string;                 // 案例标题 - 在列表和详情页显示
  description: string;           // 案例描述 - 详细说明案例内容
  prompt: string;                // AI生成提示词 - 展示如何生成该图片
  inputImages: ImageResource[];  // 输入图片资源数组 - 原始参考图片
  outputImages: ImageResource[]; // 输出图片资源数组 - AI生成结果图片
  author: string;                // 案例作者 - 来源Twitter或其他平台
  category: string;              // 案例分类 - 用于筛选功能
  tags: string[];               // 标签数组 - 用于搜索和分类
  isFavorite: boolean;          // 是否收藏 - 用户交互功能
  createdAt: string;           // 创建时间 - 用于排序和显示
}

/**
 * 搜索筛选参数接口
 * 用于搜索和筛选功能的状态管理
 */
export interface SearchFilters {
  query: string;                // 搜索关键词
  category: string;             // 选中的分类
  tags: string[];               // 选中的标签
  showFavoritesOnly: boolean;   // 是否只显示收藏
}

/**
 * 应用状态接口
 * 定义全局应用状态的结构
 */
export interface AppState {
  cases: Case[];                // 所有案例数据
  filteredCases: Case[];        // 筛选后的案例数据
  filters: SearchFilters;       // 当前筛选条件
  loading: boolean;             // 加载状态
  error: string | null;         // 错误信息
}

/**
 * 分类统计接口
 * 用于显示各分类的案例数量
 */
export interface CategoryStats {
  [category: string]: number;    // 分类名对应的数量
}

/**
 * 标签统计接口
 * 用于显示热门标签
 */
export interface TagStats {
  [tag: string]: number;        // 标签名对应的数量
}