import { onMounted, type Ref, ref } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import dotLang from '@/lib/dot.tmLanguage.json'

export function useEditor (editorId: string): {
  editor: Ref<monaco.editor.IStandaloneCodeEditor | null>
} {
  const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)

  onMounted(async () => {
    const highlighter = await createHighlighter({
      langs: [dotLang as any],
      themes: ['andromeeda']
    })

    monaco.languages.register({ id: 'dot' })

    shikiToMonaco(highlighter, monaco)

    const container = document.getElementById(editorId)
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

  return {
    editor
  }
}
