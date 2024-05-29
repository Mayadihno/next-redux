"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { decrement, increment } from "@/store/slice/counterSlice";
import { RootState } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  // const [counter, setCounter] = useState(0);

  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    // setCounter((prev) => prev + 1)
    dispatch(increment());
  };

  const handleDecrement = () => {
    // setCounter((prev) => prev === 1 ? 1 : prev - 1)
    dispatch(decrement());
  };
  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-center text-white">
      <h2 className="scroll-m-20 pb-6 text-4xl font-semibold tracking-tight first:mt-0">
        Redux Counter
      </h2>
      <div className="py-4 ">
        <div className="flex items-center space-x-6 ">
          <button onClick={handleDecrement}>
            <Minus className="w-8 h-8" />
          </button>
          <p className="scroll-m-20 text-6xl font-semibold tracking-tight first:mt-0">
            {value}
          </p>
          <button onClick={handleIncrement}>
            <Plus className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
