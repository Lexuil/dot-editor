<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import useEditor from './composables/useEditor'
import useGetVariables from './composables/useGetVariables'

const { getEditorValue } = useEditor('container')
const { getVariables } = useGetVariables()

const variables = ref<string[]>([])

async function getEditorContent (): Promise<void> {
  const content = getEditorValue()
  variables.value = getVariables(content ?? '')
}
</script>

<template>
  <PageHeader />
  <main class="flex flex-wrap justify-center gap-5 my-5">
    <div
      id="container"
      class="h-96 w-screen md:w-[43rem]"
    />
    <section class="border border-gray-600 p-3 min-w-72 w-fit h-96">
      <button
        class="bg-blue-800 text-white px-4 py-2 rounded-md mb-3"
        @click="getEditorContent"
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
  </main>
  <PageFooter />
</template>
