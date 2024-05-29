import { getAllProducts } from "@/actions/product";
import Product from "@/components/Product";
import { useAppSelector } from "@/store/hooks/hooks";
import Link from "next/link";
import React from "react";

const page = async () => {
    
    const products = await getAllProducts()
  return (
    <div className="bg-blue-50 py-8 px-8 min-h-screen">
      <div className="">
        <div className="flex space-x-6 justify-center items-center">
        <h2 className=" text-center text-2xl">Product List {products?.length ?? 0}</h2>
        <Link className=" text-2xl font-bold underline" href={'/cart'}>cart items</Link>
        </div>
        {products && products.length > 0 ? (
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {products.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
        ) : (
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <p>No Products Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
