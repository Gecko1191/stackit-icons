<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Icon } from '@/components/IconLoader/types.ts'
import { OnyxIconButton, OnyxButton, OnyxIcon, useToast, OnyxToast } from 'sit-onyx'
import IconLoader from '@/components/IconLoader/IconLoader.vue'
import { titleCase } from 'title-case'
import clipboard from '@sit-onyx/icons/copy.svg?raw'
import xIcon from '@sit-onyx/icons/x.svg?raw'
import download from '@sit-onyx/icons/download.svg?raw'

const selectedIcon = defineModel<Icon | null>()

const props = defineProps<{
  iconModules: Record<string, () => Promise<{ default: string }>>
}>()

const toast = useToast()

const downloadSVG = async () => {
  if (!selectedIcon.value) return

  try {
    const iconModule =
      await props.iconModules[`../icon-library/assets/${selectedIcon.value.path}`]()
    const svgContent = decodeURIComponent(
      (iconModule.default as string).replace(/^data:image\/svg\+xml,/, ''),
    )
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = `${selectedIcon.value.name}.svg`
    a.click()

    // Cleanup
    URL.revokeObjectURL(url)
  } catch (error) {
    toast.show({ headline: 'Error downloading SVG', color: 'danger' })
    console.error('Error downloading SVG:', error)
  }
}

const beautifyName = (name: string) => titleCase(name).replace(/-/g, ' ')

const copyName = (name: string) => {
  navigator.clipboard.writeText(name)
  toast.show({ headline: 'Copied to Clipboard', color: 'success' })
}
const closeSidebar = () => {
  selectedIcon.value = null
}
</script>

<template>
  <div data-testid="iconSidebar" v-if="selectedIcon" class="container">
    <OnyxIconButton
      data-testid="closeBtn"
      label="close button"
      class="closeBtn"
      :icon="xIcon"
      @click="closeSidebar"
      color="neutral"
    />
    <div class="iconPreview">
      <IconLoader class="icon" :iconModules="iconModules" :icon="selectedIcon" />
    </div>
    <div class="innerContainer">
      <div class="displayName">{{ beautifyName(selectedIcon.name) }}</div>
      <div class="label">{{ selectedIcon.category }}</div>
    </div>
    <div class="innerContainer">
      <div class="text">Keywords</div>
      <div class="label">{{ selectedIcon.keywords.join(', ') }}</div>
    </div>
    <div class="innerContainer">
      <div class="text">Name</div>
      <div class="nameContainer">
        <div class="label">{{ selectedIcon.name }}</div>
        <OnyxIcon
          data-testid="copyNameBtn"
          class="copyBtn"
          color="neutral"
          @click="copyName(selectedIcon.name)"
          :icon="clipboard"
        />
      </div>
    </div>
    <OnyxButton
      data-testid="downloadBtn"
      :icon="download"
      @click="downloadSVG"
      class="downloadBtn"
      label="Download SVG"
    />
    <OnyxToast />
  </div>
</template>

<style scoped>
.closeBtn {
  margin-left: auto;
}
.container {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 90vw;
  height: 98vh;
  background-color: #fff;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: var(--onyx-spacing-md);
  z-index: 100;
  border-radius: var(--onyx-radius-sm);
  margin: var(--onyx-spacing-md);
  gap: var(--onyx-spacing-md);
}

.iconPreview {
  width: 100%;
  background-color: var(--onyx-color-steel-200);
  padding: var(--onyx-spacing-xl);
  border-radius: var(--onyx-spacing-2xs);
  display: flex;
  justify-content: center;
  align-items: center;
}

.innerContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: var(--onyx-spacing-4xs);
}

.nameContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  width: 6rem;
  height: 6rem;
}

.displayName {
  font-size: 1.6rem;
  font-weight: bold;
}

.text {
  font-size: 1rem;
  font-weight: bold;
}

.label {
  font-size: 1rem;
  color: #777;
}

.copyBtn {
  cursor: pointer;
  height: 1rem;
  width: 1rem;
}

.downloadBtn {
  margin-top: auto;
  width: 100%;
  padding: var(--onyx-spacing-md);
  font-size: 1rem;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: var(--onyx-radius-sm);
  transition: background-color 0.3s ease;
}
</style>
