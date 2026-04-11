<script setup lang="ts">
import useEditor from '@/composables/useEditor'

const { textResult } = useEditor()
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <p>Template Result</p>
      <p>Result of the template with the variables</p>
    </template>
    <div class="whitespace-pre-wrap">
      {{ textResult }}
    </div>
  </UCard>
</template>
