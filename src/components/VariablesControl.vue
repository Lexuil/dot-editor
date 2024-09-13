<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Input from '@/components/ui/input/Input.vue'
import useEditor from '@/composables/useEditor'
const { variables } = useEditor()
</script>

<template>
  <section class="flex flex-col items-center gap-3 w-full md:w-80 md:h-96">
    <Card>
      <CardHeader>
        <CardTitle>Variables</CardTitle>
        <CardDescription>Define your template variables</CardDescription>
      </CardHeader>
      <CardContent>
        <table class="w-full">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(_, key) in variables"
              :key="key"
            >
              <td class="px-1 py-2">
                {{ key }}
              </td>
              <td class="px-1 py-2">
                <Input
                  v-model="variables[key]"
                  placeholder="Enter value"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </section>
</template>
