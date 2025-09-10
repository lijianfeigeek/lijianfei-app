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

  // 完整的47个案例数据，基于README.md的完整文案，支持中英双语
  const caseData = [
    {
      title: { zh: "插画变手办", en: "Illustration to Figurine" },
      description: { zh: "将插画转换为角色手办，包含包装盒和建模过程展示", en: "Convert illustration to character figurine with packaging box and modeling process display" },
      prompt: { zh: "将这张照片变成角色手办。在它后面放置一个印有角色图像的盒子，盒子上有一台电脑显示Blender建模过程。在盒子前面添加一个圆形塑料底座，角色手办站在上面。如果可能的话，将场景设置在室内", en: "Transform this photo into a character figurine. Place a box with the character's image behind it, showing a Blender modeling process on the computer screen. Add a round plastic base in front of the box where the character figurine stands. If possible, set the scene indoors." },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "3D建模", en: "3D Modeling" },
      tags: [
        { zh: "手办", en: "Figurine" },
        { zh: "Blender", en: "Blender" },
        { zh: "角色转换", en: "Character Conversion" },
        { zh: "包装盒", en: "Packaging" }
      ]
    },
    {
      title: { zh: "根据地图箭头生成地面视角图片", en: "Ground View from Map Arrows" },
      description: { zh: "从Google地图的箭头指示生成对应的地面视角图片", en: "Generate corresponding ground view images from Google Maps arrow indicators" },
      prompt: { zh: "画出红色箭头看到的内容/\n从红色圆圈沿箭头方向画出真实世界的视角", en: "Draw what the red arrow sees/\nFrom the red circle, draw the real-world perspective along the arrow direction" },
      author: "tokumin",
      category: { zh: "图像生成", en: "Image Generation" },
      tags: [
        { zh: "Google地图", en: "Google Maps" },
        { zh: "视角转换", en: "View Conversion" },
        { zh: "箭头指示", en: "Arrow Indicators" },
        { zh: "地面视角", en: "Ground View" }
      ]
    },
    {
      title: { zh: "真实世界的AR信息化", en: "Real-World AR Information" },
      description: { zh: "在真实世界图像中添加AR信息标注，突出显示兴趣点", en: "Add AR information annotations to real-world images, highlighting points of interest" },
      prompt: { zh: "你是一个基于位置的AR体验生成器。在这张图像中突出显示[兴趣点]并标注相关信息", en: "You are a location-based AR experience generator. Highlight [points of interest] in this image and annotate relevant information" },
      author: "bilawalsidhu",
      category: { zh: "AR增强现实", en: "AR Augmented Reality" },
      tags: [
        { zh: "AR", en: "AR" },
        { zh: "兴趣点", en: "Points of Interest" },
        { zh: "信息标注", en: "Information Annotation" },
        { zh: "位置体验", en: "Location Experience" }
      ]
    },
    {
      title: { zh: "分离出3D建筑/制作等距模型", en: "Extract 3D Building/Isometric Model" },
      description: { zh: "从图像中提取建筑并制作成等距视角的3D模型", en: "Extract buildings from images and create isometric 3D models" },
      prompt: { zh: "将图像制作成白天和等距视图[仅限建筑]", en: "Transform the image into daytime and isometric view [buildings only]" },
      author: "Zieeett",
      category: { zh: "3D建模", en: "3D Modeling" },
      tags: [
        { zh: "3D建筑", en: "3D Building" },
        { zh: "等距视图", en: "Isometric View" },
        { zh: "建筑分离", en: "Building Extraction" },
        { zh: "白天场景", en: "Daytime Scene" }
      ]
    },
    {
      title: { zh: "不同时代自己的照片", en: "Different Era Self Photos" },
      description: { zh: "将人物照片转换为不同时代风格的形象", en: "Transform person photos into different era style images" },
      prompt: { zh: "将角色的风格改为[1970]年代的经典[男性]风格\n\n添加[长卷发]，\n[长胡子]，\n将背景改为标志性的[加州夏季风景]\n\n不要改变角色的面部", en: "Change the character's style to classic [male] style of the [1970s]\n\nAdd [long curly hair],\n[long beard],\nChange background to iconic [California summer scenery]\n\nDon't change the character's face" },
      author: "AmirMushich",
      category: { zh: "风格转换", en: "Style Transfer" },
      tags: [
        { zh: "时代风格", en: "Era Style" },
        { zh: "人物装扮", en: "Character Costume" },
        { zh: "背景更换", en: "Background Change" },
        { zh: "面部保持", en: "Face Preservation" }
      ]
    },
    {
      title: { zh: "多参考图像生成", en: "Multi-Reference Image Generation" },
      description: { zh: "基于多个参考图像生成复合场景", en: "Generate composite scenes based on multiple reference images" },
      prompt: { zh: "一个模特摆姿势靠在粉色宝马车上。她穿着以下物品，场景背景是浅灰色。绿色外星人是一个钥匙扣，挂在粉色手提包上。模特肩上还有一只粉色鹦鹉。旁边坐着一只戴着粉色项圈和金色耳机的哈巴狗", en: "A model posing leaning against a pink BMW car. She is wearing the following items, scene background is light gray. A green alien is a keychain hanging on a pink handbag. The model also has a pink parrot on her shoulder. Next to her sits a pug wearing a pink collar and gold headphones" },
      author: "MrDavids1",
      category: { zh: "图像生成", en: "Image Generation" },
      tags: [
        { zh: "多参考图", en: "Multi-Reference" },
        { zh: "场景合成", en: "Scene Composition" },
        { zh: "详细描述", en: "Detailed Description" },
        { zh: "对象组合", en: "Object Composition" }
      ]
    },
    {
      title: { zh: "自动修图", en: "Auto Photo Enhancement" },
      description: { zh: "自动增强和修正平淡的照片", en: "Automatically enhance and correct plain photos" },
      prompt: { zh: "这张照片很无聊很平淡。增强它！增加对比度，提升色彩，改善光线使其更丰富，你可以裁剪和删除影响构图的细节", en: "This photo is boring and plain. Enhance it! Increase contrast, improve colors, enhance lighting to make it richer, you can crop and remove details that affect composition" },
      author: "op7418",
      category: { zh: "图像增强", en: "Image Enhancement" },
      tags: [
        { zh: "照片增强", en: "Photo Enhancement" },
        { zh: "对比度", en: "Contrast" },
        { zh: "色彩优化", en: "Color Optimization" },
        { zh: "构图改善", en: "Composition Improvement" }
      ]
    },
    {
      title: { zh: "手绘图控制多角色姿态", en: "Hand Drawing Controls Multiple Character Poses" },
      description: { zh: "使用手绘图控制多个角色的姿态和动作", en: "Use hand drawings to control poses and actions of multiple characters" },
      prompt: { zh: "让这两个角色使用图3的姿势进行战斗。添加适当的视觉背景和场景互动，生成图像比例为16:9", en: "Make these two characters fight using the poses from Figure 3. Add appropriate visual background and scene interaction, generate image ratio of 16:9" },
      author: "op7418",
      category: { zh: "姿态控制", en: "Pose Control" },
      tags: [
        { zh: "手绘图", en: "Hand Drawing" },
        { zh: "角色姿态", en: "Character Pose" },
        { zh: "战斗场景", en: "Battle Scene" },
        { zh: "16:9比例", en: "16:9 Ratio" }
      ]
    },
    {
      title: { zh: "跨视角图像生成", en: "Cross-View Image Generation" },
      description: { zh: "将地面视角的照片转换为俯视角度", en: "Convert ground view photos to top-down perspective" },
      prompt: { zh: "将照片转换为俯视角度并标记摄影师的位置", en: "Convert photo to top-down view and mark photographer's position" },
      author: "op7418",
      category: { zh: "视角转换", en: "View Conversion" },
      tags: [
        { zh: "视角转换", en: "View Conversion" },
        { zh: "俯视角度", en: "Top-Down View" },
        { zh: "摄影师位置", en: "Photographer Position" },
        { zh: "空间理解", en: "Spatial Understanding" }
      ]
    },
    {
      title: { zh: "定制人物贴纸", en: "Custom Character Sticker" },
      description: { zh: "将人物图像转换为白色轮廓风格的贴纸", en: "Convert character images to white outline style stickers" },
      prompt: { zh: "帮我将角色变成类似图2的白色轮廓贴纸。角色需要转换成网页插画风格，并添加一个描述图1的俏皮白色轮廓短语", en: "Help me transform the character into white outline stickers similar to Figure 2. The character needs to be converted to web illustration style, and add a playful white outline phrase describing Figure 1" },
      author: "op7418",
      category: { zh: "贴纸设计", en: "Sticker Design" },
      tags: [
        { zh: "白色轮廓", en: "White Outline" },
        { zh: "贴纸设计", en: "Sticker Design" },
        { zh: "网页插画", en: "Web Illustration" },
        { zh: "俏皮短语", en: "Playful Phrase" }
      ]
    },
    {
      title: { zh: "动漫转真人Coser", en: "Anime to Real Cosplayer" },
      description: { zh: "将动漫插画转换为真人Cosplay照片", en: "Convert anime illustrations to real cosplay photos" },
      prompt: { zh: "生成一个女孩cosplay这张插画的照片，背景设置在Comiket", en: "Generate a photo of a girl cosplaying this illustration, background set at Comiket" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "风格转换", en: "Style Transfer" },
      tags: [
        { zh: "动漫转真人", en: "Anime to Real" },
        { zh: "Cosplay", en: "Cosplay" },
        { zh: "Comiket", en: "Comiket" },
        { zh: "角色扮演", en: "Role Playing" }
      ]
    },
    {
      title: { zh: "生成角色设定", en: "Generate Character Design" },
      description: { zh: "为角色生成完整的角色设定文档", en: "Generate complete character design documentation for characters" },
      prompt: { zh: "为我生成人物的角色设定（Character Design）\n\n比例设定（不同身高对比、头身比等）\n\n三视图（正面、侧面、背面）\n\n表情设定（Expression Sheet） → 就是你发的那种图\n\n动作设定（Pose Sheet） → 各种常见姿势\n\n服装设定（Costume Design）", en: "Generate character design for me\n\nProportion settings (different height comparisons, head-to-body ratios, etc.)\n\nThree-view drawings (front, side, back)\n\nExpression sheet → the type of image you sent\n\nPose sheet → various common poses\n\nCostume design" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "角色设计", en: "Character Design" },
      tags: [
        { zh: "角色设定", en: "Character Design" },
        { zh: "三视图", en: "Three Views" },
        { zh: "表情设定", en: "Expression Sheet" },
        { zh: "动作设定", en: "Pose Sheet" },
        { zh: "服装设计", en: "Costume Design" }
      ]
    },
    {
      title: { zh: "色卡线稿上色", en: "Color Card Line Art Coloring" },
      description: { zh: "使用指定色卡为线稿图进行精确上色", en: "Use specified color cards to precisely color line art" },
      prompt: { zh: "准确使用图2色卡为图1人物上色", en: "Accurately use Figure 2 color card to color Figure 1 character" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "上色技术", en: "Coloring Technique" },
      tags: [
        { zh: "色卡上色", en: "Color Card Coloring" },
        { zh: "线稿", en: "Line Art" },
        { zh: "精确配色", en: "Precise Color Matching" },
        { zh: "人物上色", en: "Character Coloring" }
      ]
    },
    {
      title: { zh: "文章信息图", en: "Article Infographic" },
      description: { zh: "将文章内容转换为英文信息图，包含卡通元素", en: "Convert article content to English infographic with cartoon elements" },
      prompt: { zh: "为文章内容生成信息图\n要求：\n1. 将内容翻译成英文，并提炼文章的关键信息\n2. 图中内容保持精简，只保留大标题\n3. 图中文字采用英文\n4. 加上丰富可爱的卡通人物和元素", en: "Generate infographic for article content\nRequirements:\n1. Translate content to English and extract key information from the article\n2. Keep content in the image concise, only main headings\n3. Use English text in the image\n4. Add rich and cute cartoon characters and elements" },
      author: "黄建同学",
      category: { zh: "信息图表", en: "Infographic" },
      tags: [
        { zh: "信息图", en: "Infographic" },
        { zh: "文章转换", en: "Article Conversion" },
        { zh: "英文翻译", en: "English Translation" },
        { zh: "卡通元素", en: "Cartoon Elements" }
      ]
    },
    {
      title: { zh: "更换多种发型", en: "Multiple Hairstyle Changes" },
      description: { zh: "为人物生成九宫格格式的多种发型效果", en: "Generate nine-grid style multiple hairstyle effects for characters" },
      prompt: { zh: "以九宫格的方式生成这个人不同发型的头像", en: "Generate nine-grid style avatars of this person with different hairstyles" },
      author: "balconychy",
      category: { zh: "发型设计", en: "Hairstyle Design" },
      tags: [
        { zh: "发型更换", en: "Hairstyle Change" },
        { zh: "九宫格", en: "Nine Grid" },
        { zh: "头像生成", en: "Avatar Generation" },
        { zh: "多发型", en: "Multiple Hairstyles" }
      ]
    },
    {
      title: { zh: "模型标注讲解图", en: "Model Annotation Explanation Diagram" },
      description: { zh: "为3D模型生成标注讲解图，适用于学术展示", en: "Generate annotated explanation diagrams for 3D models, suitable for academic presentations" },
      prompt: { zh: "绘制[3D人体器官模型展示示例心脏]用于学术展示，进行标注讲解，适用于展示其原理和[每个器官]的功能，非常逼真，高度还原，精细度非常细致的设计", en: "Draw [3D human organ model display example heart] for academic presentation, with annotations and explanations, suitable for demonstrating its principles and [each organ's] functions, very realistic, highly restored, extremely detailed design" },
      author: "berryxia_ai",
      category: { zh: "教育图表", en: "Educational Chart" },
      tags: [
        { zh: "3D模型", en: "3D Model" },
        { zh: "学术展示", en: "Academic Presentation" },
        { zh: "标注讲解", en: "Annotation Explanation" },
        { zh: "人体器官", en: "Human Organs" }
      ]
    },
    {
      title: { zh: "定制大理石雕塑", en: "Custom Marble Sculpture" },
      description: { zh: "将参考图像转换为逼真的大理石雕塑效果", en: "Convert reference images to realistic marble sculpture effects" },
      prompt: { zh: "一张超详细的图像中主体雕塑的写实图像，由闪亮的大理石制成。雕塑应展示光滑反光的大理石表面，强调其光泽和艺术工艺。设计优雅，突出大理石的美丽和深度。图像中的光线应增强雕塑的轮廓和纹理，创造出视觉上令人惊叹和迷人的效果", en: "A highly detailed image of a realistic main sculpture made of shiny marble. The sculpture should show smooth reflective marble surfaces, emphasizing its luster and artistic craftsmanship. Elegant design, highlighting the beauty and depth of marble. Light in the image should enhance the sculpture's contours and texture, creating visually stunning and captivating effects" },
      author: "umesh_ai",
      category: { zh: "雕塑艺术", en: "Sculpture Art" },
      tags: [
        { zh: "大理石雕塑", en: "Marble Sculpture" },
        { zh: "写实效果", en: "Realistic Effect" },
        { zh: "光泽表面", en: "Glossy Surface" },
        { zh: "艺术工艺", en: "Artistic Craftsmanship" }
      ]
    },
    {
      title: { zh: "根据食材做菜", en: "Cook from Ingredients" },
      description: { zh: "根据上传的食材图片生成精美的菜品展示", en: "Generate exquisite dish presentations based on uploaded ingredient images" },
      prompt: { zh: "用这些食材为我做一顿美味的午餐，放在盘子里，盘子的特写视图，移除其他盘子和食材", en: "Use these ingredients to make me a delicious lunch, serve it on a plate, close-up view of the plate, remove other plates and ingredients" },
      author: "Gdgtify",
      category: { zh: "美食生成", en: "Food Generation" },
      tags: [
        { zh: "食材处理", en: "Ingredient Processing" },
        { zh: "菜品制作", en: "Dish Preparation" },
        { zh: "特写视图", en: "Close-up View" },
        { zh: "美味午餐", en: "Delicious Lunch" }
      ]
    },
    {
      title: { zh: "数学题推理", en: "Math Problem Reasoning" },
      description: { zh: "在数学题目图片上标注答案和解题过程", en: "Annotate answers and solution processes on math problem images" },
      prompt: { zh: "根据问题将问题的答案写在对应的位置上", en: "Write the answer to the problem in the corresponding position based on the question" },
      author: "Gorden Sun",
      category: { zh: "教育辅助", en: "Educational Aid" },
      tags: [
        { zh: "数学题", en: "Math Problem" },
        { zh: "答案标注", en: "Answer Annotation" },
        { zh: "解题过程", en: "Solution Process" },
        { zh: "教育辅助", en: "Educational Aid" }
      ]
    },
    {
      title: { zh: "旧照片上色", en: "Old Photo Colorization" },
      description: { zh: "修复并为老旧黑白照片上色", en: "Restore and colorize old black and white photos" },
      prompt: { zh: "修复并为这张照片上色", en: "Restore and colorize this photo" },
      author: "GeminiApp",
      category: { zh: "照片修复", en: "Photo Restoration" },
      tags: [
        { zh: "旧照片", en: "Old Photo" },
        { zh: "上色修复", en: "Colorization Restoration" },
        { zh: "照片修复", en: "Photo Restoration" },
        { zh: "历史影像", en: "Historical Images" }
      ]
    },
    {
      title: { zh: "OOTD穿搭", en: "OOTD Fashion" },
      description: { zh: "为人物穿上指定的服装，生成时尚的OOTD风格照片", en: "Dress characters in specified outfits, generating fashionable OOTD style photos" },
      prompt: { zh: "选择图1中的人，让他们穿上图2中的所有服装和配饰。在户外拍摄一系列写实的OOTD风格照片，使用自然光线，时尚的街头风格，清晰的全身镜头。保持图1中人物的身份和姿势，但以连贯时尚的方式展示图2中的完整服装和配饰", en: "Select the person from Figure 1, have them wear all the clothing and accessories from Figure 2. Shoot a series of realistic OOTD style photos outdoors, using natural light, fashionable street style, clear full-body shots. Maintain the identity and pose of the person from Figure 1, but showcase the complete clothing and accessories from Figure 2 in a coherent fashionable way" },
      author: "302.AI",
      category: { zh: "时尚穿搭", en: "Fashion Style" },
      tags: [
        { zh: "OOTD", en: "OOTD" },
        { zh: "时尚穿搭", en: "Fashion Style" },
        { zh: "服装搭配", en: "Outfit Coordination" },
        { zh: "自然光线", en: "Natural Light" },
        { zh: "街头风格", en: "Street Style" }
      ]
    },
    {
      title: { zh: "人物换衣", en: "Character Clothing Change" },
      description: { zh: "将人物的服装替换为目标服装，保持其他元素不变", en: "Replace character's clothing with target outfit while keeping other elements unchanged" },
      prompt: { zh: "将输入图像中人物的服装替换为参考图像中显示的目标服装。保持人物的姿势、面部表情、背景和整体真实感不变。让新服装看起来自然、合身，并与光线和阴影保持一致。不要改变人物的身份或环境——只改变衣服", en: "Replace the clothing of the person in the input image with the target outfit shown in the reference image. Keep the person's pose, facial expression, background, and overall realism unchanged. Make the new clothing look natural and well-fitted, consistent with lighting and shadows. Don't change the person's identity or environment—only change the clothes" },
      author: "skirano",
      category: { zh: "服装替换", en: "Clothing Replacement" },
      tags: [
        { zh: "服装替换", en: "Clothing Replacement" },
        { zh: "人物换衣", en: "Character Clothing Change" },
        { zh: "姿势保持", en: "Pose Preservation" },
        { zh: "自然合身", en: "Natural Fit" }
      ]
    },
    {
      title: { zh: "多视图结果生成", en: "Multi-View Result Generation" },
      description: { zh: "生成物体的前、后、左、右、上、下六个视图", en: "Generate six views of an object: front, back, left, right, top, bottom" },
      prompt: { zh: "在白色背景上生成前、后、左、右、上、下视图。均匀分布。一致的主体。等距透视等效", en: "Generate front, back, left, right, top, bottom views on white background. Evenly distributed. Consistent subject. Isometric perspective equivalent" },
      author: "Error_HTTP_404",
      category: { zh: "3D建模", en: "3D Modeling" },
      tags: [
        { zh: "多视图", en: "Multi-View" },
        { zh: "六视图", en: "Six Views" },
        { zh: "等距透视", en: "Isometric Perspective" },
        { zh: "白色背景", en: "White Background" },
        { zh: "产品展示", en: "Product Display" }
      ]
    },
    {
      title: { zh: "电影分镜", en: "Movie Storyboard" },
      description: { zh: "基于两个角色创作12部分的黑色电影侦探故事", en: "Create a 12-part film noir detective story based on two characters" },
      prompt: { zh: "用这两个角色创作一个令人上瘾的12部分故事，包含12张图像，讲述经典的黑色电影侦探故事。故事关于他们寻找线索并最终发现的失落的宝藏。整个故事充满刺激，有情感的高潮和低谷，以精彩的转折和高潮结尾。不要在图像中包含任何文字或文本，纯粹通过图像本身讲述故事", en: "Create an addictive 12-part story with these two characters, containing 12 images, telling a classic film noir detective story. The story is about them searching for clues and eventually discovering lost treasure. The entire story is full of excitement, with emotional highs and lows, ending with a brilliant twist and climax. Don't include any text in the images, tell the story purely through the images themselves" },
      author: "GeminiApp",
      category: { zh: "故事创作", en: "Story Creation" },
      tags: [
        { zh: "电影分镜", en: "Movie Storyboard" },
        { zh: "故事创作", en: "Story Creation" },
        { zh: "黑色电影", en: "Film Noir" },
        { zh: "侦探故事", en: "Detective Story" },
        { zh: "12部分", en: "12 Parts" }
      ]
    },
    {
      title: { zh: "人物姿势修改", en: "Character Pose Modification" },
      description: { zh: "修改人物姿势，让人物直视前方", en: "Modify character pose to make character look straight ahead" },
      prompt: { zh: "让图片中的人直视前方", en: "Make the person in the picture look straight ahead" },
      author: "arrakis_ai",
      category: { zh: "姿势调整", en: "Pose Adjustment" },
      tags: [
        { zh: "姿势修改", en: "Pose Modification" },
        { zh: "直视前方", en: "Look Straight Ahead" },
        { zh: "人物调整", en: "Character Adjustment" },
        { zh: "方向控制", en: "Direction Control" }
      ]
    },
    {
      title: { zh: "线稿图生成图像", en: "Line Art to Image Generation" },
      description: { zh: "将线稿图人物按照参考图像姿势生成完整图像", en: "Generate complete images from line art characters following reference image poses" },
      prompt: { zh: "将图一人物换成图二姿势，专业摄影棚拍摄", en: "Change Figure 1 character to Figure 2 pose, professional photo studio shooting" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "线稿上色", en: "Line Art Coloring" },
      tags: [
        { zh: "线稿图", en: "Line Art" },
        { zh: "姿势转换", en: "Pose Conversion" },
        { zh: "摄影棚", en: "Photo Studio" },
        { zh: "专业拍摄", en: "Professional Shooting" }
      ]
    },
    {
      title: { zh: "为图像添加水印", en: "Add Watermark to Image" },
      description: { zh: "在图像上反复覆盖指定的文字水印", en: "Repeatedly cover specified text watermark on image" },
      prompt: { zh: "在整个图片上反复覆盖\"TRUMP\"这个词。", en: "Repeatedly cover the word \"TRUMP\" all over the image." },
      author: "AiMachete",
      category: { zh: "水印添加", en: "Watermark Addition" },
      tags: [
        { zh: "水印", en: "Watermark" },
        { zh: "文字覆盖", en: "Text Overlay" },
        { zh: "图像标注", en: "Image Annotation" },
        { zh: "TRUMP", en: "TRUMP" }
      ]
    },
    {
      title: { zh: "知识推理生成图像", en: "Knowledge Reasoning Image Generation" },
      description: { zh: "基于知识推理生成信息图表，如世界最高建筑或最甜蜜事物", en: "Generate infographics based on knowledge reasoning, such as world's tallest buildings or sweetest things" },
      prompt: { zh: "为我制作一张世界五座最高建筑的信息图 / 制作一张关于地球上最甜蜜事物的彩色信息图", en: "Make me an infographic of the world's five tallest buildings / Make a colorful infographic about the sweetest things on earth" },
      author: "icreatelife",
      category: { zh: "知识图谱", en: "Knowledge Graph" },
      tags: [
        { zh: "信息图", en: "Infographic" },
        { zh: "知识推理", en: "Knowledge Reasoning" },
        { zh: "世界最高建筑", en: "World's Tallest Buildings" },
        { zh: "最甜蜜事物", en: "Sweetest Things" }
      ]
    },
    {
      title: { zh: "红笔批注", en: "Red Pen Annotation" },
      description: { zh: "用红笔在图像上标注可以改进的地方", en: "Use red pen to annotate areas for improvement on images" },
      prompt: { zh: "分析这张图片。用红笔标出你可以改进的地方。", en: "Analyze this image. Use red pen to mark where you can improve." },
      author: "AiMachete",
      category: { zh: "图像分析", en: "Image Analysis" },
      tags: [
        { zh: "红笔批注", en: "Red Pen Annotation" },
        { zh: "图像分析", en: "Image Analysis" },
        { zh: "改进标注", en: "Improvement Annotation" },
        { zh: "分析建议", en: "Analysis Suggestions" }
      ]
    },
    {
      title: { zh: "爆炸的食物", en: "Explosive Food" },
      description: { zh: "为产品创建戏剧性的爆炸效果展示，强调新鲜度和营养价值", en: "Create dramatic explosive effect displays for products, emphasizing freshness and nutritional value" },
      prompt: { zh: "在具有戏剧性的现代场景中拍摄该产品，并伴随着爆炸性的向外动态排列，主要成分新鲜和原始在产品周围飞舞，表明其新鲜度和营养价值。促销广告镜头，没有文字，强调产品，以关键品牌颜色作为背景。", en: "Shoot the product in a dramatic modern scene, accompanied by explosive outward dynamic arrangement, main ingredients fresh and raw flying around the product, indicating its freshness and nutritional value. Promotional advertising shot, no text, emphasizing the product, with key brand colors as background." },
      author: "icreatelife",
      category: { zh: "产品广告", en: "Product Advertising" },
      tags: [
        { zh: "爆炸效果", en: "Explosive Effect" },
        { zh: "产品广告", en: "Product Advertising" },
        { zh: "新鲜度", en: "Freshness" },
        { zh: "营养价值", en: "Nutritional Value" },
        { zh: "促销镜头", en: "Promotional Shot" }
      ]
    },
    {
      title: { zh: "制作漫画书", en: "Create Comic Book" },
      description: { zh: "基于上传图像制作漫画书条幅，添加文字和引人入胜的故事", en: "Create comic book strips based on uploaded images, add text and engaging stories" },
      prompt: { zh: "基于上传的图像，制作漫画书条幅，添加文字，写一个引人入胜的故事。我想要一本奇幻漫画书。", en: "Based on uploaded images, create comic book strips, add text, write an engaging story. I want a fantasy comic book." },
      author: "icreatelife",
      category: { zh: "漫画创作", en: "Comic Creation" },
      tags: [
        { zh: "漫画书", en: "Comic Book" },
        { zh: "故事创作", en: "Story Creation" },
        { zh: "奇幻漫画", en: "Fantasy Comic" },
        { zh: "条幅制作", en: "Strip Creation" }
      ]
    },
    {
      title: { zh: "动作人偶", en: "Action Figure" },
      description: { zh: "制作定制化的动作人偶，包含指定的物品和标签", en: "Create customized action figures including specified items and labels" },
      prompt: { zh: "制作一个写着 [\"AI Evangelist - Kris\"] 的动作人偶，并包含 [咖啡、乌龟、笔记本电脑、手机和耳机] 。", en: "Create an action figure with [\"AI Evangelist - Kris\"] label, including [coffee, turtle, laptop, phone and headphones]." },
      author: "icreatelife",
      category: { zh: "人偶设计", en: "Figure Design" },
      tags: [
        { zh: "动作人偶", en: "Action Figure" },
        { zh: "定制设计", en: "Custom Design" },
        { zh: "物品包含", en: "Item Inclusion" },
        { zh: "标签定制", en: "Label Customization" }
      ]
    },
    {
      title: { zh: "地图生成等距建筑", en: "Map to Isometric Building" },
      description: { zh: "将地图位置转换为游戏主题公园风格的等距建筑图像", en: "Convert map locations to game theme park style isometric building images" },
      prompt: { zh: "以这个位置为地标，将其设为等距图像（仅建筑物），采用游戏主题公园的风格", en: "Use this location as landmark, convert it to isometric image (buildings only), in game theme park style" },
      author: "demishassabis",
      category: { zh: "地图转换", en: "Map Conversion" },
      tags: [
        { zh: "地图转换", en: "Map Conversion" },
        { zh: "等距建筑", en: "Isometric Building" },
        { zh: "主题公园", en: "Theme Park" },
        { zh: "游戏风格", en: "Game Style" }
      ]
    },
    {
      title: { zh: "参考图控制人物表情", en: "Reference Image Controls Character Expression" },
      description: { zh: "使用表情参考图控制人物的表情变化", en: "Use expression reference images to control character expression changes" },
      prompt: { zh: "图一人物参考/换成图二人物的表情", en: "Figure 1 character reference/change to Figure 2 character's expression" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "表情控制", en: "Expression Control" },
      tags: [
        { zh: "表情控制", en: "Expression Control" },
        { zh: "人物参考", en: "Character Reference" },
        { zh: "表情参考", en: "Expression Reference" },
        { zh: "表情替换", en: "Expression Replacement" }
      ]
    },
    {
      title: { zh: "插画绘画过程四格", en: "Illustration Drawing Process Four Panels" },
      description: { zh: "生成人物绘画过程的四宫格，展示线稿到成品的完整过程", en: "Generate four-panel drawing process for characters, showing complete process from line art to finished work" },
      prompt: { zh: "为人物生成绘画过程四宫格，第一步：线稿，第二步平铺颜色，第三步：增加阴影，第四步：细化成型。不要文字", en: "Generate four-panel drawing process for character, step 1: line art, step 2: flat colors, step 3: add shadows, step 4: refine and finalize. No text" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "绘画过程", en: "Drawing Process" },
      tags: [
        { zh: "绘画过程", en: "Drawing Process" },
        { zh: "四宫格", en: "Four Panels" },
        { zh: "线稿到成品", en: "Line Art to Finished" },
        { zh: "步骤展示", en: "Step Display" }
      ]
    },
    {
      title: { zh: "虚拟试妆", en: "Virtual Makeup Try-On" },
      description: { zh: "为人物虚拟试妆，应用指定的妆容效果", en: "Virtual makeup try-on for characters, applying specified makeup effects" },
      prompt: { zh: "为图一人物化上图二的妆，还保持图一的姿势", en: "Apply Figure 2 makeup to Figure 1 character, keeping Figure 1's pose" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "虚拟化妆", en: "Virtual Makeup" },
      tags: [
        { zh: "虚拟试妆", en: "Virtual Makeup" },
        { zh: "妆容应用", en: "Makeup Application" },
        { zh: "姿势保持", en: "Pose Preservation" },
        { zh: "化妆效果", en: "Makeup Effect" }
      ]
    },
    {
      title: { zh: "妆面分析", en: "Makeup Analysis" },
      description: { zh: "分析妆容并用红笔标注可以改进的地方", en: "Analyze makeup and use red pen to annotate areas for improvement" },
      prompt: { zh: "分析这张图片。用红笔标出可以改进的地方\nAnalyze this image. Use red pen to denote where you can improve", en: "Analyze this image. Use red pen to mark where you can improve\nAnalyze this image. Use red pen to denote where you can improve" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "妆容分析", en: "Makeup Analysis" },
      tags: [
        { zh: "妆面分析", en: "Makeup Analysis" },
        { zh: "红笔标注", en: "Red Pen Annotation" },
        { zh: "改进建议", en: "Improvement Suggestions" },
        { zh: "妆容评估", en: "Makeup Evaluation" }
      ]
    },
    {
      title: { zh: "Google地图视角下的中土世界", en: "Middle Earth from Google Maps View" },
      description: { zh: "创建Google地图街景风格的中土世界场景", en: "Create Google Maps Street View style Middle Earth scenes" },
      prompt: { zh: "行车记录仪谷歌街景拍摄 | [霍比屯街道] | [霍比特人进行园艺和抽烟斗等日常活动] | [晴天]", en: "Dashcam Google Street View shooting | [Hobbiton streets] | [Hobbits doing daily activities like gardening and smoking pipes] | [Sunny day]" },
      author: "TechHallo",
      category: { zh: "虚拟世界", en: "Virtual World" },
      tags: [
        { zh: "Google地图", en: "Google Maps" },
        { zh: "中土世界", en: "Middle Earth" },
        { zh: "霍比屯", en: "Hobbiton" },
        { zh: "街景风格", en: "Street View Style" },
        { zh: "霍比特人", en: "Hobbits" }
      ]
    },
    {
      title: { zh: "印刷插画生成", en: "Print Illustration Generation" },
      description: { zh: "仅使用指定短语的字母创作极简主义黑白印刷插图", en: "Create minimalist black and white print illustrations using only letters from specified phrases" },
      prompt: { zh: "仅使用短语 [\"riding a bike\"] 中的字母，创作一幅极简主义的黑白印刷插图，描绘骑自行车的场景。每个字母的形状和位置都应富有创意，以构成骑车人、自行车和动感。设计应简洁、极简，完全由修改后的 [\"riding a bike\"] 字母组成，不添加任何额外的形状或线条。字母应流畅或弯曲，以模仿场景的自然形态，同时保持清晰易读。", en: "Using only letters from the phrase [\"riding a bike\"], create a minimalist black and white print illustration depicting a cycling scene. Each letter's shape and position should be creative to form the cyclist, bicycle, and sense of motion. Design should be clean and minimalist, composed entirely of modified [\"riding a bike\"] letters without adding any extra shapes or lines. Letters should flow or curve to mimic the natural forms of the scene while remaining clear and readable." },
      author: "Umesh",
      category: { zh: "创意设计", en: "Creative Design" },
      tags: [
        { zh: "印刷插画", en: "Print Illustration" },
        { zh: "极简主义", en: "Minimalism" },
        { zh: "文字艺术", en: "Text Art" },
        { zh: "黑白设计", en: "Black and White Design" },
        { zh: "字母创意", en: "Letter Creativity" }
      ]
    },
    {
      title: { zh: "超多人物姿势生成", en: "Multiple Character Pose Generation" },
      description: { zh: "为人物插图创建包含各种姿势的姿势表", en: "Create pose sheets for character illustrations containing various poses" },
      prompt: { zh: "请为这幅插图创建一个姿势表，摆出各种姿势", en: "Please create a pose sheet for this illustration, showing various poses" },
      author: "tapehead_Lab",
      category: { zh: "姿势设计", en: "Pose Design" },
      tags: [
        { zh: "姿势表", en: "Pose Sheet" },
        { zh: "各种姿势", en: "Various Poses" },
        { zh: "人物参考", en: "Character Reference" },
        { zh: "动作设计", en: "Action Design" }
      ]
    },
    {
      title: { zh: "物品包装生成", en: "Item Packaging Generation" },
      description: { zh: "将物品图像贴在包装上，放置在极简设计布景中", en: "Place item images on packaging, arranged in minimalist design setting" },
      prompt: { zh: "把图一贴在图二易拉罐上，并放在极简设计的布景中，专业摄影", en: "Put Figure 1 on Figure 2 can, place in minimalist design setting, professional photography" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "包装设计", en: "Packaging Design" },
      tags: [
        { zh: "物品包装", en: "Item Packaging" },
        { zh: "易拉罐", en: "Can" },
        { zh: "极简设计", en: "Minimalist Design" },
        { zh: "专业摄影", en: "Professional Photography" }
      ]
    },
    {
      title: { zh: "叠加滤镜/材质", en: "Overlay Filter/Material" },
      description: { zh: "为照片叠加指定的滤镜或材质效果", en: "Overlay specified filter or material effects on photos" },
      prompt: { zh: "为图一照片叠加上图二 [玻璃] 的效果", en: "Overlay Figure 2 [glass] effect on Figure 1 photo" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "滤镜效果", en: "Filter Effects" },
      tags: [
        { zh: "滤镜叠加", en: "Filter Overlay" },
        { zh: "材质效果", en: "Material Effect" },
        { zh: "玻璃效果", en: "Glass Effect" },
        { zh: "图像处理", en: "Image Processing" }
      ]
    },
    {
      title: { zh: "控制人物脸型", en: "Control Character Face Shape" },
      description: { zh: "按照参考脸型将人物设计为Q版形象", en: "Design character as Q-version based on reference face shape" },
      prompt: { zh: "图一人物按照图二的脸型设计为q版形象", en: "Design Figure 1 character as Q-version based on Figure 2 face shape" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "脸型设计", en: "Face Design" },
      tags: [
        { zh: "脸型控制", en: "Face Shape Control" },
        { zh: "Q版形象", en: "Q-Version" },
        { zh: "人物设计", en: "Character Design" },
        { zh: "风格化", en: "Stylization" }
      ]
    },
    {
      title: { zh: "光影控制", en: "Light and Shadow Control" },
      description: { zh: "根据参考图控制人物的光影效果", en: "Control character's light and shadow effects based on reference image" },
      prompt: { zh: "图一人物变成图二光影，深色为暗", en: "Figure 1 character changes to Figure 2 lighting, dark areas are shadows" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "光影效果", en: "Lighting Effects" },
      tags: [
        { zh: "光影控制", en: "Lighting Control" },
        { zh: "光线效果", en: "Lighting Effect" },
        { zh: "深色阴影", en: "Dark Shadows" },
        { zh: "图像渲染", en: "Image Rendering" }
      ]
    },
    {
      title: { zh: "乐高玩具小人", en: "Lego Minifigure" },
      description: { zh: "将人物转换为乐高小人包装盒风格，包含包装和实际小人展示", en: "Transform characters into Lego minifigure box style, including packaging and actual minifigure display" },
      prompt: { zh: "将照片中的人物转化为乐高小人包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示基于照片中人物的乐高小人，并配有他们必需的物品（如化妆品、包或其他物品）作为乐高配件。在盒子旁边，也展示实际乐高小人本身，未包装，以逼真且生动的方式渲染。", en: "Transform the character in the photo into Lego minifigure box style, presented in isometric perspective. Label the box with title \"ZHOGUE\". Inside the box, display Lego minifigure based on the photo character, with their essential items (like cosmetics, bags or other items) as Lego accessories. Next to the box, also display the actual Lego minifigure itself, unpackaged, rendered in realistic and vivid way." },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "玩具设计", en: "Toy Design" },
      tags: [
        { zh: "乐高小人", en: "Lego Minifigure" },
        { zh: "包装盒", en: "Packaging Box" },
        { zh: "等距透视", en: "Isometric Perspective" },
        { zh: "玩具设计", en: "Toy Design" },
        { zh: "ZHOGUE", en: "ZHOGUE" }
      ]
    },
    {
      title: { zh: "高达模型小人", en: "Gundam Model Figure" },
      description: { zh: "将人物转换为高达模型套件包装盒风格，包含机械化和未来派设计", en: "Transform characters into Gundam model kit box style, including mechanized and futuristic design" },
      prompt: { zh: "将照片中的人物转化为高达模型套件包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示照片中人物的高达风格机械人版本，并伴随其必需品（如化妆品、包袋或其他物品）重新设计为未来派机械配件。包装盒应类似真实的 Gunpla 盒子，包含技术插图、说明书风格细节和科幻字体。在盒子旁边，也展示实际的高达风格机械人本身，在包装外以逼真且栩栩如生的风格渲染，类似于官方 Bandai 宣传渲染图。", en: "Transform the character in the photo into Gundam model kit box style, presented in isometric perspective. Label the box with title \"ZHOGUE\". Inside the box, display Gundam-style mechanical version of the photo character, with their essential items (like cosmetics, bags or other items) redesigned as futuristic mechanical accessories. The box should resemble real Gunpla boxes, containing technical illustrations, instruction manual style details and sci-fi fonts. Next to the box, also display the actual Gundam-style mechanical figure itself, outside the packaging, rendered in realistic and lifelike style, similar to official Bandai promotional renders." },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "机甲设计", en: "Mecha Design" },
      tags: [
        { zh: "高达模型", en: "Gundam Model" },
        { zh: "机械人", en: "Mechanical Figure" },
        { zh: "Gunpla", en: "Gunpla" },
        { zh: "科幻字体", en: "Sci-Fi Font" },
        { zh: "技术插图", en: "Technical Illustration" },
        { zh: "ZHOGUE", en: "ZHOGUE" }
      ]
    },
    {
      title: { zh: "硬件拆解图", en: "Hardware Teardown Diagram" },
      description: { zh: "生成数码单反相机的分解图，展示所有配件和内部组件", en: "Generate exploded view diagram of digital SLR camera, showing all accessories and internal components" },
      prompt: { zh: "数码单反相机的分解图，展示了其所有配件和内部组件，例如镜头、滤镜、内部组件、镜头、传感器、螺丝、按钮、取景器、外壳和电路板。保留了数码单反相机的红色装饰。", en: "Exploded view diagram of digital SLR camera, showing all its accessories and internal components, such as lenses, filters, internal components, lenses, sensors, screws, buttons, viewfinder, housing and circuit boards. Retains the red decoration of digital SLR camera." },
      author: "AIimagined",
      category: { zh: "技术图表", en: "Technical Diagram" },
      tags: [
        { zh: "硬件拆解", en: "Hardware Teardown" },
        { zh: "单反相机", en: "SLR Camera" },
        { zh: "分解图", en: "Exploded View" },
        { zh: "内部组件", en: "Internal Components" },
        { zh: "技术展示", en: "Technical Display" }
      ]
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
  const categories = cases.map(caseItem => caseItem.category.zh); // 默认使用中文分类名
  return [...new Set(categories)]; // 去重
};

/**
 * 获取所有可用的标签
 */
export const getAllTags = (cases: Case[]): string[] => {
  const allTags = cases.flatMap(caseItem => caseItem.tags.map(tag => tag.zh)); // 默认使用中文标签
  return [...new Set(allTags)]; // 去重
};

/**
 * 获取分类统计
 */
export const getCategoryStats = (cases: Case[]): Record<string, number> => {
  const stats: Record<string, number> = {};
  cases.forEach(caseItem => {
    const categoryName = caseItem.category.zh; // 默认使用中文分类名
    stats[categoryName] = (stats[categoryName] || 0) + 1;
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
      const tagName = tag.zh; // 默认使用中文标签名
      stats[tagName] = (stats[tagName] || 0) + 1;
    });
  });
  return stats;
};