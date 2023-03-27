import {getMethod} from "@/repository/Service";
import type {IProduct} from "@/interfaces/IProduct";

export function getAllProducts(): Promise<Array<IProduct>> {
  return getMethod("products")

}
