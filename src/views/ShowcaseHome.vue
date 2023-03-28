<template>
  <div class="max-w-[1249px] pt-14 grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mx-auto" v-if="!loading">
    <div v-for="(product, index) in products" :key="index">
      <card-product :product="product"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {getAllProducts} from "@/repository/ShowcaseService";
import {nextTick, onMounted, ref, Ref} from "vue";
import type {IProduct} from "@/interfaces/IProduct";
import CardProduct from "@/components/CardProduct.vue";

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