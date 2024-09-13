<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useEditor from '@/composables/useEditor'
import { watch } from 'vue'

const mode = useColorMode()
const { setEditorTheme } = useEditor()

watch(() => mode.value, (value) => {
  setEditorTheme(value === 'dark' ? 'andromeeda' : 'min-light')
})
</script>

<template>
  <div class="absolute top-0 right-0 mt-5 mr-5">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          <Moon
            v-if="mode === 'dark'"
            class="h-5 w-5"
          />
          <Sun
            v-if="mode === 'light'"
            class="h-5 w-5"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="mode = 'light'">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem @click="mode = 'dark'">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem @click="mode = 'auto'">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
