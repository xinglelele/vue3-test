<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Props } from './type';

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  text: () => [['Make', 'something'], ['colorful!']],
  fontSize: 80,
  fontWeight: 700,
  fontFamily: 'Arial, sans-serif',
  baseColor: '#c4c4c4',
  theme: 'retro',
  swingDuration: 500,
  colorDuration: 1000,
  swingAngle: 15,
  lineSpacing: 20,
  wordSpacing: 20,
  letterSpacing: 0,
  lineAlign: 'center',
});

//主题色预设
const THEME_COLORS = {
  'vibrant': ['#ff4d4f', '#ffa940', '#ffd666', '#73d13d', '#40a9ff', '#9254de'],
  'soft': ['#ffccc7', '#ffe7ba', '#fff1b8', '#d9f7be', '#bae7ff', '#efdbff'],
  'cool': ['#003a8c', '#0050b3', '#096dd9', '#1890ff', '#40a9ff', '#69c0ff'],
  'warm': ['#ad2102', '#d4380d', '#fa541c', '#ff7a45', '#ffa940', '#ffc069'],
  'natural': ['#3f6212', '#5c9210', '#85a800', '#b7d200', '#d3f261', '#f4ffb8'],
  'retro': ['#abe188', '#bee58d', '#d1e891', '#eeee97', '#f1bb87', '#f69a71', '#f78e69', '#aa7b62', '#84715f', '#5d675b', '#6c7862', '#7a8869', '#97a876'],
  'theme1': ['#8d5a97', '#8f729c', '#907f9f', '#aab6b6', '#B3D5C5', '#b4d9c7', '#b8ebd0', '#caf0dc', '#BFE3D1', '#B3D5C5', '#BBCBCB', '#ACA5BA'],
  'theme2': ['#FEC5BB','#FCD5CE','#FAE1DD','#F8EDEB','#E8E8E4','#D8E2DC','#ECE4DB','#FFE5D9','#FFD7BA','#FEC89A'],
  'theme3': ['#5bc0eb','#fde74c','#9bc53d','#e55934','#fa7921'],
  'theme4': ['#7DA6B3','#227c9d','#1DA0A8','#17c3b2','#8BC795','#ffcb77','#FCDFAA','#f8f2dc','#FBB0A8','#fe6d73'],
  'theme5':['#99621e','#d38b5d','#EAFF75','#739e82','#2c5530'],
  'theme6': ['#264653','#2a9d8f','#e9c46a','#f4a261','#e76f51'],
  'theme7':['#9b5de5','f15bb5','#fee440','#00bbf9','#00f5d4'],
};

// 响应式状态
const containerRef = ref<HTMLDivElement | null>(null);
const currentColorIndex = ref(0);
//把「某个 DOM 元素」和「它绑定的事件处理函数」一一对应存起来
const eventListeners = new Map<Element, (event: Event) => void>();

// 计算实际使用的颜色数组（优先使用themeColors，其次使用theme）
const activeColors = computed(() => {
  if (props.themeColors && props.themeColors.length > 0) {
    return props.themeColors;
  }
  if (props.theme && THEME_COLORS[props.theme]) {
    return THEME_COLORS[props.theme];
  }
  return [];
});

// 计算 CSS 变量
const cssVars = computed(() => ({
  '--font-size': `${props.fontSize}px`,
  '--font-weight': props.fontWeight,
  '--font-family': props.fontFamily,
  '--base-color': props.baseColor,
  '--line-spacing': `${props.lineSpacing}px`,
  '--word-spacing': `${props.wordSpacing}px`,
  '--letter-spacing': `${props.letterSpacing}px`,
  '--swing-duration': `${props.swingDuration}ms`,
  '--swing-angle': `${props.swingAngle}deg`,
  '--line-align': props.lineAlign,
}));

// 处理字符悬浮事件
const handleCharHover = (event: Event) => {
  const target = event.target as HTMLElement;

  // 检查是否正在动画中
  if (target.dataset.isAnimating === 'true') {
    return;
  }

  // 标记为动画中
  target.dataset.isAnimating = 'true';

  // 获取下一个颜色，并应用摇晃动画
  currentColorIndex.value = (currentColorIndex.value % activeColors.value.length) + 1;
  const colorIndex = currentColorIndex.value - 1;
  const color = activeColors.value[colorIndex];
  if (color) {
    target.style.color = color;
  }
  target.style.animation = `swing ${props.swingDuration}ms ease-in-out`;

  // 摇晃动画结束后移除动画， 颜色持续时间后恢复原色并解锁
  setTimeout(() => {
    target.style.animation = '';
  }, props.swingDuration);
  setTimeout(() => {
    target.style.color = props.baseColor;
    target.dataset.isAnimating = 'false';
  }, props.colorDuration);
};

// 组件挂载后添加事件监听
onMounted(() => {
  if (containerRef.value) {
    const items = containerRef.value.querySelectorAll('.item');
    items.forEach(item => {
      const handler = (event: Event) => handleCharHover(event);
      item.addEventListener('mouseover', handler);
      eventListeners.set(item, handler);
    });
  }
});

// 组件卸载前清理事件监听
onBeforeUnmount(() => {
  eventListeners.forEach((handler, item) => {
    item.removeEventListener('mouseover', handler);
  });
  eventListeners.clear();
});
</script>

<template>
  <div class="colorful-text-container" ref="containerRef" :style="cssVars">
    <div class="line" v-for="(lineWords, lineIndex) in text" :key="lineIndex">
      <div class="word" v-for="(word, wordIndex) in lineWords" :key="wordIndex">
        <span class="item" v-for="(char, charIndex) in word" :key="charIndex" :data-is-animating="false">
          {{ char }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* 全局动画定义（不使用 scoped，以便内联样式可以引用） */
@keyframes swing {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(var(--swing-angle));
  }

  75% {
    transform: rotate(calc(var(--swing-angle) * -1));
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>

<style scoped lang="scss">
.colorful-text-container {
  font-size: var(--font-size);
  color: var(--base-color);
  font-weight: var(--font-weight);
  font-family: var(--font-family);
  padding: var(--container-padding) 20px;
}

.line {
  display: flex;
  justify-content: var(--line-align);
  gap: var(--word-spacing);
  margin-bottom: var(--line-spacing);

  &:last-child {
    margin-bottom: 0;
  }
}

.word {
  display: flex;
  letter-spacing: var(--letter-spacing);
}

.item {
  display: inline-block;
  transform-origin: bottom center;
  transition: color 0s;
  cursor: pointer;
  user-select: none;
}
</style>
