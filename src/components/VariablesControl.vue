<script setup lang="ts">
import useEditor from '@/composables/useEditor'

const { getEditorVariables, variables } = useEditor()
</script>

<template>
  <section class="border border-gray-600 p-3 min-w-72 w-fit h-96">
    <button
      class="bg-blue-800 text-white px-4 py-2 rounded-md mb-3 mx-auto"
      @click="getEditorVariables"
    >
      Get Template Variables
    </button>
    <ul class="h-72 overflow-y-auto">
      <li
        v-for="variable in variables"
        :key="variable"
      >
        {{ variable }}
      </li>
    </ul>
  </section>
</template>
