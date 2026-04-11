<template>
  <PageHeader />
  <UMain>
    <UContainer>
      <div class="flex flex-col gap-5 my-5">
        <div class="flex gap-5 justify-center">
          <EditorContainer />
          <VariablesControl />
        </div>
        <TemplateResult />
      </div>
    </UContainer>
  </UMain>
  <PageFooter />
</template>
