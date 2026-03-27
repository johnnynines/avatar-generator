<template>
  <img
    :src="avatarSrc"
    :alt="altText"
    :width="size"
    :height="size"
    style="display: block; border-radius: 4px;"
  />
</template>

<script setup>
import { computed } from 'vue'
import { generateAvatar } from '../lib/avatarGenerator'

const props = defineProps({
  persona: {
    type: Object,
    default: null
  },
  size: {
    type: Number,
    default: 100
  }
})

const avatarSrc = computed(() => generateAvatar(props.persona, props.size))

const altText = computed(() => {
  if (!props.persona?.name) return 'Generated avatar'
  return `Avatar for ${props.persona.name}`
})
</script>
