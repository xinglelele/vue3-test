// 定义 Props 接口
export interface Props {
  // 文本内容：二维数组，每个子数组代表一行，每个字符串代表一个单词
  text?: string[][];
  // 字体大小（px）
  fontSize?: number;
  // 字体粗细
  fontWeight?: number | string;
  // 字体样式
  fontFamily?: string;
  // 基础文字颜色
  baseColor?: string;
  // 主题颜色数组(优先级高于theme)
  themeColors?: string[];
  // 主题名称
  theme?: 'vibrant' | 'soft' | 'cool' | 'warm' | 'natural' | 'retro' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6' | 'theme7';
  // 摇晃动画持续时间（ms）
  swingDuration?: number;
  // 颜色变化持续时间（ms）
  colorDuration?: number;
  // 摇晃角度（deg）
  swingAngle?: number;
  // 行间距（px）
  lineSpacing?: number;
  // 单词间距（px）
  wordSpacing?: number;
  // 字符间距（px）
  letterSpacing?: number;
  // 行对齐方式
  lineAlign?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
}