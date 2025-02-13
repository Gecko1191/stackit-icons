<script setup lang="ts">
import { OnyxInput } from 'sit-onyx'

const search = defineModel<string>()

const handleSearch = (event: Event) => {
  search.value = (event?.target as HTMLInputElement)?.value
}
</script>

<template>
  <OnyxInput
    data-testid="searchInput"
    label="search"
    hideLabel
    class="search"
    placeholder="Search icons..."
    type="search"
    @input="handleSearch"
  />
</template>

<style scoped>
.search {
  width: 100%;
  margin-bottom: var(--onyx-spacing-lg);
  font-size: 1rem;
}
</style>
