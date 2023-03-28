import {getMethod} from "@/repository/Service";
import type {IProduct} from "@/interfaces/IProduct";

export function getCategories(): Promise<Array<string>> {
  return getMethod("products/categories")
}

export function getInCategory(categoryName: string|string[]): Promise<Array<IProduct>> {
  return getMethod(`products/category/${categoryName}`)
}
