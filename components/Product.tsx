"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { IProduct } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { addProductToCart, removeProductFromCart } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

const Product = ({ product }: { product: IProduct }) => {
  const [existing, setExisting] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if the product already exists in the cart
    const isExisting = cartItems.some((item) => item.id === product.id);
    setExisting(isExisting);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    const cart = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
    };
    dispatch(addProductToCart(cart));
    localStorage.setItem("cart",JSON.stringify([...cartItems,cart]));
    setExisting(true);
    toast.success("Item added to cart successfully");
  };

  const handleRemove = (id:number) => {
    dispatch(removeProductFromCart(id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((product) => product.id !== id))
    );
  }
  return (
    <div>
      <Image
        className="h-36 w-36 object-cover rounded"
        src={product.images[0] ?? "/calcium.png"}
        width={1407}
        height={1682}
        alt="calcium"
      />
      <h3 className="font-semibold h-10">{product.title}</h3>
      <p className="font-semibold text-sm py-2">${product.price}</p>

      {existing ? (
        <Button
          variant={"destructive"}
            onClick={() => handleRemove(product.id)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          <span> Remove from</span>
        </Button>
      ) : (
        <Button onClick={handleAddToCart}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          <span> Add to Cart</span>
        </Button>
      )}
    </div>
  );
};

export default Product;
