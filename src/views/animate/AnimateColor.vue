<script setup lang="ts">
import { ref, reactive } from 'vue';
import AnimateColor from '@/components/AnimateColor/index.vue';
</script>

<template>
  <!-- 使用默认配置 -->
  <AnimateColor />
  <AnimateColor theme="vibrant" />
  <AnimateColor theme="soft" />
  <AnimateColor theme="cool" />
  <AnimateColor theme="warm" />
  <AnimateColor theme="natural" />
  <AnimateColor theme="theme1" />
  <AnimateColor theme="theme2"/>
  <AnimateColor theme="theme3"/>
  <AnimateColor theme="theme4"/>
  <AnimateColor theme="theme5"/>
  <AnimateColor theme="theme6"/>
  <AnimateColor theme="theme7"/>

  <!-- 自定义配置 -->
  <AnimateColor
    :text="[['Hello', 'World'], ['Vue3!']]"
    :fontSize="100"
    :fontWeight="900"
    fontFamily="'Comic Sans MS', cursive"
    baseColor="#999"
    :themeColors="['#ff0000', '#00ff00', '#0000ff']"
    :swingDuration="800"
    :colorDuration="2000"
    :swingAngle="15"
  />
</template>

<style scoped lang="scss">

</style>