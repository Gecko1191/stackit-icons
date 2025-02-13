<script setup lang="ts">
import { ref, watchEffect, defineProps, computed } from 'vue'
import type { Icon } from '@/components/IconLoader/types.ts'

const props = defineProps<{
  icon: Icon
  class?: string
  iconModules: Record<string, () => Promise<{ default: string }>>
}>()

const icon = computed(() => props.icon)

const SvgComponent = ref<string | null>(null)

watchEffect(() => {
  SvgComponent.value = null

  const moduleLoader = props.iconModules[`../icon-library/assets/${icon.value.path}`]

  if (!moduleLoader) {
    console.warn(`Icon not found: ${icon.value.path}`)
    return
  }

  moduleLoader()
    .then((module: { default: string }) => {
      SvgComponent.value = module?.default
    })
    .catch((error: string) => {
      console.error(`Error loading icon: ${props.icon.name}`, error)
    })
})
</script>

<template>
  <img
    :data-testid="icon.name"
    v-if="SvgComponent"
    :class="props.class"
    :src="SvgComponent"
    :alt="icon.name"
  />
</template>
