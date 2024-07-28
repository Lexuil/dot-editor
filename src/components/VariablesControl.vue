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
    <table class="w-full">
      <thead>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, key) in variables"
          :key="key"
        >
          <td>{{ key }}</td>
          <td>
            <input
              v-model="variables[key]"
              type="text"
              class="w-full text-black"
              placeholder="Enter value"
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
