<script setup lang="ts">
import { ref, watch } from 'vue'

const editor = ref('')
const variables = ref<string[]>([])

const evaluateRegex = /\{\{([\s\S]+?)\}\}/g

watch(editor, (text) => {
  variables.value = [
    ...text.matchAll(evaluateRegex)
  ].map(match => match[1].slice(4))
})
</script>

<template>
  <main class="flex flex-col gap-5 items-center justify-center bg-black min-h-screen">
    <h1 class="text-4xl font-bold text-white">
      doT.js Editor
    </h1>

    <textarea
      id="editor"
      v-model="editor"
      name="editor"
      cols="39"
      rows="10"
      class="bg-gray-800 text-white p-2 mt-4"
    />

    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold text-white">
        Variables
      </h2>

      <ul class="flex flex-col gap-1">
        <li
          v-for="variable in variables"
          :key="variable"
          class="text-white"
        >
          {{ variable }}
        </li>
      </ul>
    </div>
  </main>
</template>
