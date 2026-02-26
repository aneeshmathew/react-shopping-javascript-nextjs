"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectItems,
  selectTotalPrice,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartView() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [ordered, setOrdered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-28 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order placed!
          </h1>
          <p className="text-gray-500 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <Link
          href="/"
          className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2 leading-snug"
                    >
                      {product.title}
                    </Link>
                    <button
                      onClick={() => dispatch(removeItem(product.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 capitalize mt-0.5">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="inline-flex items-center justify-center w-8 h-7 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-base font-bold text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span className="truncate mr-2">
                      {product.title.substring(0, 30)}
                      {product.title.length > 30 ? "…" : ""} × {quantity}
                    </span>
                    <span className="flex-shrink-0 font-medium">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Place Order
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full mt-2 text-sm text-gray-400 hover:text-red-500 transition-colors py-2"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
