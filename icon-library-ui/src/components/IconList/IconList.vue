<script setup lang="ts">
import { defineProps } from 'vue'
import type { Icon } from '@/components/IconLoader/types.ts'
import IconLoader from '@/components/IconLoader/IconLoader.vue'

const selectedIcon = defineModel<Icon | null>()

const props = defineProps<{
  iconModules: Record<string, () => Promise<{ default: string }>>
  icons: Icon[]
}>()

const handleClick = (icon: Icon) => {
  selectedIcon.value = selectedIcon?.value?.name === icon?.name ? null : icon
}
</script>

<template>
  <div class="iconsGrid">
    <div
      :data-testid="`iconCard-${icon.name}`"
      v-for="icon in icons"
      :key="icon.name"
      class="iconCard"
      :class="{ selectedIcon: selectedIcon?.name === icon.name }"
      @click="handleClick(icon)"
    >
      <IconLoader class="iconSmall" :iconModules="iconModules" :icon="icon" />
      <div>{{ icon.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.iconsGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
}

.iconCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 8rem;
  padding: 0.75rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 0.5rem;
  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);
  }
}

.selectedIcon {
  border: 3px solid var(--onyx-color-base-primary-600);
}

.iconSmall {
  width: 2rem;
  height: 2rem;
}
</style>
