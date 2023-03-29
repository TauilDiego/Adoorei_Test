<template>
  <div class="w-[150px] mx-auto my-auto text-center ">
    <img :src="product.product.image" :alt="product.product.title">
  </div>

  <div class="min-w-[100px] my-auto text-center">
    <router-link :to="`/product/${product.product.id}`">{{ product.product.title }}</router-link>
  </div>

  <div class="grid">

    <div class="ml-auto w-fit">
      <button
        class="place-self-end bg-red-500 rounded-tr-2xl text-white font-bold py-1 px-4"
        @click="store.removeProduct(product.product.id)"
      >
        <span class="fa fa-close"></span>
      </button>
    </div>

    <div class="grid content-end text-center h-full">
      <div class="my-5">
        <span>Preço:</span>
        <p class="text-[22px] text-red-400">{{
            product.product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
          }}</p>
      </div>
      <div class="my-5">
        <p>quantidade:</p>
        <button
          :disabled="product.amount===1"
          :class="`${product.amount <= 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700' } text-white font-bold py-1 px-4 rounded`"
          @click="product.amount = product.amount < 1 ?  1 : product.amount - 1"
        >
          -
        </button>
        <input type="number" min="1" max="99" v-model="product.amount"
               class="focus-visible:outline-0 px-3 text-center">
        <button
          :disabled="product.amount===99"
          :class="`${product.amount >= 99 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-1 px-4 rounded`"
          @click="product.amount = product.amount >= 99 ?  99 : product.amount + 1"
        >
          +
        </button>
      </div>
      <div class="bg-orange-50 rounded-br-2xl">

        <p>Total: </p>
        <span class="text-[22px] text-red-400 bold">{{
            (product.amount * product.product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
          }}</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useCart} from "@/stores/cart";
import {onMounted, ref, Ref} from "vue";
import type {ICartProduct} from "@/interfaces/ICartProduct";

const props = defineProps({
  productId: {
    type: Number,
    default: 0
  },
})
const defaultValue: ICartProduct = {
  product: {
    "id": 0,
    "title": "",
    "price": 0,
    "description": "",
    "category": "",
    "image": "",
    "rating": {
      "rate": 0,
      "count": 0
    }
  },
  amount: 0
}
let product: Ref<ICartProduct> = ref(defaultValue)

const store = useCart()

onMounted(() => {
  product.value = store.products.find((product: ICartProduct) => product.product.id === props.productId)||defaultValue
})

</script>

<style scoped>

</style>