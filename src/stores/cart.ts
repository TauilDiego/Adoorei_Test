import {defineStore} from 'pinia'
import type {ICartProduct} from "@/interfaces/ICartProduct";
import type {Ref} from "vue";
import {ref} from "vue";

export const useCart = defineStore('useCart', () => {
  const products: Ref<ICartProduct[]> = ref([])

  function addNewProduct(product: ICartProduct) {
    const finalProduct: ICartProduct = {
      product: product.product,
      amount: product.amount
    }

    const duplicatedProduct: ICartProduct|undefined = products.value.find((productFromList: ICartProduct) => productFromList.product.id===product.product.id)
    if(duplicatedProduct) {
      const amountSum: number = (duplicatedProduct.amount + product.amount)
      duplicatedProduct.amount = amountSum >= 99 ? 99 : amountSum

      addProductListToCookie()
    } else {
      products.value.push(finalProduct)
      addProductListToCookie()
    }
  }

  function removeProduct(productId: number) {
    const toBeDeletedProduct: number = products.value.findIndex((product: ICartProduct) => product.product.id===productId)
    products.value.splice(toBeDeletedProduct, 1)

    addProductListToCookie()
  }

  function addProductListToCookie() {
    document.cookie = `cart=${JSON.stringify(products.value.map(product => {
      return {
        productId: product.product.id,
        amount: product.amount
      }
    }))}`
  }


  return {
    addNewProduct,
    removeProduct,
    products
  }
})
