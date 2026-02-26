"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectTotalItems } from "@/store/cartSlice";
import CartSidebar from "@/components/client/cart/CartSidebar";
import { useState, useEffect } from "react";

export default function NavBar() {
  const { data: session } = useSession();
  const totalItems = useSelector(selectTotalItems);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-bold text-indigo-600 tracking-tight"
            >
              ShopNext
            </Link>

            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="hidden sm:block text-sm text-gray-600">
                    Hello, {session.user?.name?.split(" ")[0]}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Sign in
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Open cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
