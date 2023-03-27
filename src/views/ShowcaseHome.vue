<template>
  <div class="pt-14 grid lg:grid-cols-4 mx-auto" v-if="!loading">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="w-96 flex flex-col rounded-2xl shadow-lg shadow-gray-600 mb-10  items-center "
      style="height: 550px"
    >
      <div class="w-fit">

        <div class="w-60 content-center grid place-content-center" style="height: 430px; align-content: center">
          <img
            :src="product.image"
            :alt="product.title"
            style="width: 100%"
          >
        </div>
      </div>

      <div class="flex-row">
        <p class="w-60 min-h-fit flex-wrap leading-tight">{{ product.title }}</p>
        <p class="w-60 h-6 overflow-ellipsis">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {getAllProducts} from "@/repository/ShowcaseService";
import {nextTick, onMounted, ref, Ref} from "vue";
import type {IProduct} from "@/interfaces/IProduct";

let products: Array<IProduct>
let loading: Ref<boolean> = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    products = await getAllProducts()

    await nextTick()
    loading.value = false

  } catch (error) {
    console.log(error)
  }
})

</script>

<style scoped>

</style>