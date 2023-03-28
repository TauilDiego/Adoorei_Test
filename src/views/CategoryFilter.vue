<template>
  <div class="pt-14 grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mx-auto" v-if="!loading">
    <div v-for="(product, index) in products" :key="index">
      <card-product :product="product"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {nextTick, onMounted, onUpdated, ref, Ref, watch} from "vue";
import {getInCategory} from "@/repository/CategoryService";
import type {IProduct} from "@/interfaces/IProduct";
import CardProduct from "@/components/CardProduct.vue";

let categoryName: Ref<string|string[]> = ref('')
let loading: Ref<boolean> = ref(false)
let products: IProduct[]

onMounted(() => {
  categoryName.value = useRoute().params.categoryName
})

onUpdated(() => {
  categoryName.value = useRoute().params.categoryName
})

watch(categoryName, async () => {
  try {
    loading.value = true
    products = []
    products = await getInCategory(categoryName.value)

  }catch (error) {
    console.log(error)
  }finally {
    await nextTick()
    loading.value = false
  }
})

//
// onBeforeUpdate(async () => {
//   try {
//     categoryName = useRoute().params.categoryName
//     loading.value = true
//     products = await getInCategory(categoryName)
//     console.log(products)
//
//     await nextTick()
//     loading.value = false
//   }catch (error) {
//     console.log(error)
//   }
// })



</script>

<style scoped>

</style>