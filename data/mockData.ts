// data/mockData.ts - 模拟数据生成
// 教学要点：数据结构设计，模拟真实数据，TypeScript类型使用，资源管理

import { Case } from '../types';
import { getCaseImageResources, placeholderImage } from './imageMap';

/**
 * 获取案例目录中实际存在的图片文件
 * @param caseNum 案例编号
 * @returns 包含输入和输出图片资源的对象
 */
const getCaseImages = (caseNum: number): { inputImages: any[]; outputImages: any[] } => {
  try {
    return getCaseImageResources(caseNum);
  } catch (error) {
    console.warn(`无法加载案例 ${caseNum} 的图片资源:`, error);
    
    // 返回占位符图片
    return {
      inputImages: [placeholderImage],
      outputImages: [placeholderImage]
    };
  }
};

/**
 * 生成模拟案例数据
 * 基于Awesome-Nano-Banana-images项目的结构创建测试数据
 */
export const generateMockCases = (): Case[] => {
  const mockCases: Case[] = [];

  // 模拟47个案例的数据结构
  const caseData = [
    {
      title: "插画变手办",
      description: "将插画转换为3D手办模型，展示AI在3D建模方面的能力",
      prompt: "将这张照片变成角色手办。在它后面放置一个印有角色图像的盒子，盒子上有一台电脑显示Blender建模过程。在盒子前面添加一个圆形塑料底座，角色手办站在上面。如果可能的话，将场景设置在室内",
      author: "ZHO_ZHO_ZHO",
      category: "3D建模",
      tags: ["手办", "插画", "3D", "建模"]
    },
    {
      title: "地图箭头生成地面视角",
      description: "根据Google Maps中的红色箭头生成对应的地面视角图片",
      prompt: "根据地图上的红色箭头位置，生成该地点的地面视角照片，要求视角真实，细节丰富",
      author: "tokumin",
      category: "图像生成",
      tags: ["地图", "视角转换", "地面视角", "AI生成"]
    },
    {
      title: "真实世界的AR信息化",
      description: "在现实世界场景中添加AR信息展示",
      prompt: "在真实的城市街道场景中添加AR信息展示，包括建筑信息、导航指示、数据可视化等元素",
      author: "bilawalsidhu",
      category: "AR增强现实",
      tags: ["AR", "信息展示", "现实世界", "数据可视化"]
    },
    {
      title: "分离出3D建筑/制作等距模型",
      description: "从照片中提取建筑并转换为等距视角的3D模型",
      prompt: "将照片中的建筑物分离出来，转换为等距视角的3D模型，保持建筑细节和纹理",
      author: "Zieeett",
      category: "3D建模",
      tags: ["建筑", "等距视角", "3D模型", "建筑提取"]
    },
    {
      title: "不同时代自己的照片",
      description: "将个人照片转换为不同历史时代的风格",
      prompt: "将这张照片中的人物转换为不同历史时代的装扮和背景，保持面部特征不变",
      author: "AmirMushich",
      category: "风格转换",
      tags: ["时代转换", "人物", "历史", "风格变化"]
    }
  ];

  // 生成完整的案例数据
  caseData.forEach((data, index) => {
    const caseNum = index + 1;
    const { inputImages, outputImages } = getCaseImages(caseNum);
    
    const caseItem: Case = {
      id: caseNum,
      title: data.title,
      description: data.description,
      prompt: data.prompt,
      inputImages,
      outputImages,
      author: data.author,
      category: data.category,
      tags: data.tags,
      isFavorite: false,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    mockCases.push(caseItem);
  });

  // 生成更多模拟数据以达到47个案例
  const additionalCategories = [
    "图像修复", "风格转换", "图像生成", "人物编辑", "场景创建",
    "艺术创作", "产品设计", "建筑设计", "游戏开发", "影视制作"
  ];

  const additionalAuthors = [
    "AI_artist", "Creative_AI", "Digital_Master", "Pixel_Wizard", "Neural_Net",
    "Code_Creator", "Tech_Artist", "Digital_Dreamer", "AI_Vision", "Pixel_Perfect"
  ];

  for (let i = caseData.length; i < 47; i++) {
    const caseNum = i + 1;
    const category = additionalCategories[Math.floor(Math.random() * additionalCategories.length)];
    const author = additionalAuthors[Math.floor(Math.random() * additionalAuthors.length)];
    const { inputImages, outputImages } = getCaseImages(caseNum);
    
    const caseItem: Case = {
      id: caseNum,
      title: `AI生成案例 ${caseNum}`,
      description: `这是一个展示AI在${category}方面能力的精彩案例`,
      prompt: `生成一个展示${category}能力的图片，要求细节丰富，创意独特`,
      inputImages,
      outputImages,
      author: author,
      category: category,
      tags: [category, "AI", "生成", "创意"],
      isFavorite: false,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    mockCases.push(caseItem);
  }

  return mockCases;
};

/**
 * 获取所有可用的分类
 */
export const getCategories = (cases: Case[]): string[] => {
  const categories = cases.map(caseItem => caseItem.category);
  return [...new Set(categories)]; // 去重
};

/**
 * 获取所有可用的标签
 */
export const getAllTags = (cases: Case[]): string[] => {
  const allTags = cases.flatMap(caseItem => caseItem.tags);
  return [...new Set(allTags)]; // 去重
};

/**
 * 获取分类统计
 */
export const getCategoryStats = (cases: Case[]): Record<string, number> => {
  const stats: Record<string, number> = {};
  cases.forEach(caseItem => {
    stats[caseItem.category] = (stats[caseItem.category] || 0) + 1;
  });
  return stats;
};

/**
 * 获取标签统计
 */
export const getTagStats = (cases: Case[]): Record<string, number> => {
  const stats: Record<string, number> = {};
  cases.forEach(caseItem => {
    caseItem.tags.forEach(tag => {
      stats[tag] = (stats[tag] || 0) + 1;
    });
  });
  return stats;
};