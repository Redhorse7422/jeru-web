"use client";

import BreadcrumbCheckout from "@/components/cart-page/BreadcrumbCheckout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  placeOrderFailure,
  placeOrderStart,
  placeOrderSuccess,
  setOrderSummary,
  setPaymentMethod,
  setShippingAddress,
} from "@/lib/features/checkout/checkoutSlice";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data type
type FormData = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart, totalPrice, adjustedTotalPrice } = useSelector(
    (state: RootState) => state.carts
  );
  const { shippingAddress, paymentMethod, status, error } = useSelector(
    (state: RootState) => state.checkout
  );

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(setShippingAddress(data));
  };

  const handleSelectPaymentMethod = (
    method: "credit_card" | "paypal" | "cash_on_delivery"
  ) => {
    dispatch(setPaymentMethod({ method }));
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
      alert("Please provide shipping address and payment method.");
      return;
    }

    dispatch(placeOrderStart());
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(
        setOrderSummary({
          items: cart?.items || [],
          totalPrice: totalPrice || 0,
          adjustedTotalPrice: adjustedTotalPrice || 0,
        })
      );
      dispatch(placeOrderSuccess());
      router.push("/order-confirmation");
    } catch (err) {
      dispatch(placeOrderFailure("Failed to place order. Please try again."));
    }
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Checkout Form */}
        <div>
          <BreadcrumbCheckout />
          <h2 className="font-bold text-[32px] md:text-[36px] text-black uppercase mb-5 md:mb-6">
            Your Checkout
          </h2>

          {/* Shipping Address Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
            <div className="space-y-2">
              {["fullName", "address", "city", "postalCode", "country"].map(
                (field) => (
                  <div key={field}>
                    <input
                      type="text"
                      placeholder={field
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .toUpperCase()}
                      {...register(field as keyof FormData, {
                        required: `${field.replace(
                          /([A-Z])/g,
                          " $1"
                        )} is required`,
                      })}
                      className="w-full p-2 border rounded"
                    />
                    {errors[field as keyof FormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                )
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Save Address
              </button>
            </div>
          </form>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="space-y-2">
              {["credit_card", "paypal", "cash_on_delivery"].map((method) => (
                <button
                  key={method}
                  onClick={() =>
                    handleSelectPaymentMethod(
                      method as "credit_card" | "paypal" | "cash_on_delivery"
                    )
                  }
                  className={`w-full p-2 border rounded ${paymentMethod?.method === method
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                    }`}
                >
                  {method.replace("_", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={status === "loading"}
            className="w-full bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {status === "loading" ? "Placing Order..." : "Place Order"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Column - Cart Summary */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart?.items.length ? (
            <>
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="mt-4 font-bold text-lg flex justify-between">
                <span>Total:</span>
                <span>${adjustedTotalPrice.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </main>
  );
}