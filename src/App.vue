<template>
  <nav class="TopNavigation">
    <NavBar/>
  </nav>

  <main class="bg-gray-100 mt-5 pt-10">
    <RouterView/>
  </main>

  <footer class="bg-gray-50">
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
  height: 150px;
  padding: 2rem;
}
</style>
