<script setup lang="ts">
  import { ref } from 'vue'

  // defineProps < { msg: string } > ()

  const count = ref(0)
</script>

<template>
  <div class="p-demo">This is a page for Demo</div>
  <router-link to="/" class="p-demo">Go to Home</router-link>
</template>

<style lang="scss" scoped>
.p-demo {
  color: green;
}
</style>
