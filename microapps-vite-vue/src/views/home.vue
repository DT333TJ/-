<script setup lang="ts">
  import { ref } from 'vue'

  // defineProps < { msg: string } > ()

  const count = ref(0)
</script>

<template>
  <div class="p-home">This is a page for Home</div>
  <router-link to="/demo" class="p-home">Go to Demo</router-link>
</template>

<style lang="scss" scoped>
.p-home {
  color: pink
}
</style>
