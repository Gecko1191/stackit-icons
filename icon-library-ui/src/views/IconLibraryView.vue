<script setup lang="ts">
import iconMetadataList from '@stackit/icons'
import { groupIconsByCategory } from '@stackit/icons/assets/utils.ts'

import { computed, ref } from 'vue'
import type { Icon } from '@/components/IconLoader/types.ts'
import IconSidebar from '@/components/IconSidebar/IconSidebar.vue'
import SearchInput from '@/components/SearchInput/SearchInput.vue'
import IconList from '@/components/IconList/IconList.vue'

const iconModules = import.meta.glob('@stackit/icons/assets/icons/**/*.svg') as Record<
  string,
  () => Promise<{ default: string }>
>
const search = ref<string>('')
const selectedIcon = ref<Icon | null>(null)

//make sure to search in all properties for better results
const filteredIconsByCategory = computed(() => {
  return groupIconsByCategory(
    iconMetadataList.icons.filter((icon: Icon) => {
      return (
        icon.name.toLowerCase().includes(search.value.toLowerCase()) ||
        icon.category.toLowerCase().includes(search.value.toLowerCase()) ||
        icon.keywords.some((keyword) => keyword.toLowerCase().includes(search.value.toLowerCase()))
      )
    }),
  )
})
</script>

<template>
  <div class="container">
    <div class="header-text">Icon Library</div>
    <SearchInput v-model="search" />
    <div v-for="(icons, categoryName) in filteredIconsByCategory" :key="categoryName">
      <div class="category-title">{{ categoryName }}</div>
      <IconList :icons="icons" :iconModules="iconModules" v-model="selectedIcon" />
    </div>
    <IconSidebar :iconModules="iconModules" v-model="selectedIcon" />
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 80%;
  margin: auto;
  padding: 2rem;
}

.category-title {
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 0.1rem solid #ddd;
  padding-bottom: 0.5rem;
}

.header-text {
  text-align: left;
  max-width: 80%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>
