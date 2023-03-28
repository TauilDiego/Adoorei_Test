<template>
  <div class="w-72 h-[550px] flex flex-col rounded-2xl shadow-md shadow-gray-600 mb-10  items-center" @click="redirectToProduct(product.id)">

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
      <p>
        <span v-for="(n, i) in 5" :key="i" :class="`fa fa-star ${n<=Math.round(product.rating.rate)? 'checked' : ''}`"></span>
        <span class="ml-2">({{product.rating.count}})</span>
      </p>
      <p class="w-60 h-6 overflow-ellipsis">{{ product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IProduct} from "@/interfaces/IProduct";
import router from "@/router";

defineProps<{
  product?: IProduct
}>()

function redirectToProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.checked {
  color: orange;
}
</style>