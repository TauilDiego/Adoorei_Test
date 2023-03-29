<template>
  <div class="max-w-[1249px] pt-14 grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mx-auto" v-if="!loading">
    <div class="sm:col-span-1 md:col-span-3 xl:col-span-4 mb-20  ml-[40px]">
      <span class="text-red-400 text-[32px]">{{categoryName}}</span>
      <br>
      <label for="filterOptions">Filter </label>
      <select name="filterOptions" v-model="selectedFilter">
        <option v-for="(option,index) in filterOptions" :key="index" :value="option">{{option.title}}</option>
      </select>
    </div>
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
import type {IFilterOption} from "@/interfaces/IFilterOption";

let categoryName: Ref<string|string[]> = ref('')
let loading: Ref<boolean> = ref(false)
let products: IProduct[]


const filterOptions: IFilterOption[] = [
  {
    title: 'Name',
    value:(product: IProduct) => product.title
  },
  {
    title: 'Price',
    value:(product: IProduct) => product.price
  },
  {
    title: 'Rating',
    value:(product: IProduct) => product.rating.rate
  },
]

let selectedFilter: Ref<IFilterOption> = ref(filterOptions[0])
watch(selectedFilter, async newValue => {
  loading.value = true
  products = products.sort((a,b) => selectedFilter.value.value(b) - selectedFilter.value.value(a) )
  await nextTick()
  loading.value = false
})

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
    products = products.sort((a,b) => selectedFilter.value.value(b) - selectedFilter.value.value(a) )

  }catch (error) {
    console.log(error)
  }finally {
    await nextTick()
    loading.value = false
  }
})

</script>

<style scoped>

</style>