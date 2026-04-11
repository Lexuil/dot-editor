import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'none'
  },
  staged: {
    '*': 'vp check --fix'
  },
  lint: {
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue'],
    env: {
      browser: true
    },
    categories: {
      correctness: 'error'
    },
    options: { typeAware: true, typeCheck: true }
  },
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'sky',
          neutral: 'mist'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
