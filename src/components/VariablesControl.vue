<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import useEditor from '@/composables/useEditor'
const { variables } = useEditor()
</script>

<template>
  <section class="flex flex-col items-center gap-3 w-full md:w-80 md:h-96">
    <h2 class="text-xl font-semibold text-center">
      Variables
    </h2>
    <div class="border border-gray-600 w-full p-3">
      <table class="w-full">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(_, key) in variables"
            :key="key"
          >
            <td class="px-1 py-2">
              {{ key }}
            </td>
            <td class="px-1 py-2">
              <Input
                v-model="variables[key]"
                placeholder="Enter value"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
