<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import { useEditor } from './composables/useEditor'

useEditor('container')
</script>

<template>
  <PageHeader />
  <main class="my-5">
    <div
      id="container"
      class="h-96 w-screen md:w-[43rem]"
    />
  </main>
  <PageFooter />
</template>
