# Nano Banana AI 图库

一个基于 Expo 构建的现代化 React Native 应用，展示 Nano Banana 的 AI 生成图像案例。此应用展示了尖端的移动开发模式，包括文件路由、国际化和平台特定适配。

## 🚀 功能特性

- **🖼️ AI 图像画廊**：浏览 47+ 个 AI 生成的图像转换案例
- **🔍 高级搜索**：实时搜索，支持分类和标签筛选
- **⭐ 收藏系统**：保存喜欢的案例，支持本地持久化存储
- **🌍 多语言支持**：中文、英文、日文和韩文
- **🎨 深色/浅色主题**：自适应主题系统，与操作系统原生集成
- **📱 跨平台**：为 iOS、Android 和 Web 优化
- **⚡ 性能优化**：使用 React Native Reanimated 实现流畅动画

## 🛠️ 技术栈

### 核心技术
- **React Native** (v0.79.5) - 跨平台移动应用框架
- **Expo** (v53.0.22) - 开发平台和 SDK
- **TypeScript** (v5.8.3) - 类型安全的 JavaScript
- **Expo Router** (v5.1.5) - 文件路由系统

### UI 和导航
- **React Navigation** (v7.1.6) - 导航库
- **React Native Screens** (v4.11.1) - 原生屏幕组件
- **React Native Safe Area Context** (v5.4.0) - 安全区域处理
- **Expo Vector Icons** (v14.1.0) - 图标库

### 状态和数据管理
- **React Context** - 全局状态管理
- **AsyncStorage** - 持久化本地存储
- **React Native Reanimated** (v3.17.4) - 流畅动画

### 国际化
- **i18next** (v25.5.2) - 国际化框架
- **react-i18next** (v15.7.3) - React 集成

## 📱 应用架构

### 文件路由结构
```
app/
├── _layout.tsx                    # 根布局，包含主题和提供者
├── (tabs)/
│   ├── _layout.tsx               # 标签导航布局
│   ├── index.tsx                 # 首页 - 案例列表
│   ├── search.tsx                # 搜索功能
│   ├── favorites.tsx             # 收藏页面
│   └── settings.tsx              # 应用设置
└── case/[id]/
    └── index.tsx                 # 动态案例详情页面
```

### 核心组件
- **CaseList** (`components/CaseList.tsx`) - 主案例列表，性能优化
- **UI 组件** (`components/ui/`) - 可复用的主题组件
- **颜色系统** (`constants/Colors.ts`) - 统一的明暗主题颜色定义

### 状态管理
- **收藏上下文** (`hooks/useFavorites.ts`) - 全局收藏状态，AsyncStorage 持久化
- **翻译钩子** (`hooks/useTranslation.ts`) - 国际化工具
- **主题集成** - React Navigation 主题与自定义颜色方案

## 🎨 设计系统

### 主题系统
应用功能完善的主题系统，支持明暗两种模式：

```typescript
// 为两种主题定义颜色
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    primary: '#0a7ea4',
    // ... 更多颜色
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    primary: '#fff',
    // ... 更多颜色
  },
};
```

### 组件库
- 所有组件样式一致
- iOS 和 Android 平台特定适配
- 现代设备的安全区域处理
- 响应式设计模式

## 🌐 国际化

应用支持四种语言的完整本地化：

- **中文 (zh)** - 简体中文
- **英文 (en)** - 默认语言
- **日文 (ja)** - 日文支持
- **韩文 (ko)** - 韩文支持

### 翻译结构
```typescript
// 本地化文本接口
interface LocalizedText {
  zh: string;
  en: string;
  ja: string;
  ko: string;
}
```

## 📊 数据结构

### 案例对象
```typescript
interface Case {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  prompt: LocalizedText;
  inputImages: ImageResource[];
  outputImages: ImageResource[];
  author: string;
  category: LocalizedText;
  tags: LocalizedText[];
  isFavorite: boolean;
  createdAt: string;
}
```

### 核心特性
- 47+ 个 AI 生成的图像转换案例
- 多语言元数据（标题、描述、提示词）
- 显示转换过程的图像输入/输出对
- 基于分类和标签的组织
- 作者归属和创建时间戳

## 🚀 快速开始

### 前置要求
- Node.js (v18 或更高版本)
- npm 或 yarn
- Expo CLI (`npm install -g @expo/cli`)

### 安装步骤
1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd lijianfei-app
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

### 在不同平台上运行

#### iOS 模拟器
```bash
npm run ios
```

#### Android 模拟器
```bash
npm run android
```

#### Web 浏览器
```bash
npm run web
```

#### 真机设备
1. 在设备上安装 Expo Go 应用
2. 从 Expo 开发服务器扫描二维码
3. 或运行 `npx expo start --tunnel` 进行远程访问

## 📱 开发工作流

### 可用脚本
- `npm start` - 启动 Expo 开发服务器
- `npm run android` - 在 Android 设备/模拟器上运行
- `npm run ios` - 在 iOS 设备/模拟器上运行
- `npm run web` - 在 Web 浏览器上运行
- `npm run lint` - 运行 ESLint 检查代码质量
- `npm run reset-project` - 重置为干净的项目状态

### 开发最佳实践
- 使用 TypeScript 确保类型安全
- 遵循 ESLint 配置保证代码质量
- 维护现有的组件结构和模式
- 使用已建立的主题系统保持 UI 一致性
- 实现适当的错误处理和加载状态

## 🔧 配置

### TypeScript 配置
- 启用严格模式以获得最大类型安全
- 路径别名：`@/*` 映射到项目根目录
- 类型定义集中在 `types/index.ts` 中

### ESLint 配置
- Expo 推荐的 ESLint 配置
- TypeScript 支持
- 现代JavaScript/React 标准

## 🎯 性能优化

### 图像加载
- 使用 Expo Image 进行优化的图像加载
- 加载状态的占位符图像
- 内存高效的图像缓存

### 列表性能
- 使用虚拟化的 FlatList
- 高效重渲染的键提取
- 下拉刷新功能
- 加载指示器和空状态

### 动画性能
- React Native Reanimated 实现 60fps 流畅动画
- 尽可能使用原生驱动动画
- 优化的手势处理

## 📱 平台特定功能

### iOS 适配
- 安全区域插入处理
- 状态栏样式适配
- 刘海屏的自定义头部高度补偿
- 原生 iOS 组件和模式

### Android 适配
- Material Design 原则
- 返回按钮处理
- 原生 Android 组件
- 硬件加速

## 🔒 安全考虑

- 无硬编码的秘密或 API 密钥
- 安全的 AsyncStorage 本地数据使用
- 输入验证和清理
- 安全的图像加载实践

## 🤝 贡献指南

1. 遵循既定的代码风格和模式
2. 为所有新功能使用 TypeScript
3. 为新功能添加适当的测试
4. 根据需要更新文档
5. 确保跨平台兼容性

## 📄 许可证

此项目基于 MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🙏 致谢

- **Nano Banana** - 感谢 AI 生成的图像案例和灵感
- **Expo 团队** - 感谢出色的开发平台
- **React Native 社区** - 感谢强大的框架和生态系统

## 📞 支持

如有问题、疑问或贡献，请在仓库中提出问题或联系开发团队。

---

使用 ❤️ 基于 React Native 和 Expo 构建