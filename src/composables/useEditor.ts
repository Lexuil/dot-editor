import { onMounted, onUnmounted, reactive, type Ref, ref, shallowRef, watch } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import dotLang from '@/lib/dot.tmLanguage.json'
import useGetVariables from './useGetVariables'
import dot from 'dot'
dot.templateSettings.strip = false
import { useColorMode } from '@vueuse/core'

const editorRef = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)
const variables = reactive<Record<string, string>>({})
const textResult = ref('')
const { getVariables } = useGetVariables()
let initialized = false
let isInitializingEditor = false
let contentChangeDebounce: ReturnType<typeof setTimeout> | null = null

export default function useEditor(editorId?: string): {
  editor: monaco.editor.IStandaloneCodeEditor | null
  variables: Record<string, string>
  textResult: Ref<string>
  getEditorText: () => string
  getEditorVariables: () => Promise<void>
  setEditorTheme: (theme: 'andromeeda' | 'min-light') => void
} {
  if (!initialized) {
    watch(
      variables,
      (newVal) => {
        const content = getEditorText()
        if (!content) {
          textResult.value = ''
          return
        }

        try {
          const template = dot.template(content)
          textResult.value = template(newVal)
        } catch (error) {
          console.error('Failed to render doT template:', error)
          textResult.value = ''
        }
      },
      { deep: true }
    )

    initialized = true
  }

  // Theme handling -----------------------------------------------------------
  const colorMode = useColorMode()

  watch(
    colorMode,
    (newMode) => {
      if (newMode === 'dark') {
        setEditorTheme('andromeeda')
      } else {
        setEditorTheme('min-light')
      }
    },
    { immediate: true }
  )

  // ---------------------------------------------------------------------------
  // Lifecycle
  onMounted(async () => {
    if (editorId === undefined || editorRef.value !== null || isInitializingEditor) return

    isInitializingEditor = true

    try {
      const highlighter = await createHighlighter({
        langs: [dotLang as any],
        themes: ['andromeeda', 'min-light']
      })

      monaco.languages.register({ id: 'dot' })

      shikiToMonaco(highlighter, monaco)

      const container = document.getElementById(editorId)
      if (container === null) {
        return
      }
      const editor = monaco.editor.create(container, {
        value: `Hi {{=it.name}}, how is everything in {{=it.city}}?

These are the categories
{{~ it.categories :c}}
- {{=c}}{{~}}

Is it true
{{? it.condition == "yes"}}Yes{{??}}No{{?}}`,
        language: 'dot',
        theme: 'andromeeda',
        lineNumbers: 'off',
        padding: {
          top: 20,
          bottom: 10
        },
        rulers: [80],
        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 80,
        minimap: {
          enabled: false
        }
      })

      editorRef.value = editor

      editor.onDidChangeModelContent(() => {
        if (contentChangeDebounce !== null) {
          clearTimeout(contentChangeDebounce)
        }

        contentChangeDebounce = setTimeout(() => {
          void getEditorVariables()
        }, 120)
      })

      await getEditorVariables()
    } catch (error) {
      console.error('Failed to initialize editor:', error)
    } finally {
      isInitializingEditor = false
    }
  })

  onUnmounted(() => {
    if (editorId === undefined) return

    if (contentChangeDebounce !== null) {
      clearTimeout(contentChangeDebounce)
      contentChangeDebounce = null
    }

    editorRef.value?.dispose()
    editorRef.value = null
    textResult.value = ''
  })

  // ---------------------------------------------------------------------------
  // Methods
  function getEditorText(): string {
    const editor = editorRef.value
    if (editor === null) {
      return ''
    }

    return editor.getValue()
  }

  async function getEditorVariables(): Promise<void> {
    const content = getEditorText()

    const newVariables = getVariables(content ?? '').reduce<Record<string, string>>((acc, curr) => {
      acc[curr] = ''
      return acc
    }, {})

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    Object.keys(variables).forEach((key) => delete variables[key])

    Object.keys(newVariables).forEach((key) => {
      variables[key] = newVariables[key]
    })
  }

  function setEditorTheme(theme: 'andromeeda' | 'min-light'): void {
    if (editorRef.value === null) {
      return
    }

    monaco.editor.setTheme(theme)
  }

  // ---------------------------------------------------------------------------
  return {
    editor: editorRef.value,
    variables,
    textResult,
    getEditorText,
    getEditorVariables,
    setEditorTheme
  }
}
