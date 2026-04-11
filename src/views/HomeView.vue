<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AsyncEditorContainer = defineAsyncComponent(() => import('@/components/EditorContainer.vue'))
</script>

<template>
  <PageHeader />
  <UMain>
    <UContainer>
      <div class="flex flex-col gap-5 my-5">
        <div class="flex gap-5 justify-center">
          <Suspense>
            <AsyncEditorContainer />
            <template #fallback>
              <div
                class="h-96 w-screen rounded-lg border border-default bg-elevated animate-pulse"
              />
            </template>
          </Suspense>
          <VariablesControl />
        </div>
        <TemplateResult />
      </div>
    </UContainer>
  </UMain>
  <PageFooter />
</template>
