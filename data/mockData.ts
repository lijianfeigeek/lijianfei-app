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
 * 基于Awesome-Nano-Banana-images项目的完整文案创建测试数据
 * 包含所有47个案例的详细中文描述和提示词
 */
export const generateMockCases = (): Case[] => {
  const mockCases: Case[] = [];

  // 完整的47个案例数据，基于README.md的完整文案
  const caseData = [
    {
      title: "插画变手办",
      description: "将插画转换为角色手办，包含包装盒和建模过程展示",
      prompt: "将这张照片变成角色手办。在它后面放置一个印有角色图像的盒子，盒子上有一台电脑显示Blender建模过程。在盒子前面添加一个圆形塑料底座，角色手办站在上面。如果可能的话，将场景设置在室内",
      author: "ZHO_ZHO_ZHO",
      category: "3D建模",
      tags: ["手办", "Blender", "角色转换", "包装盒"]
    },
    {
      title: "根据地图箭头生成地面视角图片",
      description: "从Google地图的箭头指示生成对应的地面视角图片",
      prompt: "画出红色箭头看到的内容/\n从红色圆圈沿箭头方向画出真实世界的视角",
      author: "tokumin",
      category: "图像生成",
      tags: ["Google地图", "视角转换", "箭头指示", "地面视角"]
    },
    {
      title: "真实世界的AR信息化",
      description: "在真实世界图像中添加AR信息标注，突出显示兴趣点",
      prompt: "你是一个基于位置的AR体验生成器。在这张图像中突出显示[兴趣点]并标注相关信息",
      author: "bilawalsidhu",
      category: "AR增强现实",
      tags: ["AR", "兴趣点", "信息标注", "位置体验"]
    },
    {
      title: "分离出3D建筑/制作等距模型",
      description: "从图像中提取建筑并制作成等距视角的3D模型",
      prompt: "将图像制作成白天和等距视图[仅限建筑]",
      author: "Zieeett",
      category: "3D建模",
      tags: ["3D建筑", "等距视图", "建筑分离", "白天场景"]
    },
    {
      title: "不同时代自己的照片",
      description: "将人物照片转换为不同时代风格的形象",
      prompt: "将角色的风格改为[1970]年代的经典[男性]风格\n\n添加[长卷发]，\n[长胡子]，\n将背景改为标志性的[加州夏季风景]\n\n不要改变角色的面部",
      author: "AmirMushich",
      category: "风格转换",
      tags: ["时代风格", "人物装扮", "背景更换", "面部保持"]
    },
    {
      title: "多参考图像生成",
      description: "基于多个参考图像生成复合场景",
      prompt: "一个模特摆姿势靠在粉色宝马车上。她穿着以下物品，场景背景是浅灰色。绿色外星人是一个钥匙扣，挂在粉色手提包上。模特肩上还有一只粉色鹦鹉。旁边坐着一只戴着粉色项圈和金色耳机的哈巴狗",
      author: "MrDavids1",
      category: "图像生成",
      tags: ["多参考图", "场景合成", "详细描述", "对象组合"]
    },
    {
      title: "自动修图",
      description: "自动增强和修正平淡的照片",
      prompt: "这张照片很无聊很平淡。增强它！增加对比度，提升色彩，改善光线使其更丰富，你可以裁剪和删除影响构图的细节",
      author: "op7418",
      category: "图像增强",
      tags: ["照片增强", "对比度", "色彩优化", "构图改善"]
    },
    {
      title: "手绘图控制多角色姿态",
      description: "使用手绘图控制多个角色的姿态和动作",
      prompt: "让这两个角色使用图3的姿势进行战斗。添加适当的视觉背景和场景互动，生成图像比例为16:9",
      author: "op7418",
      category: "姿态控制",
      tags: ["手绘图", "角色姿态", "战斗场景", "16:9比例"]
    },
    {
      title: "跨视角图像生成",
      description: "将地面视角的照片转换为俯视角度",
      prompt: "将照片转换为俯视角度并标记摄影师的位置",
      author: "op7418",
      category: "视角转换",
      tags: ["视角转换", "俯视角度", "摄影师位置", "空间理解"]
    },
    {
      title: "定制人物贴纸",
      description: "将人物图像转换为白色轮廓风格的贴纸",
      prompt: "帮我将角色变成类似图2的白色轮廓贴纸。角色需要转换成网页插画风格，并添加一个描述图1的俏皮白色轮廓短语",
      author: "op7418",
      category: "贴纸设计",
      tags: ["白色轮廓", "贴纸设计", "网页插画", "俏皮短语"]
    },
    {
      title: "动漫转真人Coser",
      description: "将动漫插画转换为真人Cosplay照片",
      prompt: "生成一个女孩cosplay这张插画的照片，背景设置在Comiket",
      author: "ZHO_ZHO_ZHO",
      category: "风格转换",
      tags: ["动漫转真人", "Cosplay", "Comiket", "角色扮演"]
    },
    {
      title: "生成角色设定",
      description: "为角色生成完整的角色设定文档",
      prompt: "为我生成人物的角色设定（Character Design）\n\n比例设定（不同身高对比、头身比等）\n\n三视图（正面、侧面、背面）\n\n表情设定（Expression Sheet） → 就是你发的那种图\n\n动作设定（Pose Sheet） → 各种常见姿势\n\n服装设定（Costume Design）",
      author: "ZHO_ZHO_ZHO",
      category: "角色设计",
      tags: ["角色设定", "三视图", "表情设定", "动作设定", "服装设计"]
    },
    {
      title: "色卡线稿上色",
      description: "使用指定色卡为线稿图进行精确上色",
      prompt: "准确使用图2色卡为图1人物上色",
      author: "ZHO_ZHO_ZHO",
      category: "上色技术",
      tags: ["色卡上色", "线稿", "精确配色", "人物上色"]
    },
    {
      title: "文章信息图",
      description: "将文章内容转换为英文信息图，包含卡通元素",
      prompt: "为文章内容生成信息图\n要求：\n1. 将内容翻译成英文，并提炼文章的关键信息\n2. 图中内容保持精简，只保留大标题\n3. 图中文字采用英文\n4. 加上丰富可爱的卡通人物和元素",
      author: "黄建同学",
      category: "信息图表",
      tags: ["信息图", "文章转换", "英文翻译", "卡通元素"]
    },
    {
      title: "更换多种发型",
      description: "为人物生成九宫格格式的多种发型效果",
      prompt: "以九宫格的方式生成这个人不同发型的头像",
      author: "balconychy",
      category: "发型设计",
      tags: ["发型更换", "九宫格", "头像生成", "多发型"]
    },
    {
      title: "模型标注讲解图",
      description: "为3D模型生成标注讲解图，适用于学术展示",
      prompt: "绘制[3D人体器官模型展示示例心脏]用于学术展示，进行标注讲解，适用于展示其原理和[每个器官]的功能，非常逼真，高度还原，精细度非常细致的设计",
      author: "berryxia_ai",
      category: "教育图表",
      tags: ["3D模型", "学术展示", "标注讲解", "人体器官"]
    },
    {
      title: "定制大理石雕塑",
      description: "将参考图像转换为逼真的大理石雕塑效果",
      prompt: "一张超详细的图像中主体雕塑的写实图像，由闪亮的大理石制成。雕塑应展示光滑反光的大理石表面，强调其光泽和艺术工艺。设计优雅，突出大理石的美丽和深度。图像中的光线应增强雕塑的轮廓和纹理，创造出视觉上令人惊叹和迷人的效果",
      author: "umesh_ai",
      category: "雕塑艺术",
      tags: ["大理石雕塑", "写实效果", "光泽表面", "艺术工艺"]
    },
    {
      title: "根据食材做菜",
      description: "根据上传的食材图片生成精美的菜品展示",
      prompt: "用这些食材为我做一顿美味的午餐，放在盘子里，盘子的特写视图，移除其他盘子和食材",
      author: "Gdgtify",
      category: "美食生成",
      tags: ["食材处理", "菜品制作", "特写视图", "美味午餐"]
    },
    {
      title: "数学题推理",
      description: "在数学题目图片上标注答案和解题过程",
      prompt: "根据问题将问题的答案写在对应的位置上",
      author: "Gorden Sun",
      category: "教育辅助",
      tags: ["数学题", "答案标注", "解题过程", "教育辅助"]
    },
    {
      title: "旧照片上色",
      description: "修复并为老旧黑白照片上色",
      prompt: "修复并为这张照片上色",
      author: "GeminiApp",
      category: "照片修复",
      tags: ["旧照片", "上色修复", "照片修复", "历史影像"]
    },
    {
      title: "OOTD穿搭",
      description: "为人物穿上指定的服装，生成时尚的OOTD风格照片",
      prompt: "选择图1中的人，让他们穿上图2中的所有服装和配饰。在户外拍摄一系列写实的OOTD风格照片，使用自然光线，时尚的街头风格，清晰的全身镜头。保持图1中人物的身份和姿势，但以连贯时尚的方式展示图2中的完整服装和配饰",
      author: "302.AI",
      category: "时尚穿搭",
      tags: ["OOTD", "时尚穿搭", "服装搭配", "自然光线", "街头风格"]
    },
    {
      title: "人物换衣",
      description: "将人物的服装替换为目标服装，保持其他元素不变",
      prompt: "将输入图像中人物的服装替换为参考图像中显示的目标服装。保持人物的姿势、面部表情、背景和整体真实感不变。让新服装看起来自然、合身，并与光线和阴影保持一致。不要改变人物的身份或环境——只改变衣服",
      author: "skirano",
      category: "服装替换",
      tags: ["服装替换", "人物换衣", "姿势保持", "自然合身"]
    },
    {
      title: "多视图结果生成",
      description: "生成物体的前、后、左、右、上、下六个视图",
      prompt: "在白色背景上生成前、后、左、右、上、下视图。均匀分布。一致的主体。等距透视等效",
      author: "Error_HTTP_404",
      category: "3D建模",
      tags: ["多视图", "六视图", "等距透视", "白色背景", "产品展示"]
    },
    {
      title: "电影分镜",
      description: "基于两个角色创作12部分的黑色电影侦探故事",
      prompt: "用这两个角色创作一个令人上瘾的12部分故事，包含12张图像，讲述经典的黑色电影侦探故事。故事关于他们寻找线索并最终发现的失落的宝藏。整个故事充满刺激，有情感的高潮和低谷，以精彩的转折和高潮结尾。不要在图像中包含任何文字或文本，纯粹通过图像本身讲述故事",
      author: "GeminiApp",
      category: "故事创作",
      tags: ["电影分镜", "故事创作", "黑色电影", "侦探故事", "12部分"]
    },
    {
      title: "人物姿势修改",
      description: "修改人物姿势，让人物直视前方",
      prompt: "让图片中的人直视前方",
      author: "arrakis_ai",
      category: "姿势调整",
      tags: ["姿势修改", "直视前方", "人物调整", "方向控制"]
    },
    {
      title: "线稿图生成图像",
      description: "将线稿图人物按照参考图像姿势生成完整图像",
      prompt: "将图一人物换成图二姿势，专业摄影棚拍摄",
      author: "ZHO_ZHO_ZHO",
      category: "线稿上色",
      tags: ["线稿图", "姿势转换", "摄影棚", "专业拍摄"]
    },
    {
      title: "为图像添加水印",
      description: "在图像上反复覆盖指定的文字水印",
      prompt: "在整个图片上反复覆盖\"TRUMP\"这个词。",
      author: "AiMachete",
      category: "水印添加",
      tags: ["水印", "文字覆盖", "图像标注", "TRUMP"]
    },
    {
      title: "知识推理生成图像",
      description: "基于知识推理生成信息图表，如世界最高建筑或最甜蜜事物",
      prompt: "为我制作一张世界五座最高建筑的信息图 / 制作一张关于地球上最甜蜜事物的彩色信息图",
      author: "icreatelife",
      category: "知识图谱",
      tags: ["信息图", "知识推理", "世界最高建筑", "最甜蜜事物"]
    },
    {
      title: "红笔批注",
      description: "用红笔在图像上标注可以改进的地方",
      prompt: "分析这张图片。用红笔标出你可以改进的地方。",
      author: "AiMachete",
      category: "图像分析",
      tags: ["红笔批注", "图像分析", "改进标注", "分析建议"]
    },
    {
      title: "爆炸的食物",
      description: "为产品创建戏剧性的爆炸效果展示，强调新鲜度和营养价值",
      prompt: "在具有戏剧性的现代场景中拍摄该产品，并伴随着爆炸性的向外动态排列，主要成分新鲜和原始在产品周围飞舞，表明其新鲜度和营养价值。促销广告镜头，没有文字，强调产品，以关键品牌颜色作为背景。",
      author: "icreatelife",
      category: "产品广告",
      tags: ["爆炸效果", "产品广告", "新鲜度", "营养价值", "促销镜头"]
    },
    {
      title: "制作漫画书",
      description: "基于上传图像制作漫画书条幅，添加文字和引人入胜的故事",
      prompt: "基于上传的图像，制作漫画书条幅，添加文字，写一个引人入胜的故事。我想要一本奇幻漫画书。",
      author: "icreatelife",
      category: "漫画创作",
      tags: ["漫画书", "故事创作", "奇幻漫画", "条幅制作"]
    },
    {
      title: "动作人偶",
      description: "制作定制化的动作人偶，包含指定的物品和标签",
      prompt: "制作一个写着 [\"AI Evangelist - Kris\"] 的动作人偶，并包含 [咖啡、乌龟、笔记本电脑、手机和耳机] 。",
      author: "icreatelife",
      category: "人偶设计",
      tags: ["动作人偶", "定制设计", "物品包含", "标签定制"]
    },
    {
      title: "地图生成等距建筑",
      description: "将地图位置转换为游戏主题公园风格的等距建筑图像",
      prompt: "以这个位置为地标，将其设为等距图像（仅建筑物），采用游戏主题公园的风格",
      author: "demishassabis",
      category: "地图转换",
      tags: ["地图转换", "等距建筑", "主题公园", "游戏风格"]
    },
    {
      title: "参考图控制人物表情",
      description: "使用表情参考图控制人物的表情变化",
      prompt: "图一人物参考/换成图二人物的表情",
      author: "ZHO_ZHO_ZHO",
      category: "表情控制",
      tags: ["表情控制", "人物参考", "表情参考", "表情替换"]
    },
    {
      title: "插画绘画过程四格",
      description: "生成人物绘画过程的四宫格，展示线稿到成品的完整过程",
      prompt: "为人物生成绘画过程四宫格，第一步：线稿，第二步平铺颜色，第三步：增加阴影，第四步：细化成型。不要文字",
      author: "ZHO_ZHO_ZHO",
      category: "绘画过程",
      tags: ["绘画过程", "四宫格", "线稿到成品", "步骤展示"]
    },
    {
      title: "虚拟试妆",
      description: "为人物虚拟试妆，应用指定的妆容效果",
      prompt: "为图一人物化上图二的妆，还保持图一的姿势",
      author: "ZHO_ZHO_ZHO",
      category: "虚拟化妆",
      tags: ["虚拟试妆", "妆容应用", "姿势保持", "化妆效果"]
    },
    {
      title: "妆面分析",
      description: "分析妆容并用红笔标注可以改进的地方",
      prompt: "分析这张图片。用红笔标出可以改进的地方\nAnalyze this image. Use red pen to denote where you can improve",
      author: "ZHO_ZHO_ZHO",
      category: "妆容分析",
      tags: ["妆面分析", "红笔标注", "改进建议", "妆容评估"]
    },
    {
      title: "Google地图视角下的中土世界",
      description: "创建Google地图街景风格的中土世界场景",
      prompt: "行车记录仪谷歌街景拍摄 | [霍比屯街道] | [霍比特人进行园艺和抽烟斗等日常活动] | [晴天]",
      author: "TechHallo",
      category: "虚拟世界",
      tags: ["Google地图", "中土世界", "霍比屯", "街景风格", "霍比特人"]
    },
    {
      title: "印刷插画生成",
      description: "仅使用指定短语的字母创作极简主义黑白印刷插图",
      prompt: "仅使用短语 [\"riding a bike\"] 中的字母，创作一幅极简主义的黑白印刷插图，描绘骑自行车的场景。每个字母的形状和位置都应富有创意，以构成骑车人、自行车和动感。设计应简洁、极简，完全由修改后的 [\"riding a bike\"] 字母组成，不添加任何额外的形状或线条。字母应流畅或弯曲，以模仿场景的自然形态，同时保持清晰易读。",
      author: "Umesh",
      category: "创意设计",
      tags: ["印刷插画", "极简主义", "文字艺术", "黑白设计", "字母创意"]
    },
    {
      title: "超多人物姿势生成",
      description: "为人物插图创建包含各种姿势的姿势表",
      prompt: "请为这幅插图创建一个姿势表，摆出各种姿势",
      author: "tapehead_Lab",
      category: "姿势设计",
      tags: ["姿势表", "各种姿势", "人物参考", "动作设计"]
    },
    {
      title: "物品包装生成",
      description: "将物品图像贴在包装上，放置在极简设计布景中",
      prompt: "把图一贴在图二易拉罐上，并放在极简设计的布景中，专业摄影",
      author: "ZHO_ZHO_ZHO",
      category: "包装设计",
      tags: ["物品包装", "易拉罐", "极简设计", "专业摄影"]
    },
    {
      title: "叠加滤镜/材质",
      description: "为照片叠加指定的滤镜或材质效果",
      prompt: "为图一照片叠加上图二 [玻璃] 的效果",
      author: "ZHO_ZHO_ZHO",
      category: "滤镜效果",
      tags: ["滤镜叠加", "材质效果", "玻璃效果", "图像处理"]
    },
    {
      title: "控制人物脸型",
      description: "按照参考脸型将人物设计为Q版形象",
      prompt: "图一人物按照图二的脸型设计为q版形象",
      author: "ZHO_ZHO_ZHO",
      category: "脸型设计",
      tags: ["脸型控制", "Q版形象", "人物设计", "风格化"]
    },
    {
      title: "光影控制",
      description: "根据参考图控制人物的光影效果",
      prompt: "图一人物变成图二光影，深色为暗",
      author: "ZHO_ZHO_ZHO",
      category: "光影效果",
      tags: ["光影控制", "光线效果", "深色阴影", "图像渲染"]
    },
    {
      title: "乐高玩具小人",
      description: "将人物转换为乐高小人包装盒风格，包含包装和实际小人展示",
      prompt: "将照片中的人物转化为乐高小人包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示基于照片中人物的乐高小人，并配有他们必需的物品（如化妆品、包或其他物品）作为乐高配件。在盒子旁边，也展示实际乐高小人本身，未包装，以逼真且生动的方式渲染。",
      author: "ZHO_ZHO_ZHO",
      category: "玩具设计",
      tags: ["乐高小人", "包装盒", "等距透视", "玩具设计", "ZHOGUE"]
    },
    {
      title: "高达模型小人",
      description: "将人物转换为高达模型套件包装盒风格，包含机械化和未来派设计",
      prompt: "将照片中的人物转化为高达模型套件包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示照片中人物的高达风格机械人版本，并伴随其必需品（如化妆品、包袋或其他物品）重新设计为未来派机械配件。包装盒应类似真实的 Gunpla 盒子，包含技术插图、说明书风格细节和科幻字体。在盒子旁边，也展示实际的高达风格机械人本身，在包装外以逼真且栩栩如生的风格渲染，类似于官方 Bandai 宣传渲染图。",
      author: "ZHO_ZHO_ZHO",
      category: "机甲设计",
      tags: ["高达模型", "机械人", "Gunpla", "科幻字体", "技术插图", "ZHOGUE"]
    },
    {
      title: "硬件拆解图",
      description: "生成数码单反相机的分解图，展示所有配件和内部组件",
      prompt: "数码单反相机的分解图，展示了其所有配件和内部组件，例如镜头、滤镜、内部组件、镜头、传感器、螺丝、按钮、取景器、外壳和电路板。保留了数码单反相机的红色装饰。",
      author: "AIimagined",
      category: "技术图表",
      tags: ["硬件拆解", "单反相机", "分解图", "内部组件", "技术展示"]
    }
  ];

  // 生成完整的案例数据，使用提取的完整文案
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