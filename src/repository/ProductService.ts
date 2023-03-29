import {getMethod} from "@/repository/Service";
import type {IProduct} from "@/interfaces/IProduct";

export function getProductInfo<T>(productId: T): Promise<IProduct> {
  return getMethod(`products/${productId}`)
}
