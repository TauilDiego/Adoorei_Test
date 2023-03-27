import {getMethod} from "@/repository/Service";

export function getCategories(): Promise<Array<string>> {
  return getMethod("products/categories")

}
