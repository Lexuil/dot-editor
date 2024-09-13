<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import useEditor from '@/composables/useEditor'
import dot from 'dot'
dot.templateSettings.strip = false

const { textResult } = useEditor()
</script>

<template>
  <section class="flex justify-center w-full p-3">
    <Card class="max-w-full w-[38rem]">
      <CardHeader>
        <CardTitle>Template Result</CardTitle>
        <CardDescription>Result of the template with the variables</CardDescription>
      </CardHeader>
      <CardContent class="whitespace-pre-wrap">
        {{ textResult }}
      </CardContent>
    </Card>
  </section>
</template>
