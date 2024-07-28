<script setup lang="ts">
import { ref, watch } from 'vue'
import useEditor from '@/composables/useEditor'
import dot from 'dot'
dot.templateSettings.strip = false

const textResult = ref('')
const { variables, getEditorText } = useEditor()

watch(variables, (newVal) => {
  const template = dot.template(getEditorText())
  textResult.value = template(newVal)
})
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
