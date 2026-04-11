<script setup lang="ts">
import useEditor from '@/composables/useEditor'
const { variables } = useEditor()
</script>

<template>
  <UCard class="w-full h-full md:w-80 md:h-96 flex-none">
    <template #header>
      <p>Variables</p>
      <p>Define your template variables</p>
    </template>

    <table class="w-full">
      <thead>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, key) in variables" :key="key">
          <td class="px-1 py-2">
            {{ key }}
          </td>
          <td class="px-1 py-2">
            <UInput v-model="variables[key]" placeholder="Enter value" />
          </td>
        </tr>
      </tbody>
    </table>
  </UCard>
</template>
