"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCart,
  removeCartItem,
  clearCart,
  setCartQty,
  type CartItem,
} from "@/lib/cart.db";
import { CircleFadingPlus, MinusCircle, MinusCircleIcon } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();

    // ✅ other pages addToCart করলে auto update
    const onChange = () => loadCart();
    window.addEventListener("cart:changed", onChange);
    return () => window.removeEventListener("cart:changed", onChange);
  }, []);

  const totalQty = useMemo(
    () => items.reduce((sum, it) => sum + (it.qty || 0), 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0),
    [items],
  );

  const handleRemove = async (key: string) => {
    try {
      setBusyKey(key);
      await removeCartItem(key);
      // removeCartItem should dispatch cart:changed; but to be safe:
      await loadCart();
    } finally {
      setBusyKey(null);
    }
  };

  const handleQty = async (key: string, nextQty: number) => {
    if (nextQty < 1) return;
    try {
      setBusyKey(key);
      await setCartQty(key, nextQty);
      await loadCart();
    } finally {
      setBusyKey(null);
    }
  };

  const handleClearAll = async () => {
    try {
      setClearing(true);
      await clearCart();
      await loadCart();
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-colorBody">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-colorTextBody">
              Shopping Cart
            </h1>
            <p className="text-sm text-colorTextBody/60 mt-1">
              {loading ? "Loading..." : `${totalQty} items in your cart`}
            </p>
          </div>
          <Link
            href="/allcollection"
            className="hidden sm:flex items-center gap-2 text-sm text-colorLink hover:underline"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Cart Items ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Item Card */}
            {(loading ? [] : items).map((it) => (
              <div
                key={it.key}
                className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-4"
              >
                <div className="flex gap-4">
                  {/* Image Placeholder */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-colorBodyDim shrink-0 overflow-hidden">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      {/* Name + Variant */}
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-40 rounded flex items-center">
                          <Link
                            href={`/product/${it.slug}`}
                            className="text-colorTextBody font-semibold truncate"
                          >
                            {it.name}
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          {it.color ? (
                            <span className="text-xs text-colorTextBody/60 bg-colorBodyDim px-2 py-0.5 rounded-full">
                              {it.color}
                            </span>
                          ) : null}
                          {it.size ? (
                            <span className="text-xs text-colorTextBody/60 bg-colorBodyDim px-2 py-0.5 rounded-full">
                              {it.size}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(it.key)}
                        disabled={busyKey === it.key}
                        className="p-1.5 text-colorTextBody/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0 disabled:opacity-50"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Qty + Price Row */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-colorBorder rounded-lg">
                        <button
                          onClick={() => handleQty(it.key, (it.qty || 1) - 1)}
                          disabled={busyKey === it.key || (it.qty || 1) <= 1}
                          className="px-3 py-1.5 hover:bg-colorBodyDim  transition-colors rounded-l-lg disabled:opacity-50"
                        >
                          <MinusCircleIcon />
                        </button>
                        <span className="px-4 py-1.5 text-sm font-semibold text-colorTextBody min-w-10 text-center border-x border-colorBorder">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => handleQty(it.key, (it.qty || 1) + 1)}
                          disabled={busyKey === it.key}
                          className="px-3 py-1.5 hover:bg-colorBodyDim transition-colors rounded-r-lg disabled:opacity-50"
                        >
                          <CircleFadingPlus />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-colorTextBody">
                          ৳ {(it.price * it.qty).toLocaleString("en-BD")}
                        </p>
                        <p className="text-xs text-colorTextBody/50">
                          ৳ {it.price.toLocaleString("en-BD")} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state (keeps design area) */}
            {!loading && items.length === 0 ? (
              <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-8 text-center text-colorTextBody/60">
                Your cart is empty.
              </div>
            ) : null}

            {/* Clear All */}
            <button
              onClick={handleClearAll}
              disabled={loading || items.length === 0 || clearing}
              className="text-sm text-red-500 hover:text-red-600 hover:underline flex items-center gap-1.5 disabled:opacity-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {clearing ? "Clearing..." : "Clear all items"}
            </button>
          </div>

          {/* ── Right: Order Summary ──────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-colorTextBody mb-5">
                Order Summary
              </h2>

              {/* Summary Lines */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">
                    Subtotal ({loading ? 0 : totalQty} items)
                  </span>
                  <span className="font-medium text-colorTextBody">
                    ৳ {loading ? "0" : subtotal.toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-colorBorder my-4" />

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-colorTextBody">Total</span>
                <span className="text-xl font-bold text-colorTextBody">
                  ৳ {loading ? "0" : subtotal.toLocaleString("en-BD")}
                </span>
              </div>

              {/* Checkout Button */}

              <Link href={"/checkout"}>
                <button
                  disabled={loading || items.length === 0}
                  className="w-full mb-10 bg-colorBtnPrimary cursor-pointer text-colorBtnPrimaryText py-3 rounded-lg font-semibold hover:bg-colorBtnPrimary/90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Proceed to Checkout
                </button>
              </Link>

              {/* Trust Badges (untouched) */}
              <div className="mt-10 pt-5 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-colorTextBody/60">
                  <svg
                    className="w-4 h-4 text-green-500 shrink-0"
                    fill="none"
                    stroke="green"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Secure Payment
                </div>
                <div className="flex items-center gap-2 text-xs text-colorTextBody/60">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="blue"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-xs text-colorTextBody/60">
                  <svg
                    className="w-4 h-4 text-orange-500 shrink-0"
                    fill="none"
                    stroke="orange"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Easy Returns
                </div>
                <div className="flex items-center gap-2 text-xs text-colorTextBody/60">
                  <svg
                    className="w-4 h-4 text-purple-500 shrink-0"
                    fill="none"
                    stroke="purple"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
