<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import dotLang from '@/lib/dot.tmLanguage.json'

const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)

onMounted(async () => {
  const highlighter = await createHighlighter({
    langs: [dotLang as any],
    themes: ['andromeeda']
  })

  monaco.languages.register({ id: 'dot' })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  shikiToMonaco(highlighter, monaco)

  const container = document.getElementById('container')
  if (container === null) {
    return
  }
  editor.value = monaco.editor.create(container, {
    value: `Hola {{=it.name}}, como está todo en {{=it.city}}.

Estas son las categorías
{{~ it.categories :c}}
- {{=c.name}}
{{~}}

Es cierto
{{? it.name == "juan"}}Sí{{??}}No{{?}}`,
    language: 'dot',
    theme: 'andromeeda',
    lineNumbers: 'off',
    padding: {
      top: 30,
      bottom: 10
    },
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 80,
    minimap: {
      enabled: false
    }
  })
})
</script>

<template>
  <main class="flex flex-col gap-5 items-center justify-center bg-black min-h-screen">
    <h1 class="text-4xl font-bold text-white">
      doT.js Editor
    </h1>

    <div
      id="container"
      class="h-96 w-[43rem]"
    />
  </main>
</template>
