<template>
  <div class="grid grid-cols-12">


    <div class="col-start-1 col-span-12 mb-6">
      <router-link to="/">
        <img src="https://www.adoorei.com.br/wp-content/uploads/2022/03/LOGO-ADOREI.svg" alt="Logo da Adoorei">
      </router-link>
    </div>



    <div class="col-start-1 col-span-6 flex flex-row flex-nowrap" v-if="!loading">
      <router-link
          class="mr-3"
          v-for="(category, index) in categories"
          :key="index"
          :to="`/category/${category}`"
      >
        {{category}}
      </router-link>

    </div>

    <div class="col-end-12 col-span-1">
      <input type="text" name="asd" class="focus-visible:outline-0 w-44 px-3 pt-2 pb-1 bg-cyan-100 rounded shadow-xl shadow-cyan-500/50">
    </div>

    <div class="col-end-13 col-span-1 flex flex-row flex-nowrap justify-end">
      <router-link class="text-cyan-400 hover:bg-cyan-100" to="/cart">Carrinho</router-link>
    </div>

  </div>
</template>

<script setup lang="ts">

import {getCategories} from "@/repository/ShowcaseService";
import {nextTick, onMounted, ref, Ref} from "vue";
import router from "@/router";
import CategoryFilter from "@/views/CategoryFilter.vue";

let categories: Array<string>
let loading: Ref<boolean> = ref(false)

onMounted(async () => {
  try {
    loading.value = true

    categories = await getCategories()
    categories.forEach(category=>{
      router.addRoute({ path: `/category/${category}`, component: CategoryFilter })
    })

    await nextTick()
    loading.value = false

  } catch (error) {
    loading.value = false

  }
})
</script>

<style scoped>

</style>
