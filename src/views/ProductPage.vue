<template>
  <div v-if="!loading" class="w-full grid sm:grid-cols-1 md:grid-cols-4">
    <div class="sm:col-span-1 md:col-span-2 w-full min-h-[900px] content-center grid place-content-center">
      <img :src="product?.image" :alt="product?.title">
    </div>
    <div class="sm:col-span-1 md:col-span-2 text-center pl-10">
      <div class="text-[24px] mt-14 mb-4 text-left">
        <span>{{ product?.title }}</span>
      </div>
      <hr>
      <div class="text-[22px] text-left font-bold my-4">
        R$ {{ product?.price }}
      </div>
      <div class="text-[22px] text-left font-bold my-4">

      </div>
      <hr>
      <div class="text-[22px] text-left my-4">
        <span class="mr-2">Quantidade:</span>
        <button
          :disabled="amount===1"
          :class="`${minusButtonClass} text-white font-bold py-1 px-4 rounded`"
          @click="decreaseAmount"
        >
          -
        </button>
        <input type="number" min="1" max="99" v-model="amount" class="focus-visible:outline-0 px-3 text-center">
        <button
          :disabled="amount===99"
          :class="`${plusButtonClass} text-white font-bold py-1 px-4 rounded`"
          @click="increaseAmount"
        >
          +
        </button>
      </div>
      <div class="text-[22px] text-left my-4">
        <button class="bg-orange-400 text-white font-bold py-2 px-4 rounded" @click="buy">Comprar</button>
      </div>
      <div class="text-[22px] text-left my-4">
        <button class="border-2 border-cyan-400 text-cyan-400 font-bold py-2 px-4 rounded" @click="addToCart">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
    <div class="sm:col-span-1 md:col-span-4 pt-10 text-[16px]">
      <span>{{ product?.description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {nextTick, onMounted, ref, Ref, watch} from "vue";
import type {IProduct} from "@/interfaces/IProduct";
import {getProductInfo} from "@/repository/ProductService";
import {useCart} from "@/stores/cart";
import router from "@/router";

let productId: Ref<string | string[]> = ref(useRoute().params.productId)
let loading: Ref<boolean> = ref(false)
let product: IProduct = {
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
}
let amount = ref(1)
let minusButtonClass: Ref<string> = ref('bg-gray-400')
let plusButtonClass: Ref<string> = ref('bg-blue-500 hover:bg-blue-700')
const store = useCart()

onMounted(async () => {
  try {
    productId.value = useRoute().params.productId
    loading.value = true
    product = await getProductInfo(productId.value)
  } catch (error) {
    console.log(error)
  } finally {
    await nextTick()
    loading.value = false
  }
})

watch(amount, newValue => {

  if (!newValue || newValue <= 1) {
    amount.value = 1
    minusButtonClass.value = 'bg-gray-400'
    return
  }

  if (newValue >= 99) {
    amount.value = 99
    plusButtonClass.value = 'bg-gray-400'
    return
  }
  minusButtonClass.value = 'bg-blue-500 hover:bg-blue-700'
  plusButtonClass.value = 'bg-blue-500 hover:bg-blue-700'
})

function decreaseAmount() {
  amount.value = amount.value - 1
}

function increaseAmount() {
  amount.value = amount.value + 1
}

function buy() {
  addToCart()
  router.push('/cart')
}

function addToCart() {
  store.addNewProduct({
    amount: amount.value,
    product
  })
}

</script>

<style scoped>

</style>