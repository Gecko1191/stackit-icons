<script setup lang="ts">
import { RouterView } from 'vue-router'
import { OnyxAppLayout } from 'sit-onyx'
</script>

<template>
  <OnyxAppLayout>
    <template v-slot:default>
      <div class="defaultContent">
        <RouterView />
      </div>
    </template>
  </OnyxAppLayout>
</template>

<style></style>
