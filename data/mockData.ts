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
      title: { zh: "插画变手办", en: "Illustration to Figurine", ja: "イラストからフィギュアへ", ko: "일러스트에서 피규어로" },
      description: { zh: "将插画转换为角色手办，包含包装盒和建模过程展示", en: "Convert illustration to character figurine with packaging box and modeling process display", ja: "イラストをキャラクターフィギュアに変換し、パッケージボックスとモデリングプロセスの表示を含む", ko: "일러스트를 캐릭터 피규어로 변환하고, 포장상자와 모델링 과정 표시를 포함" },
      prompt: { zh: "将这张照片变成角色手办。在它后面放置一个印有角色图像的盒子，盒子上有一台电脑显示Blender建模过程。在盒子前面添加一个圆形塑料底座，角色手办站在上面。如果可能的话，将场景设置在室内", en: "Transform this photo into a character figurine. Place a box with the character's image behind it, showing a Blender modeling process on the computer screen. Add a round plastic base in front of the box where the character figurine stands. If possible, set the scene indoors.", ja: "この写真をキャラクターフィギュアに変換してください。後ろにキャラクター画像が印刷されたボックスを置き、コンピュータ画面にBlenderモデリングプロセスを表示します。ボックスの前に丸いプラスチックベースを追加し、キャラクターフィギュアがその上に立つようにします。可能であれば、シーンを室内に設定してください", ko: "이 사진을 캐릭터 피규어로 변환해주세요. 뒤에 캐릭터 이미지가 인쇄된 상자를 놓고, 컴퓨터 화면에 블렌더 모델링 과정을 표시합니다. 상자 앞에 원형 플라스틱 베이스를 추가하고 캐릭터 피규어가 그 위에 서도록 합니다. 가능하다면 실내 장면으로 설정하세요" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "3D建模", en: "3D Modeling", ja: "3Dモデリング", ko: "3D 모델링" },
      tags: [
        { zh: "手办", en: "Figurine", ja: "フィギュア", ko: "피규어" },
        { zh: "Blender", en: "Blender", ja: "Blender", ko: "블렌더" },
        { zh: "角色转换", en: "Character Conversion", ja: "キャラクター変換", ko: "캐릭터 변환" },
        { zh: "包装盒", en: "Packaging", ja: "パッケージ", ko: "포장" }
      ]
    },
    {
      title: { zh: "根据地图箭头生成地面视角图片", en: "Ground View from Map Arrows", ja: "マップ矢印から地上視点画像生成", ko: "지도 화살표로 지상 시점 이미지 생성" },
      description: { zh: "从Google地图的箭头指示生成对应的地面视角图片", en: "Generate corresponding ground view images from Google Maps arrow indicators", ja: "Googleマップの矢印指示から対応する地上視点の画像を生成", ko: "Google 지도의 화살표 지시에 따라 해당 지상 시점 이미지 생성" },
      prompt: { zh: "画出红色箭头看到的内容/\n从红色圆圈沿箭头方向画出真实世界的视角", en: "Draw what the red arrow sees/\nFrom the red circle, draw the real-world perspective along the arrow direction", ja: "赤い矢印が見ているものを描く/\n赤い円から矢印方向に沿って現実世界の視点を描く", ko: "빨간색 화살표가 보는 것을 그려라/\n빨간색 원에서 화살표 방향으로 현실 세계의 시점을 그려라" },
      author: "tokumin",
      category: { zh: "图像生成", en: "Image Generation", ja: "画像生成", ko: "이미지 생성" },
      tags: [
        { zh: "Google地图", en: "Google Maps", ja: "Googleマップ", ko: "Google 지도" },
        { zh: "视角转换", en: "View Conversion", ja: "視点変換", ko: "시점 변환" },
        { zh: "箭头指示", en: "Arrow Indicators", ja: "矢印指示", ko: "화살표 지시" },
        { zh: "地面视角", en: "Ground View", ja: "地上視点", ko: "지상 시점" }
      ]
    },
    {
      title: { zh: "真实世界的AR信息化", en: "Real-World AR Information", ja: "現実世界のAR情報化", ko: "현실 세계의 AR 정보화" },
      description: { zh: "在真实世界图像中添加AR信息标注，突出显示兴趣点", en: "Add AR information annotations to real-world images, highlighting points of interest", ja: "現実世界の画像にAR情報アノテーションを追加し、関心のあるポイントを強調表示", ko: "현실 세계 이미지에 AR 정보 주석을 추가하고 관심 지점을 강조 표시" },
      prompt: { zh: "你是一个基于位置的AR体验生成器。在这张图像中突出显示[兴趣点]并标注相关信息", en: "You are a location-based AR experience generator. Highlight [points of interest] in this image and annotate relevant information", ja: "あなたは位置ベースのAR体験ジェネレーターです。この画像で[関心のあるポイント]を強調表示し、関連情報を注釈してください", ko: "당신은 위치 기반 AR 경험 생성기입니다. 이 이미지에서 [관심 지점]을 강조 표시하고 관련 정보를 주석으로 달아주세요" },
      author: "bilawalsidhu",
      category: { zh: "AR增强现实", en: "AR Augmented Reality", ja: "AR拡張現実", ko: "AR 증강현실" },
      tags: [
        { zh: "AR", en: "AR", ja: "AR", ko: "AR" },
        { zh: "兴趣点", en: "Points of Interest", ja: "関心のあるポイント", ko: "관심 지점" },
        { zh: "信息标注", en: "Information Annotation", ja: "情報アノテーション", ko: "정보 주석" },
        { zh: "位置体验", en: "Location Experience", ja: "位置体験", ko: "위치 경험" }
      ]
    },
    {
      title: { zh: "分离出3D建筑/制作等距模型", en: "Extract 3D Building/Isometric Model", ja: "3D建物抽出/等距モデル制作", ko: "3D 건물 분리/등축 모델 제작" },
      description: { zh: "从图像中提取建筑并制作成等距视角的3D模型", en: "Extract buildings from images and create isometric 3D models", ja: "画像から建物を抽出し、等距視点の3Dモデルを作成", ko: "이미지에서 건물을 추출하고 등축 시점의 3D 모델 제작" },
      prompt: { zh: "将图像制作成白天和等距视图[仅限建筑]", en: "Transform the image into daytime and isometric view [buildings only]", ja: "画像を昼間と等距ビューに変換[建物のみ]", ko: "이미지를 주간과 등축 뷰로 변환[건물만]" },
      author: "Zieeett",
      category: { zh: "3D建模", en: "3D Modeling", ja: "3Dモデリング", ko: "3D 모델링" },
      tags: [
        { zh: "3D建筑", en: "3D Building", ja: "3D建物", ko: "3D 건물" },
        { zh: "等距视图", en: "Isometric View", ja: "等距ビュー", ko: "등축 뷰" },
        { zh: "建筑分离", en: "Building Extraction", ja: "建物抽出", ko: "건물 분리" },
        { zh: "白天场景", en: "Daytime Scene", ja: "昼間シーン", ko: "주간 장면" }
      ]
    },
    {
      title: { zh: "不同时代自己的照片", en: "Different Era Self Photos", ja: "異なる時代の自分の写真", ko: "다른 시대의 자신의 사진" },
      description: { zh: "将人物照片转换为不同时代风格的形象", en: "Transform person photos into different era style images", ja: "人物写真を異なる時代スタイルのイメージに変換", ko: "인물 사진을 다른 시대 스타일의 이미지로 변환" },
      prompt: { zh: "将角色的风格改为[1970]年代的经典[男性]风格\n\n添加[长卷发]，\n[长胡子]，\n将背景改为标志性的[加州夏季风景]\n\n不要改变角色的面部", en: "Change the character's style to classic [male] style of the [1970s]\n\nAdd [long curly hair],\n[long beard],\nChange background to iconic [California summer scenery]\n\nDon't change the character's face", ja: "キャラクターのスタイルを[1970年代]のクラシックな[男性]スタイルに変更\n\n[長いカールヘア]を追加、\n[長いひげ]、\n背景を象徴的な[カリフォルニアの夏の風景]に変更\n\nキャラクターの顔は変更しないでください", ko: "캐릭터의 스타일을 [1970년대]의 클래식한 [남성] 스타일로 변경\n\n[긴 곱슬머리] 추가,\n[긴 수염],\n배경을 상징적인 [캘리포니아 여름 풍경]으로 변경\n\n캐릭터의 얼굴은 변경하지 마세요" },
      author: "AmirMushich",
      category: { zh: "风格转换", en: "Style Transfer", ja: "スタイル変換", ko: "스타일 변환" },
      tags: [
        { zh: "时代风格", en: "Era Style", ja: "時代スタイル", ko: "시대 스타일" },
        { zh: "人物装扮", en: "Character Costume", ja: "キャラクターコスチューム", ko: "캐릭터 의상" },
        { zh: "背景更换", en: "Background Change", ja: "背景変更", ko: "배경 변경" },
        { zh: "面部保持", en: "Face Preservation", ja: "顔保持", ko: "얼굴 보존" }
      ]
    },
    {
      title: { zh: "多参考图像生成", en: "Multi-Reference Image Generation", ja: "複数参照画像生成", ko: "다중 참조 이미지 생성" },
      description: { zh: "基于多个参考图像生成复合场景", en: "Generate composite scenes based on multiple reference images", ja: "複数の参照画像に基づいて複合シーンを生成", ko: "여러 참조 이미지를 기반으로 복합 장면 생성" },
      prompt: { zh: "一个模特摆姿势靠在粉色宝马车上。她穿着以下物品，场景背景是浅灰色。绿色外星人是一个钥匙扣，挂在粉色手提包上。模特肩上还有一只粉色鹦鹉。旁边坐着一只戴着粉色项圈和金色耳机的哈巴狗", en: "A model posing leaning against a pink BMW car. She is wearing the following items, scene background is light gray. A green alien is a keychain hanging on a pink handbag. The model also has a pink parrot on her shoulder. Next to her sits a pug wearing a pink collar and gold headphones", ja: "モデルがピンク色のBMW車にもたれてポーズをとっています。彼女は以下のアイテムを着用しており、シーンの背景はライトグレーです。緑色の宇宙人はキーホルダーで、ピンク色のハンドバッグに掛かっています。モデルの肩にはピンク色のオウムもいます。隣にはピンク色の首輪と金色のヘッドホンを着けたパグが座っています", ko: "모델이 분홍색 BMW 차에 기대어 포즈를 취하고 있습니다. 그녀는 다음 품목을 착용하고 있으며, 장면 배경은 밝은 회색입니다. 녹색 외계인은 열쇠고리로 분홍색 핸드백에 걸려 있습니다. 모델의 어깨에는 분홍색 앵무새도 있습니다. 옆에는 분홍색 목걸이와 금색 이어폰을 착용한 퍼그가 앉아 있습니다" },
      author: "MrDavids1",
      category: { zh: "图像生成", en: "Image Generation", ja: "画像生成", ko: "이미지 생성" },
      tags: [
        { zh: "多参考图", en: "Multi-Reference", ja: "複数参照", ko: "다중 참조" },
        { zh: "场景合成", en: "Scene Composition", ja: "シーン構成", ko: "장면 구성" },
        { zh: "详细描述", en: "Detailed Description", ja: "詳細な説明", ko: "상세한 설명" },
        { zh: "对象组合", en: "Object Composition", ja: "オブジェクト構成", ko: "객체 구성" }
      ]
    },
    {
      title: { zh: "自动修图", en: "Auto Photo Enhancement", ja: "自動写真補正", ko: "자동 사진 보정" },
      description: { zh: "自动增强和修正平淡的照片", en: "Automatically enhance and correct plain photos", ja: "平坦な写真を自動的に強化と補正", ko: "평범한 사진을 자동으로 향상하고 보정" },
      prompt: { zh: "这张照片很无聊很平淡。增强它！增加对比度，提升色彩，改善光线使其更丰富，你可以裁剪和删除影响构图的细节", en: "This photo is boring and plain. Enhance it! Increase contrast, improve colors, enhance lighting to make it richer, you can crop and remove details that affect composition", ja: "この写真は退屈で平坦です。強化してください！コントラストを増やし、色を改善し、照明を豊かにして、構成に影響する詳細をトリミングして削除できます", ko: "이 사진은 지루하고 평범합니다. 향상시켜주세요! 대비를 높이고, 색상을 개선하고, 조명을 더 풍부하게 만들고, 구성에 영향을 미치는 세부 사항을 자르고 제거할 수 있습니다" },
      author: "op7418",
      category: { zh: "图像增强", en: "Image Enhancement", ja: "画像強化", ko: "이미지 향상" },
      tags: [
        { zh: "照片增强", en: "Photo Enhancement", ja: "写真強化", ko: "사진 향상" },
        { zh: "对比度", en: "Contrast", ja: "コントラスト", ko: "대비" },
        { zh: "色彩优化", en: "Color Optimization", ja: "色彩最適化", ko: "색상 최적화" },
        { zh: "构图改善", en: "Composition Improvement", ja: "構成改善", ko: "구성 개선" }
      ]
    },
    {
      title: { zh: "手绘图控制多角色姿态", en: "Hand Drawing Controls Multiple Character Poses", ja: "手描き図による複数キャラクターのポーズ制御", ko: "손그림으로 다중 캐릭터 포즈 제어" },
      description: { zh: "使用手绘图控制多个角色的姿态和动作", en: "Use hand drawings to control poses and actions of multiple characters", ja: "手描き図を使用して複数のキャラクターのポーズとアクションを制御", ko: "손그림을 사용하여 여러 캐릭터의 포즈와 동작 제어" },
      prompt: { zh: "让这两个角色使用图3的姿势进行战斗。添加适当的视觉背景和场景互动，生成图像比例为16:9", en: "Make these two characters fight using the poses from Figure 3. Add appropriate visual background and scene interaction, generate image ratio of 16:9", ja: "この2人のキャラクターが図3のポーズを使用して戦うようにしてください。適切な視覚的背景とシーンの相互作用を追加し、画像比率を16:9で生成してください", ko: "이 두 캐릭터가 그림 3의 포즈를 사용하여 싸우도록 하세요. 적절한 시각적 배경과 장면 상호작용을 추가하고, 이미지 비율을 16:9로 생성하세요" },
      author: "op7418",
      category: { zh: "姿态控制", en: "Pose Control", ja: "ポーズ制御", ko: "포즈 제어" },
      tags: [
        { zh: "手绘图", en: "Hand Drawing", ja: "手描き図", ko: "손그림" },
        { zh: "角色姿态", en: "Character Pose", ja: "キャラクターポーズ", ko: "캐릭터 포즈" },
        { zh: "战斗场景", en: "Battle Scene", ja: "戦闘シーン", ko: "전투 장면" },
        { zh: "16:9比例", en: "16:9 Ratio", ja: "16:9比率", ko: "16:9 비율" }
      ]
    },
    {
      title: { zh: "跨视角图像生成", en: "Cross-View Image Generation", ja: "クロスビュー画像生成", ko: "크로스 뷰 이미지 생성" },
      description: { zh: "将地面视角的照片转换为俯视角度", en: "Convert ground view photos to top-down perspective", ja: "地上視点の写真を俯瞰視点に変換", ko: "지상 시점의 사진을 위에서 바라보는 시점으로 변환" },
      prompt: { zh: "将照片转换为俯视角度并标记摄影师的位置", en: "Convert photo to top-down view and mark photographer's position", ja: "写真を俯瞰ビューに変換し、写真家の位置をマークしてください", ko: "사진을 위에서 바라보는 뷰로 변환하고 사진작가의 위치를 표시하세요" },
      author: "op7418",
      category: { zh: "视角转换", en: "View Conversion", ja: "視点変換", ko: "시점 변환" },
      tags: [
        { zh: "视角转换", en: "View Conversion", ja: "視点変換", ko: "시점 변환" },
        { zh: "俯视角度", en: "Top-Down View", ja: "俯瞰ビュー", ko: "위에서 바라보는 뷰" },
        { zh: "摄影师位置", en: "Photographer Position", ja: "写真家の位置", ko: "사진작가 위치" },
        { zh: "空间理解", en: "Spatial Understanding", ja: "空間理解", ko: "공간 이해" }
      ]
    },
    {
      title: { zh: "定制人物贴纸", en: "Custom Character Sticker", ja: "カスタムキャラクターステッカー", ko: "맞춤 캐릭터 스티커" },
      description: { zh: "将人物图像转换为白色轮廓风格的贴纸", en: "Convert character images to white outline style stickers", ja: "キャラクター画像を白い輪郭スタイルのステッカーに変換", ko: "캐릭터 이미지를 흰색 윤곽 스타일의 스티커로 변환" },
      prompt: { zh: "帮我将角色变成类似图2的白色轮廓贴纸。角色需要转换成网页插画风格，并添加一个描述图1的俏皮白色轮廓短语", en: "Help me transform the character into white outline stickers similar to Figure 2. The character needs to be converted to web illustration style, and add a playful white outline phrase describing Figure 1", ja: "キャラクターを図2のような白い輪郭のステッカーに変換してください。キャラクターはウェブイラストスタイルに変換し、図1を説明する遊び心のある白い輪郭のフレーズを追加してください", ko: "캐릭터를 그림 2와 같은 흰색 윤곽 스티커로 변환해주세요. 캐릭터는 웹 일러스트 스타일로 변환하고, 그림 1을 설명하는 장난스러운 흰색 윤곽 구문을 추가해주세요" },
      author: "op7418",
      category: { zh: "贴纸设计", en: "Sticker Design", ja: "ステッカーデザイン", ko: "스티커 디자인" },
      tags: [
        { zh: "白色轮廓", en: "White Outline", ja: "白い輪郭", ko: "흰색 윤곽" },
        { zh: "贴纸设计", en: "Sticker Design", ja: "ステッカーデザイン", ko: "스티커 디자인" },
        { zh: "网页插画", en: "Web Illustration", ja: "ウェブイラスト", ko: "웹 일러스트" },
        { zh: "俏皮短语", en: "Playful Phrase", ja: "遊び心のあるフレーズ", ko: "장난스러운 구문" }
      ]
    },
    {
      title: { zh: "动漫转真人Coser", en: "Anime to Real Cosplayer", ja: "アニメからリアルコスプレイヤーへ", ko: "애니메이션에서 실제 코스플레이어로" },
      description: { zh: "将动漫插画转换为真人Cosplay照片", en: "Convert anime illustrations to real cosplay photos", ja: "アニメイラストをリアルなコスプレ写真に変換", ko: "애니메이션 일러스트를 실제 코스프레 사진으로 변환" },
      prompt: { zh: "生成一个女孩cosplay这张插画的照片，背景设置在Comiket", en: "Generate a photo of a girl cosplaying this illustration, background set at Comiket", ja: "このイラストをコスプレする女の子の写真を生成し、背景をコミックマーケットに設定", ko: "이 일러스트를 코스프하는 소녀의 사진을 생성하고 배경을 코믹마켓으로 설정" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "风格转换", en: "Style Transfer", ja: "スタイル変換", ko: "스타일 변환" },
      tags: [
        { zh: "动漫转真人", en: "Anime to Real", ja: "アニメからリアルへ", ko: "애니메이션에서 실제로" },
        { zh: "Cosplay", en: "Cosplay", ja: "コスプレ", ko: "코스프레" },
        { zh: "Comiket", en: "Comiket", ja: "コミックマーケット", ko: "코믹마켓" },
        { zh: "角色扮演", en: "Role Playing", ja: "ロールプレイング", ko: "롤플레잉" }
      ]
    },
    {
      title: { zh: "生成角色设定", en: "Generate Character Design", ja: "キャラクターデザイン生成", ko: "캐릭터 디자인 생성" },
      description: { zh: "为角色生成完整的角色设定文档", en: "Generate complete character design documentation for characters", ja: "キャラクターの完全なキャラクターデザインドキュメントを生成", ko: "캐릭터의 완전한 캐릭터 디자인 문서 생성" },
      prompt: { zh: "为我生成人物的角色设定（Character Design）\n\n比例设定（不同身高对比、头身比等）\n\n三视图（正面、侧面、背面）\n\n表情设定（Expression Sheet） → 就是你发的那种图\n\n动作设定（Pose Sheet） → 各种常见姿势\n\n服装设定（Costume Design）", en: "Generate character design for me\n\nProportion settings (different height comparisons, head-to-body ratios, etc.)\n\nThree-view drawings (front, side, back)\n\nExpression sheet → the type of image you sent\n\nPose sheet → various common poses\n\nCostume design", ja: "私のためにキャラクターデザインを生成してください\n\n比例設定（異なる身長比較、頭身比など）\n\n三面図（正面、側面、背面）\n\n表情シート → あなたが送った那种の画像\n\nポーズシート → さまざまな一般的なポーズ\n\n衣装デザイン", ko: "저를 위해 캐릭터 디자인을 생성해주세요\n\n비례 설정 (다른 신장 비교, 머리 대 몸 비율 등)\n\n삼면도 (정면, 측면, 후면)\n\n표정 시트 → 당신이 보낸 그 종류의 이미지\n\n포즈 시트 → 다양한 일반적인 포즈\n\n의상 디자인" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "角色设计", en: "Character Design", ja: "キャラクターデザイン", ko: "캐릭터 디자인" },
      tags: [
        { zh: "角色设定", en: "Character Design", ja: "キャラクター設定", ko: "캐릭터 설정" },
        { zh: "三视图", en: "Three Views", ja: "三面図", ko: "삼면도" },
        { zh: "表情设定", en: "Expression Sheet", ja: "表情設定", ko: "표정 설정" },
        { zh: "动作设定", en: "Pose Sheet", ja: "ポーズ設定", ko: "포즈 설정" },
        { zh: "服装设计", en: "Costume Design", ja: "衣装デザイン", ko: "의상 디자인" }
      ]
    },
    {
      title: { zh: "色卡线稿上色", en: "Color Card Line Art Coloring", ja: "カラーカード線画着色", ko: "컬러 카드 선화 색칠" },
      description: { zh: "使用指定色卡为线稿图进行精确上色", en: "Use specified color cards to precisely color line art", ja: "指定されたカラーカードを使用して線画を正確に着色", ko: "지정된 컬러 카드를 사용하여 선화를 정확하게 색칠" },
      prompt: { zh: "准确使用图2色卡为图1人物上色", en: "Accurately use Figure 2 color card to color Figure 1 character", ja: "図2のカラーカードを正確に使用して図1のキャラクターを着色", ko: "그림 2의 컬러 카드를 정확하게 사용하여 그림 1의 캐릭터를 색칠" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "上色技术", en: "Coloring Technique", ja: "着色技術", ko: "색칠 기술" },
      tags: [
        { zh: "色卡上色", en: "Color Card Coloring", ja: "カラーカード着色", ko: "컬러 카드 색칠" },
        { zh: "线稿", en: "Line Art", ja: "線画", ko: "선화" },
        { zh: "精确配色", en: "Precise Color Matching", ja: "正確な配色", ko: "정확한 색상 매칭" },
        { zh: "人物上色", en: "Character Coloring", ja: "キャラクター着色", ko: "캐릭터 색칠" }
      ]
    },
    {
      title: { zh: "文章信息图", en: "Article Infographic", ja: "記事インフォグラフィック", ko: "글 인포그래픽" },
      description: { zh: "将文章内容转换为英文信息图，包含卡通元素", en: "Convert article content to English infographic with cartoon elements", ja: "記事の内容を英語のインフォグラフィックに変換し、キャラクター要素を含む", ko: "글 내용을 영어 인포그래픽으로 변환하고 캐릭터 요소 포함" },
      prompt: { zh: "为文章内容生成信息图\n要求：\n1. 将内容翻译成英文，并提炼文章的关键信息\n2. 图中内容保持精简，只保留大标题\n3. 图中文字采用英文\n4. 加上丰富可爱的卡通人物和元素", en: "Generate infographic for article content\nRequirements:\n1. Translate content to English and extract key information from the article\n2. Keep content in the image concise, only main headings\n3. Use English text in the image\n4. Add rich and cute cartoon characters and elements", ja: "記事の内容のインフォグラフィックを生成\n要件：\n1. 内容を英語に翻訳し、記事の重要情報を抽出\n2. 画像の内容を簡潔に保ち、主要な見出しのみを保持\n3. 画像内のテキストは英語を使用\n4. 豊富でかわいいキャラクターと要素を追加", ko: "글 내용에 대한 인포그래픽 생성\n요구사항:\n1. 내용을 영어로 번역하고 글의 핵심 정보 추출\n2. 이미지 내용을 간결하게 유지하고 주요 제목만 유지\n3. 이미지 내 텍스트는 영어 사용\n4. 풍부하고 귀여운 캐릭터와 요소 추가" },
      author: "黄建同学",
      category: { zh: "信息图表", en: "Infographic", ja: "インフォグラフィック", ko: "인포그래픽" },
      tags: [
        { zh: "信息图", en: "Infographic", ja: "インフォグラフィック", ko: "인포그래픽" },
        { zh: "文章转换", en: "Article Conversion", ja: "記事変換", ko: "글 변환" },
        { zh: "英文翻译", en: "English Translation", ja: "英語翻訳", ko: "영어 번역" },
        { zh: "卡通元素", en: "Cartoon Elements", ja: "キャラクター要素", ko: "캐릭터 요소" }
      ]
    },
    {
      title: { zh: "更换多种发型", en: "Multiple Hairstyle Changes", ja: "複数のヘアスタイル変更", ko: "다양한 헤어스타일 변경" },
      description: { zh: "为人物生成九宫格格式的多种发型效果", en: "Generate nine-grid style multiple hairstyle effects for characters", ja: "キャラクターに九宮格形式の複数のヘアスタイル効果を生成", ko: "캐릭터에 대한 구궁格 형식의 다양한 헤어스타일 효과 생성" },
      prompt: { zh: "以九宫格的方式生成这个人不同发型的头像", en: "Generate nine-grid style avatars of this person with different hairstyles", ja: "この人の異なるヘアスタイルのアバターを九宮格形式で生成", ko: "이 사람의 다양한 헤어스타일 아바타를 구궁格 형식으로 생성" },
      author: "balconychy",
      category: { zh: "发型设计", en: "Hairstyle Design", ja: "ヘアスタイルデザイン", ko: "헤어스타일 디자인" },
      tags: [
        { zh: "发型更换", en: "Hairstyle Change", ja: "ヘアスタイル変更", ko: "헤어스타일 변경" },
        { zh: "九宫格", en: "Nine Grid", ja: "九宮格", ko: "구궁격" },
        { zh: "头像生成", en: "Avatar Generation", ja: "アバター生成", ko: "아바타 생성" },
        { zh: "多发型", en: "Multiple Hairstyles", ja: "複数ヘアスタイル", ko: "다중 헤어스타일" }
      ]
    },
    {
      title: { zh: "模型标注讲解图", en: "Model Annotation Explanation Diagram", ja: "モデル注釈説明図", ko: "모델 주석 설명도" },
      description: { zh: "为3D模型生成标注讲解图，适用于学术展示", en: "Generate annotated explanation diagrams for 3D models, suitable for academic presentations", ja: "3Dモデルの注釈説明図を生成し、学術展示に適用", ko: "3D 모델에 대한 주석 설명도를 생성하고 학술 발표에 적용" },
      prompt: { zh: "绘制[3D人体器官模型展示示例心脏]用于学术展示，进行标注讲解，适用于展示其原理和[每个器官]的功能，非常逼真，高度还原，精细度非常细致的设计", en: "Draw [3D human organ model display example heart] for academic presentation, with annotations and explanations, suitable for demonstrating its principles and [each organ's] functions, very realistic, highly restored, extremely detailed design", ja: "学術展示のために[3D人体臓器モデル表示例心臓]を描画し、注釈と説明を追加、その原理と[各臓器]の機能を示すのに適し、非常にリアルで、高度に復元され、非常に細かいデザイン", ko: "학술 발표를 위해 [3D 인간 장기 모델 표시 예시 심장]을 그리고 주석과 설명을 추가, 그 원리와 [각 장기]의 기능을 보여주기에 적합하며, 매우 사실적이고, 고도로 복원되며, 매우 세밀한 디자인" },
      author: "berryxia_ai",
      category: { zh: "教育图表", en: "Educational Chart", ja: "教育チャート", ko: "교육 차트" },
      tags: [
        { zh: "3D模型", en: "3D Model", ja: "3Dモデル", ko: "3D 모델" },
        { zh: "学术展示", en: "Academic Presentation", ja: "学術展示", ko: "학술 발표" },
        { zh: "标注讲解", en: "Annotation Explanation", ja: "注釈説明", ko: "주석 설명" },
        { zh: "人体器官", en: "Human Organs", ja: "人体臓器", ko: "인간 장기" }
      ]
    },
    {
      title: { zh: "定制大理石雕塑", en: "Custom Marble Sculpture", ja: "カスタム大理石彫刻", ko: "맞춤 대리석 조각" },
      description: { zh: "将参考图像转换为逼真的大理石雕塑效果", en: "Convert reference images to realistic marble sculpture effects", ja: "参照画像をリアルな大理石彫刻効果に変換", ko: "참조 이미지를 사실적인 대리석 조각 효과로 변환" },
      prompt: { zh: "一张超详细的图像中主体雕塑的写实图像，由闪亮的大理石制成。雕塑应展示光滑反光的大理石表面，强调其光泽和艺术工艺。设计优雅，突出大理石的美丽和深度。图像中的光线应增强雕塑的轮廓和纹理，创造出视觉上令人惊叹和迷人的效果", en: "A highly detailed image of a realistic main sculpture made of shiny marble. The sculpture should show smooth reflective marble surfaces, emphasizing its luster and artistic craftsmanship. Elegant design, highlighting the beauty and depth of marble. Light in the image should enhance the sculpture's contours and texture, creating visually stunning and captivating effects", ja: "光沢のある大理石で作られたリアルな主な彫刻の非常に詳細な画像。彫刻は滑らかで反射性のある大理石の表面を示し、その光沢と芸術的な工芸を強調すべきです。エレガントなデザインで、大理石の美しさと深みを際立たせます。画像の光は彫刻の輪郭と質感を高め、視覚的に驚くほど魅力的な効果を作り出します", ko: "광택 있는 대리석으로 만든 사실적인 주요 조각상의 매우 상세한 이미지. 조각상은 매끄럽고 반사적인 대리석 표면을 보여주어 그 광택과 예술적인 장인 정신을 강조해야 합니다. 우아한 디자인으로 대리석의 아름다움과 깊이를 강조합니다. 이미지의 빛은 조각상의 윤곽과 질감을 향상시켜 시각적으로 놀랍고 매력적인 효과를 만듭니다" },
      author: "umesh_ai",
      category: { zh: "雕塑艺术", en: "Sculpture Art", ja: "彫刻芸術", ko: "조각 예술" },
      tags: [
        { zh: "大理石雕塑", en: "Marble Sculpture", ja: "大理石彫刻", ko: "대리석 조각" },
        { zh: "写实效果", en: "Realistic Effect", ja: "リアルな効果", ko: "사실적 효과" },
        { zh: "光泽表面", en: "Glossy Surface", ja: "光沢表面", ko: "광택 표면" },
        { zh: "艺术工艺", en: "Artistic Craftsmanship", ja: "芸術的工芸", ko: "예술적 장인 정신" }
      ]
    },
    {
      title: { zh: "根据食材做菜", en: "Cook from Ingredients", ja: "食材から料理作成", ko: "재료로 요리하기" },
      description: { zh: "根据上传的食材图片生成精美的菜品展示", en: "Generate exquisite dish presentations based on uploaded ingredient images", ja: "アップロードされた食材画像に基づいて精美な料理プレゼンテーションを生成", ko: "업로드된 재료 이미지를 기반으로 정교한 요리 프레젠테이션 생성" },
      prompt: { zh: "用这些食材为我做一顿美味的午餐，放在盘子里，盘子的特写视图，移除其他盘子和食材", en: "Use these ingredients to make me a delicious lunch, serve it on a plate, close-up view of the plate, remove other plates and ingredients", ja: "これらの食材で私に美味しい昼食を作ってください、お皿に盛り付けて、お皿のクローズアップビュー、他のお皿と食材を取り除いて", ko: "이 재료들로 저에게 맛있는 점심을 만들어주세요, 접시에 담아서, 접시의 클로즈업 뷰, 다른 접시와 재료는 제거해주세요" },
      author: "Gdgtify",
      category: { zh: "美食生成", en: "Food Generation", ja: "グルメ生成", ko: "음식 생성" },
      tags: [
        { zh: "食材处理", en: "Ingredient Processing", ja: "食材処理", ko: "재료 처리" },
        { zh: "菜品制作", en: "Dish Preparation", ja: "料理作成", ko: "요리 준비" },
        { zh: "特写视图", en: "Close-up View", ja: "クローズアップビュー", ko: "클로즈업 뷰" },
        { zh: "美味午餐", en: "Delicious Lunch", ja: "美味しい昼食", ko: "맛있는 점심" }
      ]
    },
    {
      title: { zh: "数学题推理", en: "Math Problem Reasoning", ja: "数学問題推論", ko: "수학 문제 추론" },
      description: { zh: "在数学题目图片上标注答案和解题过程", en: "Annotate answers and solution processes on math problem images", ja: "数学問題の画像に答えと解法プロセスを注釈", ko: "수학 문제 이미지에 답과 해결 과정 주석 달기" },
      prompt: { zh: "根据问题将问题的答案写在对应的位置上", en: "Write the answer to the problem in the corresponding position based on the question", ja: "問題に基づいて問題の答えを対応する位置に書いてください", ko: "문제에 따라 문제의 답을 해당 위치에 쓰세요" },
      author: "Gorden Sun",
      category: { zh: "教育辅助", en: "Educational Aid", ja: "教育支援", ko: "교육 보조" },
      tags: [
        { zh: "数学题", en: "Math Problem", ja: "数学問題", ko: "수학 문제" },
        { zh: "答案标注", en: "Answer Annotation", ja: "答えの注釈", ko: "답 주석" },
        { zh: "解题过程", en: "Solution Process", ja: "解法プロセス", ko: "해결 과정" },
        { zh: "教育辅助", en: "Educational Aid", ja: "教育支援", ko: "교육 보조" }
      ]
    },
    {
      title: { zh: "旧照片上色", en: "Old Photo Colorization", ja: "古い写真の着色", ko: "오래된 사진 색칠" },
      description: { zh: "修复并为老旧黑白照片上色", en: "Restore and colorize old black and white photos", ja: "古い白黒写真を修復し着色", ko: "오래된 흑백 사진을 복원하고 색칠" },
      prompt: { zh: "修复并为这张照片上色", en: "Restore and colorize this photo", ja: "この写真を修復し着色してください", ko: "이 사진을 복원하고 색칠해주세요" },
      author: "GeminiApp",
      category: { zh: "照片修复", en: "Photo Restoration", ja: "写真修復", ko: "사진 복원" },
      tags: [
        { zh: "旧照片", en: "Old Photo", ja: "古い写真", ko: "오래된 사진" },
        { zh: "上色修复", en: "Colorization Restoration", ja: "着色修復", ko: "색칠 복원" },
        { zh: "照片修复", en: "Photo Restoration", ja: "写真修復", ko: "사진 복원" },
        { zh: "历史影像", en: "Historical Images", ja: "歴史的画像", ko: "역사적 이미지" }
      ]
    },
    {
      title: { zh: "OOTD穿搭", en: "OOTD Fashion", ja: "OOTDファッション", ko: "OOTD 패션" },
      description: { zh: "为人物穿上指定的服装，生成时尚的OOTD风格照片", en: "Dress characters in specified outfits, generating fashionable OOTD style photos", ja: "キャラクターに指定された服装を着せ、ファッショナブルなOOTDスタイルの写真を生成", ko: "캐릭터에 지정된 의상을 입히고 패션 OOTD 스타일 사진 생성" },
      prompt: { zh: "选择图1中的人，让他们穿上图2中的所有服装和配饰。在户外拍摄一系列写实的OOTD风格照片，使用自然光线，时尚的街头风格，清晰的全身镜头。保持图1中人物的身份和姿势，但以连贯时尚的方式展示图2中的完整服装和配饰", en: "Select the person from Figure 1, have them wear all the clothing and accessories from Figure 2. Shoot a series of realistic OOTD style photos outdoors, using natural light, fashionable street style, clear full-body shots. Maintain the identity and pose of the person from Figure 1, but showcase the complete clothing and accessories from Figure 2 in a coherent fashionable way", ja: "図1の人を選び、図2のすべての衣類とアクセサリーを着用させてください。屋外で一連のリアルなOOTDスタイル写真を撮影し、自然光、ファッショナブルなストリートスタイル、明確な全身ショットを使用。図1の人物のアイデンティティとポーズを維持しながら、図2の完全な衣類とアクセサリーを一貫したファッショナブルな方法で見せてください", ko: "그림 1의 사람을 선택하고 그림 2의 모든 의류와 액세서리를 착용하게 하세요. 야외에서 일련의 사실적인 OOTD 스타일 사진을 촬영하고, 자연광, 패셔너블한 스트리트 스타일, 명확한 전신 샷을 사용하세요. 그림 1의 인물의 정체성과 포즈를 유지하면서 그림 2의 완전한 의류와 액세서리를 일관된 패셔너블한 방식으로 보여주세요" },
      author: "302.AI",
      category: { zh: "时尚穿搭", en: "Fashion Style", ja: "ファッションスタイル", ko: "패션 스타일" },
      tags: [
        { zh: "OOTD", en: "OOTD", ja: "OOTD", ko: "OOTD" },
        { zh: "时尚穿搭", en: "Fashion Style", ja: "ファッションコーデ", ko: "패션 스타일" },
        { zh: "服装搭配", en: "Outfit Coordination", ja: "服装コーディネート", ko: "의상 조화" },
        { zh: "自然光线", en: "Natural Light", ja: "自然光", ko: "자연광" },
        { zh: "街头风格", en: "Street Style", ja: "ストリートスタイル", ko: "스트리트 스타일" }
      ]
    },
    {
      title: { zh: "人物换衣", en: "Character Clothing Change", ja: "キャラクター衣装変更", ko: "캐릭터 의상 변경" },
      description: { zh: "将人物的服装替换为目标服装，保持其他元素不变", en: "Replace character's clothing with target outfit while keeping other elements unchanged", ja: "キャラクターの衣装を対象の衣装に置き換え、他の要素は変更しない", ko: "캐릭터의 의상을 대상 의상으로 교체하고 다른 요소는 변경하지 않음" },
      prompt: { zh: "将输入图像中人物的服装替换为参考图像中显示的目标服装。保持人物的姿势、面部表情、背景和整体真实感不变。让新服装看起来自然、合身，并与光线和阴影保持一致。不要改变人物的身份或环境——只改变衣服", en: "Replace the clothing of the person in the input image with the target outfit shown in the reference image. Keep the person's pose, facial expression, background, and overall realism unchanged. Make the new clothing look natural and well-fitted, consistent with lighting and shadows. Don't change the person's identity or environment—only change the clothes", ja: "入力画像の人物の衣装を参照画像に表示される対象の衣装に置き換えてください。人物のポーズ、顔の表情、背景、全体のリアルさを変更しないでください。新しい衣装が自然でよくフィットし、光と影と一致するようにしてください。人物のアイデンティティや環境を変更しないでください——服だけを変更してください", ko: "입력 이미지에서 인물의 의상을 참조 이미지에 표시된 대상 의상으로 교체하세요. 인물의 포즈, 얼굴 표정, 배경, 전체적인 사실감을 변경하지 마세요. 새 의상이 자연스럽고 잘 맞으며, 빛과 그림자와 일치하도록 하세요. 인물의 정체성이나 환경을 변경하지 마세요——옷만 변경하세요" },
      author: "skirano",
      category: { zh: "服装替换", en: "Clothing Replacement", ja: "衣装置換", ko: "의상 교체" },
      tags: [
        { zh: "服装替换", en: "Clothing Replacement", ja: "衣装置換", ko: "의상 교체" },
        { zh: "人物换衣", en: "Character Clothing Change", ja: "キャラクター衣装変更", ko: "캐릭터 의상 변경" },
        { zh: "姿势保持", en: "Pose Preservation", ja: "ポーズ維持", ko: "포즈 유지" },
        { zh: "自然合身", en: "Natural Fit", ja: "自然なフィット", ko: "자연스러운 핏" }
      ]
    },
    {
      title: { zh: "多视图结果生成", en: "Multi-View Result Generation", ja: "複数ビュー結果生成", ko: "다중 뷰 결과 생성" },
      description: { zh: "生成物体的前、后、左、右、上、下六个视图", en: "Generate six views of an object: front, back, left, right, top, bottom", ja: "物体の前、後、左、右、上、下の6つのビューを生成", ko: "물체의 전, 후, 좌, 우, 상, 하 6개의 뷰 생성" },
      prompt: { zh: "在白色背景上生成前、后、左、右、上、下视图。均匀分布。一致的主体。等距透视等效", en: "Generate front, back, left, right, top, bottom views on white background. Evenly distributed. Consistent subject. Isometric perspective equivalent", ja: "白い背景で前、後、左、右、上、下ビューを生成。均等に分布。一貫した被写体。等距透視等価", ko: "흰색 배경에서 전, 후, 좌, 우, 상, 하 뷰를 생성. 균등하게 분포. 일관된 주제. 등축 투상 등가" },
      author: "Error_HTTP_404",
      category: { zh: "3D建模", en: "3D Modeling", ja: "3Dモデリング", ko: "3D 모델링" },
      tags: [
        { zh: "多视图", en: "Multi-View", ja: "複数ビュー", ko: "다중 뷰" },
        { zh: "六视图", en: "Six Views", ja: "六ビュー", ko: "육뷰" },
        { zh: "等距透视", en: "Isometric Perspective", ja: "等距透視", ko: "등축 투상" },
        { zh: "白色背景", en: "White Background", ja: "白い背景", ko: "흰색 배경" },
        { zh: "产品展示", en: "Product Display", ja: "製品展示", ko: "제품 디스플레이" }
      ]
    },
    {
      title: { zh: "电影分镜", en: "Movie Storyboard", ja: "映画ストーリーボード", ko: "영화 스토리보드" },
      description: { zh: "基于两个角色创作12部分的黑色电影侦探故事", en: "Create a 12-part film noir detective story based on two characters", ja: "2人のキャラクターに基づいて12部のフィルムノワール探偵ストーリーを作成", ko: "두 캐릭터를 기반으로 12부작 필름 누아 탐정 이야기 창작" },
      prompt: { zh: "用这两个角色创作一个令人上瘾的12部分故事，包含12张图像，讲述经典的黑色电影侦探故事。故事关于他们寻找线索并最终发现的失落的宝藏。整个故事充满刺激，有情感的高潮和低谷，以精彩的转折和高潮结尾。不要在图像中包含任何文字或文本，纯粹通过图像本身讲述故事", en: "Create an addictive 12-part story with these two characters, containing 12 images, telling a classic film noir detective story. The story is about them searching for clues and eventually discovering lost treasure. The entire story is full of excitement, with emotional highs and lows, ending with a brilliant twist and climax. Don't include any text in the images, tell the story purely through the images themselves", ja: "この2人のキャラクターで中毒性のある12部のストーリーを作成し、12枚の画像を含み、古典的なフィルムノワール探偵ストーリーを語ります。物語は彼らが手がかりを探し、最終的に失われた宝を見つけることについてです。全体のストーリーは興奮に満ちており、感情の高まりと低まりがあり、素晴らしい転換とクライマックスで終わります。画像にテキストを含めないでください、純粋に画像自体で物語を語ってください", ko: "이 두 캐릭터로 중독성 있는 12부작 이야기를 만들고, 12개의 이미지를 포함하여 고전적인 필름 누아 탐정 이야기를 들려주세요. 이야기는 그들이 단서를 찾고 결국 잃어버린 보물을 발견하는 것에 관한 것입니다. 전체 이야기는 흥분으로 가득 차 있으며, 감정의 고조와 저조가 있으며, 멋진 반전과 클라이맥스로 끝납니다. 이미지에 텍스트를 포함하지 마세요, 순수하게 이미지 자체로 이야기를 들려주세요" },
      author: "GeminiApp",
      category: { zh: "故事创作", en: "Story Creation", ja: "ストーリー創作", ko: "스토리 창작" },
      tags: [
        { zh: "电影分镜", en: "Movie Storyboard", ja: "映画ストーリーボード", ko: "영화 스토리보드" },
        { zh: "故事创作", en: "Story Creation", ja: "ストーリー創作", ko: "스토리 창작" },
        { zh: "黑色电影", en: "Film Noir", ja: "フィルムノワール", ko: "필름 누아" },
        { zh: "侦探故事", en: "Detective Story", ja: "探偵ストーリー", ko: "탐정 이야기" },
        { zh: "12部分", en: "12 Parts", ja: "12部", ko: "12부작" }
      ]
    },
    {
      title: { zh: "人物姿势修改", en: "Character Pose Modification", ja: "キャラクターポーズ変更", ko: "캐릭터 포즈 수정" },
      description: { zh: "修改人物姿势，让人物直视前方", en: "Modify character pose to make character look straight ahead", ja: "キャラクターのポーズを変更し、キャラクターを真正面に向かせる", ko: "캐릭터의 포즈를 수정하여 캐릭터가 정면을 보게 함" },
      prompt: { zh: "让图片中的人直视前方", en: "Make the person in the picture look straight ahead", ja: "画像の中の人物を真正面に向かわせてください", ko: "사진 속 인물이 정면을 보도록 하세요" },
      author: "arrakis_ai",
      category: { zh: "姿势调整", en: "Pose Adjustment", ja: "ポーズ調整", ko: "포즈 조정" },
      tags: [
        { zh: "姿势修改", en: "Pose Modification", ja: "ポーズ変更", ko: "포즈 수정" },
        { zh: "直视前方", en: "Look Straight Ahead", ja: "真正面を見る", ko: "정면 주시" },
        { zh: "人物调整", en: "Character Adjustment", ja: "キャラクター調整", ko: "캐릭터 조정" },
        { zh: "方向控制", en: "Direction Control", ja: "方向制御", ko: "방향 제어" }
      ]
    },
    {
      title: { zh: "线稿图生成图像", en: "Line Art to Image Generation", ja: "線画から画像生成", ko: "선화에서 이미지 생성" },
      description: { zh: "将线稿图人物按照参考图像姿势生成完整图像", en: "Generate complete images from line art characters following reference image poses", ja: "線画のキャラクターを参照画像のポーズに従って完全な画像を生成", ko: "선화 캐릭터를 참조 이미지 포즈에 따라 완전한 이미지로 생성" },
      prompt: { zh: "将图一人物换成图二姿势，专业摄影棚拍摄", en: "Change Figure 1 character to Figure 2 pose, professional photo studio shooting", ja: "図1のキャラクターを図2のポーズに変更し、プロの写真スタジオで撮影", ko: "그림 1 캐릭터를 그림 2 포즈로 변경하고, 프로 사진 스튜디오에서 촬영" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "线稿上色", en: "Line Art Coloring", ja: "線画着色", ko: "선화 색칠" },
      tags: [
        { zh: "线稿图", en: "Line Art", ja: "線画", ko: "선화" },
        { zh: "姿势转换", en: "Pose Conversion", ja: "ポーズ変換", ko: "포즈 변환" },
        { zh: "摄影棚", en: "Photo Studio", ja: "写真スタジオ", ko: "사진 스튜디오" },
        { zh: "专业拍摄", en: "Professional Shooting", ja: "プロ撮影", ko: "전문 촬영" }
      ]
    },
    {
      title: { zh: "为图像添加水印", en: "Add Watermark to Image", ja: "画像にウォーターマーク追加", ko: "이미지에 워터마크 추가" },
      description: { zh: "在图像上反复覆盖指定的文字水印", en: "Repeatedly cover specified text watermark on image", ja: "画像上に指定されたテキストウォーターマークを繰り返し覆盖", ko: "이미지에 지정된 텍스트 워터마크를 반복적으로 덮어쓰기" },
      prompt: { zh: "在整个图片上反复覆盖\"TRUMP\"这个词。", en: "Repeatedly cover the word \"TRUMP\" all over the image.", ja: "画像全体に\"TRUMP\"という言葉を繰り返し覆盖してください。", ko: "이미지 전체에 \"TRUMP\"라는 단어를 반복적으로 덮어쓰세요." },
      author: "AiMachete",
      category: { zh: "水印添加", en: "Watermark Addition", ja: "ウォーターマーク追加", ko: "워터마크 추가" },
      tags: [
        { zh: "水印", en: "Watermark", ja: "ウォーターマーク", ko: "워터마크" },
        { zh: "文字覆盖", en: "Text Overlay", ja: "テキストオーバーレイ", ko: "텍스트 오버레이" },
        { zh: "图像标注", en: "Image Annotation", ja: "画像注釈", ko: "이미지 주석" },
        { zh: "TRUMP", en: "TRUMP", ja: "TRUMP", ko: "TRUMP" }
      ]
    },
    {
      title: { zh: "知识推理生成图像", en: "Knowledge Reasoning Image Generation", ja: "知識推論画像生成", ko: "지식 추론 이미지 생성" },
      description: { zh: "基于知识推理生成信息图表，如世界最高建筑或最甜蜜事物", en: "Generate infographics based on knowledge reasoning, such as world's tallest buildings or sweetest things", ja: "知識推論に基づいてインフォグラフィックを生成、例えば世界で最も高い建物や最も甘いもの", ko: "지식 추론을 기반으로 인포그래픽 생성, 예를 들어 세계에서 가장 높은 건물이나 가장 달콤한 것들" },
      prompt: { zh: "为我制作一张世界五座最高建筑的信息图 / 制作一张关于地球上最甜蜜事物的彩色信息图", en: "Make me an infographic of the world's five tallest buildings / Make a colorful infographic about the sweetest things on earth", ja: "私のために世界で最も高い建物5つのインフォグラフィックを作成してください / 地球上で最も甘いものについてのカラフルなインフォグラフィックを作成してください", ko: "저를 위해 세계에서 가장 높은 건물 5개의 인포그래픽을 만들어주세요 / 지구상에서 가장 달콤한 것들에 대한 컬러풀한 인포그래픽을 만들어주세요" },
      author: "icreatelife",
      category: { zh: "知识图谱", en: "Knowledge Graph", ja: "知識グラフ", ko: "지식 그래프" },
      tags: [
        { zh: "信息图", en: "Infographic", ja: "インフォグラフィック", ko: "인포그래픽" },
        { zh: "知识推理", en: "Knowledge Reasoning", ja: "知識推論", ko: "지식 추론" },
        { zh: "世界最高建筑", en: "World's Tallest Buildings", ja: "世界で最も高い建物", ko: "세계에서 가장 높은 건물" },
        { zh: "最甜蜜事物", en: "Sweetest Things", ja: "最も甘いもの", ko: "가장 달콤한 것들" }
      ]
    },
    {
      title: { zh: "红笔批注", en: "Red Pen Annotation", ja: "赤ペン注釈", ko: "빨간 펜 주석" },
      description: { zh: "用红笔在图像上标注可以改进的地方", en: "Use red pen to annotate areas for improvement on images", ja: "赤ペンで画像上に改善できる箇所を注釈", ko: "빨간 펜으로 이미지상에 개선할 수 있는 부분 주석 달기" },
      prompt: { zh: "分析这张图片。用红笔标出你可以改进的地方。", en: "Analyze this image. Use red pen to mark where you can improve.", ja: "この画像を分析してください。赤ペンで改善できる箇所を示してください。", ko: "이 이미지를 분석하세요. 빨간 펜으로 개선할 수 있는 부분을 표시하세요." },
      author: "AiMachete",
      category: { zh: "图像分析", en: "Image Analysis", ja: "画像分析", ko: "이미지 분석" },
      tags: [
        { zh: "红笔批注", en: "Red Pen Annotation", ja: "赤ペン注釈", ko: "빨간 펜 주석" },
        { zh: "图像分析", en: "Image Analysis", ja: "画像分析", ko: "이미지 분석" },
        { zh: "改进标注", en: "Improvement Annotation", ja: "改善注釈", ko: "개선 주석" },
        { zh: "分析建议", en: "Analysis Suggestions", ja: "分析提案", ko: "분석 제안" }
      ]
    },
    {
      title: { zh: "爆炸的食物", en: "Explosive Food", ja: "爆発するフード", ko: "폭발하는 음식" },
      description: { zh: "为产品创建戏剧性的爆炸效果展示，强调新鲜度和营养价值", en: "Create dramatic explosive effect displays for products, emphasizing freshness and nutritional value", ja: "製品にドラマチックな爆発効果のディスプレイを作成し、新鮮さと栄養価を強調", ko: "제품에 극적인 폭발 효과 디스플레이를 만들고 신선도와 영양 가치 강조" },
      prompt: { zh: "在具有戏剧性的现代场景中拍摄该产品，并伴随着爆炸性的向外动态排列，主要成分新鲜和原始在产品周围飞舞，表明其新鲜度和营养价值。促销广告镜头，没有文字，强调产品，以关键品牌颜色作为背景。", en: "Shoot the product in a dramatic modern scene, accompanied by explosive outward dynamic arrangement, main ingredients fresh and raw flying around the product, indicating its freshness and nutritional value. Promotional advertising shot, no text, emphasizing the product, with key brand colors as background.", ja: "ドラマチックな現代的なシーンで製品を撮影し、爆発的な外向きのダイナミックな配置を伴い、主成分が新鮮で生の状態で製品の周りを飛び回り、その新鮮さと栄養価を示しています。プロモーション広告ショット、テキストなし、製品を強調し、主要なブランドカラーを背景にしています。", ko: "극적인 현대적인 장면에서 제품을 촬영하고, 폭발적인 외향적 동적 배열을 동반하며, 주요 성분이 신선하고 날것으로 제품 주위를 날아다니며 그 신선도와 영양 가치를 나타냅니다. 프로모션 광고 샷, 텍스트 없음, 제품을 강조하고, 주요 브랜드 색상을 배경으로 사용합니다." },
      author: "icreatelife",
      category: { zh: "产品广告", en: "Product Advertising", ja: "製品広告", ko: "제품 광고" },
      tags: [
        { zh: "爆炸效果", en: "Explosive Effect", ja: "爆発効果", ko: "폭발 효과" },
        { zh: "产品广告", en: "Product Advertising", ja: "製品広告", ko: "제품 광고" },
        { zh: "新鲜度", en: "Freshness", ja: "新鮮さ", ko: "신선도" },
        { zh: "营养价值", en: "Nutritional Value", ja: "栄養価", ko: "영양 가치" },
        { zh: "促销镜头", en: "Promotional Shot", ja: "プロモーションショット", ko: "프로모션 샷" }
      ]
    },
    {
      title: { zh: "制作漫画书", en: "Create Comic Book", ja: "漫画本作成", ko: "만화책 제작" },
      description: { zh: "基于上传图像制作漫画书条幅，添加文字和引人入胜的故事", en: "Create comic book strips based on uploaded images, add text and engaging stories", ja: "アップロードされた画像に基づいて漫画本のストリップを作成し、テキストと魅力的な物語を追加", ko: "업로드된 이미지를 기반으로 만화책 스트립을 만들고 텍스트와 흥미로운 이야기 추가" },
      prompt: { zh: "基于上传的图像，制作漫画书条幅，添加文字，写一个引人入胜的故事。我想要一本奇幻漫画书。", en: "Based on uploaded images, create comic book strips, add text, write an engaging story. I want a fantasy comic book.", ja: "アップロードされた画像に基づいて漫画本のストリップを作成し、テキストを追加し、魅力的な物語を書いてください。ファンタジー漫画本が欲しいです。", ko: "업로드된 이미지를 기반으로 만화책 스트립을 만들고, 텍스트를 추가하고, 흥미로운 이야기를 쓰세요. 저는 판타지 만화책을 원해요." },
      author: "icreatelife",
      category: { zh: "漫画创作", en: "Comic Creation", ja: "漫画創作", ko: "만화 창작" },
      tags: [
        { zh: "漫画书", en: "Comic Book", ja: "漫画本", ko: "만화책" },
        { zh: "故事创作", en: "Story Creation", ja: "ストーリー創作", ko: "스토리 창작" },
        { zh: "奇幻漫画", en: "Fantasy Comic", ja: "ファンタジー漫画", ko: "판타지 만화" },
        { zh: "条幅制作", en: "Strip Creation", ja: "ストリップ作成", ko: "스트립 제작" }
      ]
    },
    {
      title: { zh: "动作人偶", en: "Action Figure", ja: "アクションフィギュア", ko: "액션 피규어" },
      description: { zh: "制作定制化的动作人偶，包含指定的物品和标签", en: "Create customized action figures including specified items and labels", ja: "指定されたアイテムとラベルを含むカスタマイズされたアクションフィギュアを作成", ko: "지정된 아이템과 라벨을 포함하는 맞춤화된 액션 피규어 제작" },
      prompt: { zh: "制作一个写着 [\"AI Evangelist - Kris\"] 的动作人偶，并包含 [咖啡、乌龟、笔记本电脑、手机和耳机] 。", en: "Create an action figure with [\"AI Evangelist - Kris\"] label, including [coffee, turtle, laptop, phone and headphones].", ja: "[\"AI Evangelist - Kris\"] のラベルが書かれたアクションフィギュアを作成し、[コーヒー、カメ、ノートパソコン、携帯電話、ヘッドフォン] を含めてください。", ko: "[\"AI Evangelist - Kris\"] 라벨이 적힌 액션 피규어를 만들고 [커피, 거북이, 노트북, 휴대폰, 헤드폰] 을 포함하세요." },
      author: "icreatelife",
      category: { zh: "人偶设计", en: "Figure Design", ja: "フィギュアデザイン", ko: "피규어 디자인" },
      tags: [
        { zh: "动作人偶", en: "Action Figure", ja: "アクションフィギュア", ko: "액션 피규어" },
        { zh: "定制设计", en: "Custom Design", ja: "カスタムデザイン", ko: "맞춤 디자인" },
        { zh: "物品包含", en: "Item Inclusion", ja: "アイテム包含", ko: "아이템 포함" },
        { zh: "标签定制", en: "Label Customization", ja: "ラベルカスタマイズ", ko: "라벨 맞춤" }
      ]
    },
    {
      title: { zh: "地图生成等距建筑", en: "Map to Isometric Building", ja: "地図から等距建物生成", ko: "지도에서 등축 건물 생성" },
      description: { zh: "将地图位置转换为游戏主题公园风格的等距建筑图像", en: "Convert map locations to game theme park style isometric building images", ja: "地図の位置をゲームテーマパークスタイルの等距建物画像に変換", ko: "지도 위치를 게임 테마파크 스타일의 등축 건물 이미지로 변환" },
      prompt: { zh: "以这个位置为地标，将其设为等距图像（仅建筑物），采用游戏主题公园的风格", en: "Use this location as landmark, convert it to isometric image (buildings only), in game theme park style", ja: "この位置をランドマークとして使用し、それを等距画像（建物のみ）に変換し、ゲームテーマパークのスタイルを採用", ko: "이 위치를 랜드마크로 사용하고, 등축 이미지(건물만)로 변환하고, 게임 테마파크 스타일을 채택하세요" },
      author: "demishassabis",
      category: { zh: "地图转换", en: "Map Conversion", ja: "地図変換", ko: "지도 변환" },
      tags: [
        { zh: "地图转换", en: "Map Conversion", ja: "地図変換", ko: "지도 변환" },
        { zh: "等距建筑", en: "Isometric Building", ja: "等距建物", ko: "등축 건물" },
        { zh: "主题公园", en: "Theme Park", ja: "テーマパーク", ko: "테마파크" },
        { zh: "游戏风格", en: "Game Style", ja: "ゲームスタイル", ko: "게임 스타일" }
      ]
    },
    {
      title: { zh: "参考图控制人物表情", en: "Reference Image Controls Character Expression", ja: "参照画像でキャラクター表情制御", ko: "참조 이미지로 캐릭터 표정 제어" },
      description: { zh: "使用表情参考图控制人物的表情变化", en: "Use expression reference images to control character expression changes", ja: "表情参照画像を使用してキャラクターの表情変化を制御", ko: "표정 참조 이미지를 사용하여 캐릭터의 표정 변화 제어" },
      prompt: { zh: "图一人物参考/换成图二人物的表情", en: "Figure 1 character reference/change to Figure 2 character's expression", ja: "図1キャラクター参照/図2キャラクターの表情に変更", ko: "그림 1 캐릭터 참조/그림 2 캐릭터의 표정으로 변경" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "表情控制", en: "Expression Control", ja: "表情制御", ko: "표정 제어" },
      tags: [
        { zh: "表情控制", en: "Expression Control", ja: "表情制御", ko: "표정 제어" },
        { zh: "人物参考", en: "Character Reference", ja: "キャラクター参照", ko: "캐릭터 참조" },
        { zh: "表情参考", en: "Expression Reference", ja: "表情参照", ko: "표정 참조" },
        { zh: "表情替换", en: "Expression Replacement", ja: "表情置換", ko: "표정 교체" }
      ]
    },
    {
      title: { zh: "插画绘画过程四格", en: "Illustration Drawing Process Four Panels", ja: "イラスト作画プロセス四コマ", ko: "일러스트 그리기 과정 네 컷" },
      description: { zh: "生成人物绘画过程的四宫格，展示线稿到成品的完整过程", en: "Generate four-panel drawing process for characters, showing complete process from line art to finished work", ja: "キャラクターの作画プロセスの四コマを生成し、線画から完成品までの完全なプロセスを展示", ko: "캐릭터의 그리기 과정 네 컷을 생성하고 선화에서 완성품까지의 완전한 과정을 보여줌" },
      prompt: { zh: "为人物生成绘画过程四宫格，第一步：线稿，第二步平铺颜色，第三步：增加阴影，第四步：细化成型。不要文字", en: "Generate four-panel drawing process for character, step 1: line art, step 2: flat colors, step 3: add shadows, step 4: refine and finalize. No text", ja: "キャラクターの作画プロセス四コマを生成、ステップ1：線画、ステップ2：フラットカラー、ステップ3：影を追加、ステップ4：仕上げと完成。テキストなし", ko: "캐릭터의 그리기 과정 네 컷을 생성, 단계 1: 선화, 단계 2: 평면 색상, 단계 3: 그림자 추가, 단계 4: 다듬기와 완성. 텍스트 없음" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "绘画过程", en: "Drawing Process", ja: "作画プロセス", ko: "그리기 과정" },
      tags: [
        { zh: "绘画过程", en: "Drawing Process", ja: "作画プロセス", ko: "그리기 과정" },
        { zh: "四宫格", en: "Four Panels", ja: "四コマ", ko: "네 컷" },
        { zh: "线稿到成品", en: "Line Art to Finished", ja: "線画から完成品へ", ko: "선화에서 완성품까지" },
        { zh: "步骤展示", en: "Step Display", ja: "ステップ表示", ko: "단계 표시" }
      ]
    },
    {
      title: { zh: "虚拟试妆", en: "Virtual Makeup Try-On", ja: "バーチャルメーキャップ試着", ko: "가상 메이크업 트라이온" },
      description: { zh: "为人物虚拟试妆，应用指定的妆容效果", en: "Virtual makeup try-on for characters, applying specified makeup effects", ja: "キャラクターにバーチャルメーキャップを試着し、指定されたメーキャップ効果を適用", ko: "캐릭터에 가상 메이크업을 시도하고 지정된 메이크업 효과 적용" },
      prompt: { zh: "为图一人物化上图二的妆，还保持图一的姿势", en: "Apply Figure 2 makeup to Figure 1 character, keeping Figure 1's pose", ja: "図1のキャラクターに図2のメーキャップを施し、図1のポーズを維持", ko: "그림 1 캐릭터에 그림 2의 메이크업을 하고 그림 1의 포즈 유지" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "虚拟化妆", en: "Virtual Makeup", ja: "バーチャルメーキャップ", ko: "가상 메이크업" },
      tags: [
        { zh: "虚拟试妆", en: "Virtual Makeup", ja: "バーチャルメーキャップ試着", ko: "가상 메이크업 시도" },
        { zh: "妆容应用", en: "Makeup Application", ja: "メーキャップ適用", ko: "메이크업 적용" },
        { zh: "姿势保持", en: "Pose Preservation", ja: "ポーズ維持", ko: "포즈 유지" },
        { zh: "化妆效果", en: "Makeup Effect", ja: "メーキャップ効果", ko: "메이크업 효과" }
      ]
    },
    {
      title: { zh: "妆面分析", en: "Makeup Analysis", ja: "メーキャップ分析", ko: "메이크업 분석" },
      description: { zh: "分析妆容并用红笔标注可以改进的地方", en: "Analyze makeup and use red pen to annotate areas for improvement", ja: "メーキャップを分析し、赤ペンで改善できる箇所を注釈", ko: "메이크업을 분석하고 빨간 펜으로 개선할 수 있는 부분 주석 달기" },
      prompt: { zh: "分析这张图片。用红笔标出可以改进的地方\nAnalyze this image. Use red pen to denote where you can improve", en: "Analyze this image. Use red pen to mark where you can improve\nAnalyze this image. Use red pen to denote where you can improve", ja: "この画像を分析してください。赤ペンで改善できる箇所を示してください\nこの画像を分析してください。赤ペンで改善できる箇所を示してください", ko: "이 이미지를 분석하세요. 빨간 펜으로 개선할 수 있는 부분을 표시하세요\n이 이미지를 분석하세요. 빨간 펜으로 개선할 수 있는 부분을 표시하세요" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "妆容分析", en: "Makeup Analysis", ja: "メーキャップ分析", ko: "메이크업 분석" },
      tags: [
        { zh: "妆面分析", en: "Makeup Analysis", ja: "メーキャップ分析", ko: "메이크업 분석" },
        { zh: "红笔标注", en: "Red Pen Annotation", ja: "赤ペン注釈", ko: "빨간 펜 주석" },
        { zh: "改进建议", en: "Improvement Suggestions", ja: "改善提案", ko: "개선 제안" },
        { zh: "妆容评估", en: "Makeup Evaluation", ja: "メーキャップ評価", ko: "메이크업 평가" }
      ]
    },
    {
      title: { zh: "Google地图视角下的中土世界", en: "Middle Earth from Google Maps View", ja: "Googleマップ視点の中つ国", ko: "Google 지도 시점의 중간계" },
      description: { zh: "创建Google地图街景风格的中土世界场景", en: "Create Google Maps Street View style Middle Earth scenes", ja: "Googleマップストリートビュースタイルの中つ国シーンを作成", ko: "Google 지도 스트리트 뷰 스타일의 중간계 장면 생성" },
      prompt: { zh: "行车记录仪谷歌街景拍摄 | [霍比屯街道] | [霍比特人进行园艺和抽烟斗等日常活动] | [晴天]", en: "Dashcam Google Street View shooting | [Hobbiton streets] | [Hobbits doing daily activities like gardening and smoking pipes] | [Sunny day]", ja: "ドライブレコーダーGoogleストリートビュー撮影 | [ホビットンの通り] | [ホビットが園芸やパイプ喫煙などの日常活動を行う] | [晴れの日]", ko: "블랙박스 Google 스트리트 뷰 촬영 | [호빗의 거리] | [호빗들이 원예와 파이프 흡연 등 일상 활동을 함] | [맑은 날]" },
      author: "TechHallo",
      category: { zh: "虚拟世界", en: "Virtual World", ja: "仮想世界", ko: "가상 세계" },
      tags: [
        { zh: "Google地图", en: "Google Maps", ja: "Googleマップ", ko: "Google 지도" },
        { zh: "中土世界", en: "Middle Earth", ja: "中つ国", ko: "중간계" },
        { zh: "霍比屯", en: "Hobbiton", ja: "ホビットン", ko: "호빗의 거리" },
        { zh: "街景风格", en: "Street View Style", ja: "ストリートビュースタイル", ko: "스트리트 뷰 스타일" },
        { zh: "霍比特人", en: "Hobbits", ja: "ホビット", ko: "호빗" }
      ]
    },
    {
      title: { zh: "印刷插画生成", en: "Print Illustration Generation", ja: "印刷イラスト生成", ko: "인쇄 일러스트 생성" },
      description: { zh: "仅使用指定短语的字母创作极简主义黑白印刷插图", en: "Create minimalist black and white print illustrations using only letters from specified phrases", ja: "指定されたフレーズの文字のみを使用してミニマリストな白黒印刷イラストを作成", ko: "지정된 구문의 문자만 사용하여 미니멀리스트 흑백 인쇄 일러스트 생성" },
      prompt: { zh: "仅使用短语 [\"riding a bike\"] 中的字母，创作一幅极简主义的黑白印刷插图，描绘骑自行车的场景。每个字母的形状和位置都应富有创意，以构成骑车人、自行车和动感。设计应简洁、极简，完全由修改后的 [\"riding a bike\"] 字母组成，不添加任何额外的形状或线条。字母应流畅或弯曲，以模仿场景的自然形态，同时保持清晰易读。", en: "Using only letters from the phrase [\"riding a bike\"], create a minimalist black and white print illustration depicting a cycling scene. Each letter's shape and position should be creative to form the cyclist, bicycle, and sense of motion. Design should be clean and minimalist, composed entirely of modified [\"riding a bike\"] letters without adding any extra shapes or lines. Letters should flow or curve to mimic the natural forms of the scene while remaining clear and readable.", ja: "フレーズ [\"riding a bike\"] の文字のみを使用して、サイクリングシーンを描くミニマリストな白黒印刷イラストを作成してください。各文字の形状と位置は創造的であり、サイクリスト、自転車、動きを形成すべきです。デザインはクリーンでミニマリストであり、追加の形状や線を加えずに変更された [\"riding a bike\"] の文字のみで構成されるべきです。文字は流れるようにまたは曲がってシーンの自然な形を模倣しながら、明確で読みやすい状態を保つべきです。", ko: "[\"riding a bike\"] 구문의 문자만 사용하여 사이클링 장면을 묘사하는 미니멀리스트 흑백 인쇄 일러스트를 만드세요. 각 문자의 모양과 위치는 사이클리스트, 자전거, 움직임의 감각을 형성하기 위해 창의적이어야 합니다. 디자인은 깨끗하고 미니멀리스트해야 하며, 추가적인 모양이나 선을 더하지 않고 수정된 [\"riding a bike\"] 문자만으로 구성되어야 합니다. 문자는 장면의 자연적인 형태를 모방하면서 흐르거나 구부러져야 하면서도 명확하고 읽기 쉬운 상태를 유지해야 합니다." },
      author: "Umesh",
      category: { zh: "创意设计", en: "Creative Design", ja: "クリエイティブデザイン", ko: "창의적 디자인" },
      tags: [
        { zh: "印刷插画", en: "Print Illustration", ja: "印刷イラスト", ko: "인쇄 일러스트" },
        { zh: "极简主义", en: "Minimalism", ja: "ミニマリズム", ko: "미니멀리즘" },
        { zh: "文字艺术", en: "Text Art", ja: "テキストアート", ko: "텍스트 아트" },
        { zh: "黑白设计", en: "Black and White Design", ja: "白黒デザイン", ko: "흑백 디자인" },
        { zh: "字母创意", en: "Letter Creativity", ja: "文字の創造性", ko: "문자 창의성" }
      ]
    },
    {
      title: { zh: "超多人物姿势生成", en: "Multiple Character Pose Generation", ja: "多数キャラクターポーズ生成", ko: "다중 캐릭터 포즈 생성" },
      description: { zh: "为人物插图创建包含各种姿势的姿势表", en: "Create pose sheets for character illustrations containing various poses", ja: "キャラクターイラストのために様々なポーズを含むポーズシートを作成", ko: "캐릭터 일러스트를 위한 다양한 포즈를 포함하는 포즈 시트 생성" },
      prompt: { zh: "请为这幅插图创建一个姿势表，摆出各种姿势", en: "Please create a pose sheet for this illustration, showing various poses", ja: "このイラストのために様々なポーズを示すポーズシートを作成してください", ko: "이 일러스트를 위해 다양한 포즈를 보여주는 포즈 시트를 만들어주세요" },
      author: "tapehead_Lab",
      category: { zh: "姿势设计", en: "Pose Design", ja: "ポーズデザイン", ko: "포즈 디자인" },
      tags: [
        { zh: "姿势表", en: "Pose Sheet", ja: "ポーズシート", ko: "포즈 시트" },
        { zh: "各种姿势", en: "Various Poses", ja: "様々なポーズ", ko: "다양한 포즈" },
        { zh: "人物参考", en: "Character Reference", ja: "キャラクター参照", ko: "캐릭터 참조" },
        { zh: "动作设计", en: "Action Design", ja: "アクションデザイン", ko: "액션 디자인" }
      ]
    },
    {
      title: { zh: "物品包装生成", en: "Item Packaging Generation", ja: "物品包装生成", ko: "아이템 포장 생성" },
      description: { zh: "将物品图像贴在包装上，放置在极简设计布景中", en: "Place item images on packaging, arranged in minimalist design setting", ja: "物品の画像を包装に貼り、ミニマリストデザインの設定に配置", ko: "아이템 이미지를 포장에 붙이고 미니멀리스트 디자인 설정에 배치" },
      prompt: { zh: "把图一贴在图二易拉罐上，并放在极简设计的布景中，专业摄影", en: "Put Figure 1 on Figure 2 can, place in minimalist design setting, professional photography", ja: "図1を図2の缶に貼り、ミニマリストデザインの設定に置き、プロの写真撮影", ko: "그림 1을 그림 2 캔에 붙이고 미니멀리스트 디자인 설정에 놓고, 전문 사진 촬영" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "包装设计", en: "Packaging Design", ja: "包装デザイン", ko: "포장 디자인" },
      tags: [
        { zh: "物品包装", en: "Item Packaging", ja: "物品包装", ko: "아이템 포장" },
        { zh: "易拉罐", en: "Can", ja: "缶", ko: "캔" },
        { zh: "极简设计", en: "Minimalist Design", ja: "ミニマリストデザイン", ko: "미니멀리스트 디자인" },
        { zh: "专业摄影", en: "Professional Photography", ja: "プロ写真撮影", ko: "전문 사진 촬영" }
      ]
    },
    {
      title: { zh: "叠加滤镜/材质", en: "Overlay Filter/Material", ja: "オーバーレイフィルター/素材", ko: "오버레이 필터/소재" },
      description: { zh: "为照片叠加指定的滤镜或材质效果", en: "Overlay specified filter or material effects on photos", ja: "写真に指定されたフィルターまたは素材効果をオーバーレイ", ko: "사진에 지정된 필터나 소재 효과 오버레이" },
      prompt: { zh: "为图一照片叠加上图二 [玻璃] 的效果", en: "Overlay Figure 2 [glass] effect on Figure 1 photo", ja: "図1の写真に図2の[ガラス]効果をオーバーレイ", ko: "그림 1 사진에 그림 2의 [유리] 효과를 오버레이" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "滤镜效果", en: "Filter Effects", ja: "フィルター効果", ko: "필터 효과" },
      tags: [
        { zh: "滤镜叠加", en: "Filter Overlay", ja: "フィルターオーバーレイ", ko: "필터 오버레이" },
        { zh: "材质效果", en: "Material Effect", ja: "素材効果", ko: "소재 효과" },
        { zh: "玻璃效果", en: "Glass Effect", ja: "ガラス効果", ko: "유리 효과" },
        { zh: "图像处理", en: "Image Processing", ja: "画像処理", ko: "이미지 처리" }
      ]
    },
    {
      title: { zh: "控制人物脸型", en: "Control Character Face Shape", ja: "キャラクターの顔の形制御", ko: "캐릭터 얼굴 형태 제어" },
      description: { zh: "按照参考脸型将人物设计为Q版形象", en: "Design character as Q-version based on reference face shape", ja: "参照顔の形に従ってキャラクターをQ版イメージにデザイン", ko: "참조 얼굴 형태에 따라 캐릭터를 Q버전 이미지로 디자인" },
      prompt: { zh: "图一人物按照图二的脸型设计为q版形象", en: "Design Figure 1 character as Q-version based on Figure 2 face shape", ja: "図1のキャラクターを図2の顔の形に基づいてQ版イメージにデザイン", ko: "그림 1 캐릭터를 그림 2 얼굴 형태에 기반하여 Q버전 이미지로 디자인" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "脸型设计", en: "Face Design", ja: "顔の形デザイン", ko: "얼굴 형태 디자인" },
      tags: [
        { zh: "脸型控制", en: "Face Shape Control", ja: "顔の形制御", ko: "얼굴 형태 제어" },
        { zh: "Q版形象", en: "Q-Version", ja: "Q版イメージ", ko: "Q버전 이미지" },
        { zh: "人物设计", en: "Character Design", ja: "キャラクターデザイン", ko: "캐릭터 디자인" },
        { zh: "风格化", en: "Stylization", ja: "スタイライゼーション", ko: "스타일화" }
      ]
    },
    {
      title: { zh: "光影控制", en: "Light and Shadow Control", ja: "光と影の制御", ko: "빛과 그림자 제어" },
      description: { zh: "根据参考图控制人物的光影效果", en: "Control character's light and shadow effects based on reference image", ja: "参照画像に基づいてキャラクターの光と影の効果を制御", ko: "참조 이미지에 기반하여 캐릭터의 빛과 그림자 효과 제어" },
      prompt: { zh: "图一人物变成图二光影，深色为暗", en: "Figure 1 character changes to Figure 2 lighting, dark areas are shadows", ja: "図1のキャラクターが図2のライティングに変わり、暗い部分は影", ko: "그림 1 캐릭터가 그림 2 조명으로 바뀌고, 어두운 부분은 그림자" },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "光影效果", en: "Lighting Effects", ja: "ライティング効果", ko: "조명 효과" },
      tags: [
        { zh: "光影控制", en: "Lighting Control", ja: "ライティング制御", ko: "조명 제어" },
        { zh: "光线效果", en: "Lighting Effect", ja: "光線効果", ko: "빛선 효과" },
        { zh: "深色阴影", en: "Dark Shadows", ja: "暗い影", ko: "어두운 그림자" },
        { zh: "图像渲染", en: "Image Rendering", ja: "画像レンダリング", ko: "이미지 렌더링" }
      ]
    },
    {
      title: { zh: "乐高玩具小人", en: "Lego Minifigure", ja: "レゴミニフィグ", ko: "레고 미니피겨" },
      description: { zh: "将人物转换为乐高小人包装盒风格，包含包装和实际小人展示", en: "Transform characters into Lego minifigure box style, including packaging and actual minifigure display", ja: "キャラクターをレゴミニフィグボックススタイルに変換し、包装と実際のミニフィグ展示を含む", ko: "캐릭터를 레고 미니피겨 박스 스타일로 변환하고 포장과 실제 미니피겨 전시 포함" },
      prompt: { zh: "将照片中的人物转化为乐高小人包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示基于照片中人物的乐高小人，并配有他们必需的物品（如化妆品、包或其他物品）作为乐高配件。在盒子旁边，也展示实际乐高小人本身，未包装，以逼真且生动的方式渲染。", en: "Transform the character in the photo into Lego minifigure box style, presented in isometric perspective. Label the box with title \"ZHOGUE\". Inside the box, display Lego minifigure based on the photo character, with their essential items (like cosmetics, bags or other items) as Lego accessories. Next to the box, also display the actual Lego minifigure itself, unpackaged, rendered in realistic and vivid way.", ja: "写真のキャラクターをレゴミニフィグボックススタイルに変換し、等距透視で提示。ボックスにタイトル\"ZHOGUE\"をラベル付け。ボックス内に写真のキャラクターに基づいたレゴミニフィグを展示し、必需品（化粧品、バッグやその他のアイテムなど）をレゴアクセサリーとして付属。ボックスの隣に、実際のレゴミニフィグ自体も未包装で、リアルで生き生きとした方法でレンダリングして展示。", ko: "사진 속 캐릭터를 레고 미니피겨 박스 스타일로 변환하고 등축 투상으로 제시. 박스에 제목 \"ZHOGUE\"를 라벨링. 박스 내부에 사진 캐릭터에 기반한 레고 미니피겨를 전시하고 필수품(화장품, 가방 또는 기타 아이템 등)을 레고 액세서리로 포함. 박스 옆에 실제 레고 미니피겨 자체도 포장되지 않은 상태로 사실적이고 생생한 방식으로 렌더링하여 전시." },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "玩具设计", en: "Toy Design", ja: "おもちゃデザイン", ko: "장난감 디자인" },
      tags: [
        { zh: "乐高小人", en: "Lego Minifigure", ja: "レゴミニフィグ", ko: "레고 미니피겨" },
        { zh: "包装盒", en: "Packaging Box", ja: "包装ボックス", ko: "포장 박스" },
        { zh: "等距透视", en: "Isometric Perspective", ja: "等距透視", ko: "등축 투상" },
        { zh: "玩具设计", en: "Toy Design", ja: "おもちゃデザイン", ko: "장난감 디자인" },
        { zh: "ZHOGUE", en: "ZHOGUE", ja: "ZHOGUE", ko: "ZHOGUE" }
      ]
    },
    {
      title: { zh: "高达模型小人", en: "Gundam Model Figure", ja: "ガンダムモデルフィギュア", ko: "건담 모델 피규어" },
      description: { zh: "将人物转换为高达模型套件包装盒风格，包含机械化和未来派设计", en: "Transform characters into Gundam model kit box style, including mechanized and futuristic design", ja: "キャラクターをガンダムモデルキットボックススタイルに変換し、機械化された未来派デザインを含む", ko: "캐릭터를 건담 모델 키트 박스 스타일로 변환하고 기계화된 미래 지향적 디자인 포함" },
      prompt: { zh: "将照片中的人物转化为高达模型套件包装盒的风格，以等距透视呈现。在包装盒上标注标题\"ZHOGUE\"。在盒内展示照片中人物的高达风格机械人版本，并伴随其必需品（如化妆品、包袋或其他物品）重新设计为未来派机械配件。包装盒应类似真实的 Gunpla 盒子，包含技术插图、说明书风格细节和科幻字体。在盒子旁边，也展示实际的高达风格机械人本身，在包装外以逼真且栩栩如生的风格渲染，类似于官方 Bandai 宣传渲染图。", en: "Transform the character in the photo into Gundam model kit box style, presented in isometric perspective. Label the box with title \"ZHOGUE\". Inside the box, display Gundam-style mechanical version of the photo character, with their essential items (like cosmetics, bags or other items) redesigned as futuristic mechanical accessories. The box should resemble real Gunpla boxes, containing technical illustrations, instruction manual style details and sci-fi fonts. Next to the box, also display the actual Gundam-style mechanical figure itself, outside the packaging, rendered in realistic and lifelike style, similar to official Bandai promotional renders.", ja: "写真のキャラクターをガンダムモデルキットボックススタイルに変換し、等距透視で提示。ボックスにタイトル\"ZHOGUE\"をラベル付け。ボックス内に写真のキャラクターのガンダムスタイル機械人バージョンを展示し、必需品（化粧品、バッグやその他のアイテムなど）を未来派的な機械アクセサリーとして再設計。ボックスは本物のガンプラボックスに似せ、技術図、説明書スタイルの詳細、SFフォントを含む。ボックスの隣に、実際のガンダムスタイル機械人自体も包装外で、公式バンダイプロモーションレンダーに似たリアルで生き生きとしたスタイルでレンダリングして展示。", ko: "사진 속 캐릭터를 건담 모델 키트 박스 스타일로 변환하고 등축 투상으로 제시. 박스에 제목 \"ZHOGUE\"를 라벨링. 박스 내부에 사진 캐릭터의 건담 스타일 기계인 버전을 전시하고 필수품(화장품, 가방 또는 기타 아이템 등)을 미래 지향적 기계 액세서리로 재설계. 박스는 실제 건프라 박스와 유사하게, 기술 도해, 설명서 스타일 세부 사항, SF 폰트를 포함. 박스 옆에 실제 건담 스타일 기계인 자체도 포장 외부에서 공식 반다이 프로모션 렌더와 유사한 사실적이고 생생한 스타일로 렌더링하여 전시." },
      author: "ZHO_ZHO_ZHO",
      category: { zh: "机甲设计", en: "Mecha Design", ja: "メカデザイン", ko: "메카 디자인" },
      tags: [
        { zh: "高达模型", en: "Gundam Model", ja: "ガンダムモデル", ko: "건담 모델" },
        { zh: "机械人", en: "Mechanical Figure", ja: "機械人", ko: "기계인" },
        { zh: "Gunpla", en: "Gunpla", ja: "ガンプラ", ko: "건프라" },
        { zh: "科幻字体", en: "Sci-Fi Font", ja: "SFフォント", ko: "SF 폰트" },
        { zh: "技术插图", en: "Technical Illustration", ja: "技術図解", ko: "기술 도해" },
        { zh: "ZHOGUE", en: "ZHOGUE", ja: "ZHOGUE", ko: "ZHOGUE" }
      ]
    },
    {
      title: { zh: "硬件拆解图", en: "Hardware Teardown Diagram", ja: "ハードウェア分解図", ko: "하드웨어 분해도" },
      description: { zh: "生成数码单反相机的分解图，展示所有配件和内部组件", en: "Generate exploded view diagram of digital SLR camera, showing all accessories and internal components", ja: "デジタル一眼レフカメラの分解図を生成し、すべてのアクセサリーと内部コンポーネントを展示", ko: "디지털 SLR 카메라의 분해도를 생성하고 모든 액세서리와 내부 구성 요소를 보여줌" },
      prompt: { zh: "数码单反相机的分解图，展示了其所有配件和内部组件，例如镜头、滤镜、内部组件、镜头、传感器、螺丝、按钮、取景器、外壳和电路板。保留了数码单反相机的红色装饰。", en: "Exploded view diagram of digital SLR camera, showing all its accessories and internal components, such as lenses, filters, internal components, lenses, sensors, screws, buttons, viewfinder, housing and circuit boards. Retains the red decoration of digital SLR camera.", ja: "デジタル一眼レフカメラの分解図で、レンズ、フィルター、内部コンポーネント、レンズ、センサー、ネジ、ボタン、ビューファインダー、ハウジング、回路基板など、そのすべてのアクセサリーと内部コンポーネントを展示。デジタル一眼レフカメラの赤い装飾を保持。", ko: "디지털 SLR 카메라의 분해도로 렌즈, 필터, 내부 구성 요소, 렌즈, 센서, 나사, 버튼, 뷰파인더, 하우징, 회로 기판 등 모든 액세서리와 내부 구성 요소를 보여줌. 디지털 SLR 카메라의 빨간 장식을 유지." },
      author: "AIimagined",
      category: { zh: "技术图表", en: "Technical Diagram", ja: "技術図表", ko: "기술 다이어그램" },
      tags: [
        { zh: "硬件拆解", en: "Hardware Teardown", ja: "ハードウェア分解", ko: "하드웨어 분해" },
        { zh: "单反相机", en: "SLR Camera", ja: "一眼レフカメラ", ko: "SLR 카메라" },
        { zh: "分解图", en: "Exploded View", ja: "分解図", ko: "분해도" },
        { zh: "内部组件", en: "Internal Components", ja: "内部コンポーネント", ko: "내부 구성 요소" },
        { zh: "技术展示", en: "Technical Display", ja: "技術展示", ko: "기술 전시" }
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
export const getCategories = (cases: Case[], currentLanguage: string = 'zh'): string[] => {
  const categories = cases.map(caseItem => caseItem.category[currentLanguage as keyof typeof caseItem.category] || caseItem.category.zh);
  return [...new Set(categories)]; // 去重
};

/**
 * 获取所有可用的标签
 */
export const getAllTags = (cases: Case[], currentLanguage: string = 'zh'): string[] => {
  const allTags = cases.flatMap(caseItem => caseItem.tags.map(tag => tag[currentLanguage as keyof typeof tag] || tag.zh));
  return [...new Set(allTags)]; // 去重
};

/**
 * 获取分类统计
 */
export const getCategoryStats = (cases: Case[], currentLanguage: string = 'zh'): Record<string, number> => {
  const stats: Record<string, number> = {};
  cases.forEach(caseItem => {
    const categoryName = caseItem.category[currentLanguage as keyof typeof caseItem.category] || caseItem.category.zh;
    stats[categoryName] = (stats[categoryName] || 0) + 1;
  });
  return stats;
};

/**
 * 获取标签统计
 */
export const getTagStats = (cases: Case[], currentLanguage: string = 'zh'): Record<string, number> => {
  const stats: Record<string, number> = {};
  cases.forEach(caseItem => {
    caseItem.tags.forEach(tag => {
      const tagName = tag[currentLanguage as keyof typeof tag] || tag.zh;
      stats[tagName] = (stats[tagName] || 0) + 1;
    });
  });
  return stats;
};