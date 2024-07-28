<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import EditorContainer from '@/components/EditorContainer.vue'
import VariablesControl from '@/components/VariablesControl.vue'
import TemplateResult from '@/components/TemplateResult.vue'
</script>

<template>
  <PageHeader />
  <main>
    <div class="flex flex-wrap justify-center gap-5 my-5">
      <EditorContainer />
      <VariablesControl />
    </div>
    <TemplateResult />
  </main>
  <PageFooter />
</template>
