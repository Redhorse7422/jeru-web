"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Menu } from "@/types/menu.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Menu & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={() =>
        dispatch(
          addToCart({
            id: data.id,
            name: data.name,
            srcUrl: data.thumbnail,
            price: Number(data.price),
            attributes: [sizeSelection, colorSelection.name],
            discount: { amount: Number(data.discounted_price), percentage: Number(data.discount) },
            quantity: data.quantity,
          })
        )
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
