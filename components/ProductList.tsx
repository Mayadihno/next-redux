"use client";
import React from "react";

import Product from "./Product";
import { getAllProducts } from "@/actions/product";

const ProductList =  () => {
    const product = getAllProducts()
    console.log(product)
  return (
    <div className="">
      <h2 className=" text-center text-2xl">Product List</h2>
      <div className=" py-8 grid grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default ProductList;
