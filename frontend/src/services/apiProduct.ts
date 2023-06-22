import axios from "axios";
import { Product } from "../types";

// export const getProducts = async (keyword = "") => {

// };

export async function getProducts(keyword = "") {
  try {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );

    let products = response.data as Product[];

    if (keyword) {
      keyword = keyword.toString().toLowerCase();
      products = products.filter((product: Product) => {
        if(product.title.toLowerCase().includes(keyword as string)){
          return product;
        }else if(product.description.toLowerCase().includes(keyword as string)){
          return product;
        } else if(product.category.toLowerCase().includes(keyword as string)){
          return product;
        } else if(product.price.toString().includes(keyword as string)){
          return product;
        }else{
          return null;
        }
      });

      return products;
    }
    return products;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
}
