import { type Ref, ref } from 'vue'

export default function useGetVariables (): {
  getVariables: (template: string) => string[]
  variables: Ref<string[]>
} {
  const regexExpressions = /\{\{.*?\}\}/gs
  const regexVariables = /it\.([a-zA-Z_]\w*)/g
  const variables = ref<string[]>([])

  function getVariables (template: string): string[] {
    const expressions = template.match(regexExpressions) ?? []

    const allVariables: string[] = []

    expressions.forEach(expression => {
      const matches = [...expression.matchAll(regexVariables)]
      const variables = matches.map(match => match[1])
      allVariables.push(...variables)
    })

    variables.value = [...new Set(allVariables)]
    return variables.value
  }

  return {
    getVariables,
    variables
  }
}
