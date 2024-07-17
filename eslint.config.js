import pluginVue from 'eslint-plugin-vue'
import standard from 'eslint-config-standard'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginImport from 'eslint-plugin-import'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise
    },
    rules: standard.rules
  }
]
