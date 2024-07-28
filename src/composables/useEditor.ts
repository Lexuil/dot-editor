import { onMounted, type Ref, ref } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import dotLang from '@/lib/dot.tmLanguage.json'
import useGetVariables from './useGetVariables'

let editor: monaco.editor.IStandaloneCodeEditor | null = null

export default function useEditor (editorId?: string | undefined): {
  editor: monaco.editor.IStandaloneCodeEditor | null
  variables: Ref<string[]>
  getEditorText: () => string
  getEditorVariables: () => Promise<void>
} {
  const variables = ref<string[]>([])
  const { getVariables } = useGetVariables()

  onMounted(async () => {
    if (editorId === undefined) return

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
      value: `Hi {{=it.name}}, how is everything in {{=it.city}}?

These are the categories
{{~ it.categories :c}}
- {{=c.name}}
{{~}}

Is it true
{{? it.condition == "yes"}}Yes{{??}}No{{?}}`,
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

  function getEditorText (): string {
    if (editor === null) {
      return ''
    }
    return editor.getValue()
  }

  async function getEditorVariables (): Promise<void> {
    const content = getEditorText()
    variables.value = getVariables(content ?? '')
  }

  return {
    editor,
    variables,
    getEditorText,
    getEditorVariables
  }
}
