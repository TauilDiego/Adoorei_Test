<template>
  <nav class="TopNavigation">
    <NavBar/>
  </nav>

  <main class="MainContent">
    <RouterView/>
  </main>

  <footer class="bg-gray-200">
    <!-- ... -->
  </footer>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";

</script>


<style scoped>
.TopNavigation{
  width: calc(100vw - 4rem);
  height: 100px;
}
.MainContent{
  margin-top: 100px;
}
</style>
