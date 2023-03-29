<template>
  <div v-if="store.products.length" class="max-w-[1249px] mx-auto grid sm:grid-cols-1 md:grid-cols-4">
    <div class="md:col-span-2">
      <div v-for="(product,index) in store.products" :key="index"
           class="bg-white mb-10 flex grid grid-cols-3 flex-row rounded-2xl content-center h-fit mx-5">
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

      </div>
    </div>
    <div class="md:col-span-2">
      <div class="h-fit mx-5 bg-white rounded-2xl px-5 py-5">
        <b class="text-[22px]">Resumo do pedido</b>

        <div class="flex place-content-between text-[16px]">
          <div>
            {{
              `${store.products.reduce((accumulator, value) => accumulator + value.amount, 0)} produto${store.products.reduce((accumulator, value) => accumulator + value.amount, 0) === 1 ? '' : 's'}`
            }}
          </div>
          <div>
            {{
              store.products.reduce((accumulator, value) => accumulator + (value.product.price * value.amount), 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }}
          </div>
        </div>

        <div>
          <button
            class="rounded bg-orange-400 text-white font-bold py-1 px-4"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-[300px] text-center text-[22px]">
    Ops! seu carrinho está vazio.
    <span class="fa fa-cart"></span>
    <img class="mx-auto w-[200px]" src="https://cdn-icons-png.flaticon.com/512/102/102661.png" alt="carrinho vazio">
  </div>
</template>

<script setup lang="ts">

import {useCart} from "@/stores/cart";
import {onMounted} from "vue";
import {getProductInfo} from "@/repository/ProductService";

const store = useCart()

onMounted(async () => {
  store.products=[]
  for (const product of JSON.parse(document.cookie.split('=')[1])) {

    store.addNewProduct({
      product: await getProductInfo(product.productId),
      amount: product.amount
    })
  }

})
</script>

<style scoped>

</style>