<script setup lang="ts">
import useEditor from '@/composables/useEditor'
import dot from 'dot'
dot.templateSettings.strip = false

const { textResult } = useEditor()
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold">
      Template Result
    </h2>
    <p class="max-w-md whitespace-pre-wrap">
      {{ textResult }}
    </p>
  </section>
</template>
