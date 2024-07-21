import { onMounted } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import dotLang from '@/lib/dot.tmLanguage.json'

export default function useEditor (editorId: string): {
  editor: monaco.editor.IStandaloneCodeEditor | null
  getEditorValue: () => string
} {
  let editor: monaco.editor.IStandaloneCodeEditor | null = null

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
    editor = monaco.editor.create(container, {
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
      rulers: [80],
      wordWrap: 'wordWrapColumn',
      wordWrapColumn: 80,
      minimap: {
        enabled: false
      }
    })
  })

  function getEditorValue (): string {
    if (editor === null) {
      return ''
    }
    return editor.getValue()
  }

  return {
    editor,
    getEditorValue
  }
}
