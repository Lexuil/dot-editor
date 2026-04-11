<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'doT.js',
    to: 'https://olado.github.io/doT/index.html',
    external: true,
    target: '_blank'
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <span class="font-bold">doT.js Editor</span>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/Lexuil/dot-editor"
          target="_blank"
          icon="simple-icons:github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>
