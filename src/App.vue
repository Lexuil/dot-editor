<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type HighlighterGeneric
} from 'shiki/bundle/web'
import dotLang from '@/lib/dot.tmLanguage.json'

const code = ref(`Hola {{=it.name}}, como está todo en {{=it.city}}.

Estas son las categorías
{{~ it.categories :c}}
- {{=c.name}}
{{~}}

Es cierto
{{? it.name == "juan"}}Sí{{??}}No{{?}}`)
const html = ref('')
const highlighter = ref<HighlighterGeneric<BundledLanguage, BundledTheme> | null>(null)

onMounted(async () => {
  highlighter.value = await createHighlighter({
    langs: [dotLang as any],
    themes: ['andromeeda']
  })

  html.value = highlighter.value.codeToHtml(code.value, {
    lang: 'dot',
    theme: 'andromeeda'
  })
})

watch(code, async () => {
  if (highlighter.value === null) return
  html.value = highlighter.value.codeToHtml(code.value, {
    lang: 'dot',
    theme: 'andromeeda'
  })
})
</script>

<template>
  <main class="flex flex-col gap-5 items-center justify-center bg-black min-h-screen">
    <h1 class="text-4xl font-bold text-white">
      doT.js Editor
    </h1>

    <textarea
      id="editor"
      v-model="code"
      name="editor"
      cols="39"
      rows="10"
      class="bg-gray-800 text-white p-2 mt-4"
    />

    <div
      class="max-w-3xl"
      v-html="html"
    />
  </main>
</template>
