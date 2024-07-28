<script setup lang="ts">
import useEditor from '@/composables/useEditor'
import dot from 'dot'
dot.templateSettings.strip = false

const { textResult } = useEditor()
</script>

<template>
  <section class="flex flex-col items-center gap-3">
    <h2 class="text-xl font-semibold">
      Template Result
    </h2>
    <p class="w-full md:w-[43rem] whitespace-pre-wrap border border-gray-600 p-5">
      {{ textResult }}
    </p>
  </section>
</template>
