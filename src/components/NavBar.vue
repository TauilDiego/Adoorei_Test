<template>
  <div class="grid grid-cols-12">

    <div class="col-start-1 col-span-12 mb-6">
      <router-link to="/">
        <img src="https://www.adoorei.com.br/wp-content/uploads/2022/03/LOGO-ADOREI.svg" alt="Logo da Adoorei">
      </router-link>
    </div>

    <div class="col-start-1 col-span-6 flex flex-row flex-nowrap" v-if="!loading">
      <router-link
        class="mr-3 whitespace-nowrap"
        v-for="(category, index) in categories"
        :key="index"
        :to="`/category/${category}`"
      >
        {{ category }}
      </router-link>
    </div>

    <div class="col-end-13 col-span-3 flex flex-row flex-nowrap justify-end">
      <i class="fa-solid fa-magnifying-glass"></i>
      <div class="grid">
        <div class="place-content-center flex">
          <font-awesome-icon class="my-auto mr-2" icon="fa-solid fa-magnifying-glass"/>
          <input
            type="text"
            name="asd"
            class="focus-visible:outline-0 w-44 px-3 pt-2 pb-1 bg-cyan-100 rounded shadow-lg shadow-cyan-500/50"
            v-model="search"
          >
        </div>
        <div v-if="productFilter.length>0"
             class="dropdown-content absolute ml-[22px] my-[35px] bg-gray-400 min-w[150px] shadow w-64">
          <div v-for="(product,index) in productFilter" :key="index" class="flex max-h-8 overflow-hidden flex-nowrap">
            <div class="max-w-[20px] my-auto mr-2">
              <img :src="product.image" :alt="product.title">
            </div>
            <router-link :to="`/product/${product.id}`" @click="resetSearch" class="text-[18px]">{{ product.title }}</router-link>
          </div>
        </div>

      </div>
      <router-link class="text-black ml-2" to="/cart">
        <font-awesome-icon class="my-auto" icon="fa-solid fa-cart-shopping"/>
      </router-link>
    </div>

  </div>
</template>

<script setup lang="ts">

import {getCategories} from "@/repository/CategoryService";
import {nextTick, onMounted, ref, Ref, watch} from "vue";
import type {IProduct} from "@/interfaces/IProduct";
import {getAllProducts} from "@/repository/ShowcaseService";

let categories: Array<string>
let loading: Ref<boolean> = ref(false)

let products: IProduct[] = []

onMounted(async () => {
  try {
    loading.value = true

    categories = await getCategories()

    await nextTick()
    loading.value = false
    products = await getAllProducts()


  } catch (error) {
    loading.value = false

  }
})

let search: Ref<string> = ref('')
let productFilter: Ref<IProduct[]> = ref([])

watch(search, newValue => {
  productFilter.value = newValue === '' ? [] : products.filter((product: IProduct) => product.title.match(newValue))
})

function resetSearch() {
  productFilter.value = []
}
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>
