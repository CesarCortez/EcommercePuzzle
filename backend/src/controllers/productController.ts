import { Request, Response } from "express";
import axios from "axios";
import { Product } from "../types/productType";
import asyncHandler from "express-async-handler";

interface Error {
  error: string;
}

//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response = await axios.get<Product[] | Error>(
      "https://fakestoreapi.com/products"
    );

    let products = response.data as Product[];

    const query = req.query || {}
    if(query && query.keyword) {
      let keyword = query.keyword;
      keyword = keyword.toString().toLowerCase();
      products = products.filter((product: Product) => {
        return product.title.toLowerCase().includes(keyword as string);
      });
    }

    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.json({ data: null });
    throw error;
  }
};

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
export const getProductsById = asyncHandler(async (req, res) => {
  //const product = await ProductModel.findById(req.params.id);


  try {
    const response = await axios.get<Product[] | Error>(
      "https://fakestoreapi.com/products"
    );

    const products = response.data as Product[];

    products.forEach((product: Product) => {
      if (product.id == parseInt(req.params.id)) {
        res.json(product);
      }
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.json({ data: null });
    throw error;
  }
});
