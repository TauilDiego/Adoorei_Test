<template>
  <div class="w-72 flex flex-col rounded-2xl shadow-lg shadow-gray-600 mb-10  items-center" style="height: 550px" @click="redirectToProduct(product.id)">

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
    </div>
    <p class="w-60 min-h-fit flex-wrap leading-tight">{{ product.title }}</p>
    <p class="w-60 h-6 overflow-ellipsis">{{ product.price }}</p>
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

</style>