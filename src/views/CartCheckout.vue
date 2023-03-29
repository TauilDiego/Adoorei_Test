<template>
  <div v-if="store.products.length" class="max-w-[1249px] mx-auto grid sm:grid-cols-1 md:grid-cols-4">
    <div class="md:col-span-2">
      <div v-for="(product,index) in store.products" :key="index"
           class="bg-white mb-10 flex grid grid-cols-3 flex-row rounded-2xl content-center h-fit mx-5">
       <CartProduct :productId="product.product.id"/>
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
import CartProduct from "@/components/CartProduct.vue";

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