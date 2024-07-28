<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import useEditor from '@/composables/useEditor'
import VariablesControl from '@/components/VariablesControl.vue'

useEditor('container')
</script>

<template>
  <PageHeader />
  <main class="flex flex-wrap justify-center gap-5 my-5">
    <div
      id="container"
      class="h-96 w-screen md:w-[43rem]"
    />
    <VariablesControl />
  </main>
  <PageFooter />
</template>
