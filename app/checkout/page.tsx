"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getCart, clearCart, type CartItem } from "@/lib/cart.db";

type OrderStatus = "idle" | "loading" | "success" | "error";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(350);

  useEffect(() => {
    getCart()
      .then(setItems)
      .finally(() => setCartLoading(false));
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items],
  );
  const totalQty = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items],
  );

  const handleSubmit = async () => {
    if (!fullName.trim()) return alert("Please enter your full name.");
    if (!phone.trim() || phone.length < 10)
      return alert("Please enter a valid phone number.");
    if (!address.trim()) return alert("Please enter your delivery address.");
    if (items.length === 0) return alert("Your cart is empty.");

    setStatus("loading");
    setErrorMsg("");

    const orderPayload = {
      customer: {
        fullName: fullName.trim(),
        phone: `${phone.trim()}`,
        address: address.trim(),
      },
      note: note.trim() || null,
      paymentMethod: "cod",
      items: items.map((it) => ({
        productId: it.productId,
        qty: it.qty,
        color: it.color || null,
        size: it.size || null,
      })),
      deliveryCharge: subtotal > 3000 ? 0 : deliveryCharge,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Order failed.");
      await clearCart();
      setOrderId(data?.data?._id || data?.orderId || null);
      console.log(orderPayload);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong.");
      setStatus("error");
    }
  };

  // ── Success Screen ────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="container  mx-auto min-h-screen bg-colorBody flex items-center justify-center px-4 ">
        <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-8 max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-colorTextBody ">
              Order Placed!
            </h2>
            <p className="text-colorTextBody/60 text-sm mt-5">
              We'll contact you at <strong>+880{phone}</strong> to confirm your
              delivery.
            </p>
          </div>
          {orderId && (
            <div className="bg-colorBodyDim rounded-lg px-4 py-3 mt-4 mb-4">
              <p className="text-xs text-colorTextBody/50 mb-1">Order ID</p>
              <p className="font-mono text-sm font-bold text-colorTextBody break-all">
                {orderId}
              </p>
            </div>
          )}
          <div className="space-y-3 pt-2">
            <Link
              href="/"
              className="block w-full bg-colorBtnPrimary text-colorBtnPrimaryText py-3 rounded-lg font-semibold hover:bg-colorBtnPrimary/90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/allcollection"
              className="block w-full border border-colorBorder text-colorTextBody py-3 rounded-lg font-semibold hover:bg-colorBodyDim transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-colorBody">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-colorTextBody">
              Checkout
            </h1>
            <p className="text-sm text-colorTextBody/60 mt-1">
              Complete your order
            </p>
          </div>
          <Link
            href="/cart"
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
            Back to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Cart", "Checkout", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 text-sm font-medium ${i === 1 ? "text-colorBtnPrimary" : i < 1 ? "text-colorTextBody/40" : "text-colorTextBody/30"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? "bg-colorBtnPrimary text-colorBtnPrimaryText" : "bg-colorBodyDim text-colorTextBody/30"}`}
                >
                  {i < 1 ? (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="hidden sm:inline">{step}</span>
              </div>
              {i < 2 && (
                <div
                  className={`w-8 sm:w-16 h-px ${i < 1 ? "bg-colorBtnPrimary" : "bg-colorBorder"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Delivery */}
            <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-6">
              <h2 className="text-base font-bold text-colorTextBody mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-colorBtnPrimary text-colorBtnPrimaryText text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-colorTextBody mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-colorBorder bg-colorInputBg text-colorInputText placeholder:text-colorTextBody/30 focus:outline-none focus:ring-1 focus:ring-colorBtnPrimary/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-colorTextBody mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="1XXXXXXXXX"
                      className="w-full   px-4 py-3 rounded-lg border border-colorBorder bg-colorInputBg text-colorInputText placeholder:text-colorTextBody/30 focus:outline-none focus:ring-1 focus:ring-colorBtnPrimary/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-colorTextBody mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no, road no, area, district, division..."
                    className="w-full px-4 py-3 rounded-lg border border-colorBorder bg-colorInputBg text-colorInputText placeholder:text-colorTextBody/30 focus:outline-none focus:ring-1 focus:ring-colorBtnPrimary/40 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Payment - COD only */}
            <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-6">
              <h2 className="text-base font-bold text-colorTextBody mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-colorBtnPrimary text-colorBtnPrimaryText text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Payment Method
              </h2>

              <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-colorBtnPrimary bg-colorBtnPrimary/5">
                <div className="w-10 h-10 rounded-lg bg-colorBodyDim flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-colorTextBody/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-colorTextBody text-sm">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-colorTextBody/50">
                    Pay when you receive the product
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full bg-colorBtnPrimary flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3 text-colorBtnPrimaryText"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Section 3: Note */}
            <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-6">
              <h2 className="text-base font-bold text-colorTextBody mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-colorBtnPrimary text-colorBtnPrimaryText text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Order Note
                <span className="text-colorTextBody/40 text-xs font-normal ml-1">
                  (optional)
                </span>
              </h2>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special instructions for your order..."
                className="w-full px-4 py-3 rounded-lg border border-colorBorder bg-colorInputBg text-colorInputText placeholder:text-colorTextBody/30 focus:outline-none focus:ring-1 focus:ring-colorBtnPrimary/40 resize-none"
              />
            </div>
          </div>

          {/* ── Right: Summary ────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-colorBodyDim/40 border border-colorBorder rounded-xl p-6 lg:sticky lg:top-24 space-y-5">
              <h2 className="text-lg font-bold text-colorTextBody">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 pb-4">
                {cartLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg bg-colorBodyDim animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-28 bg-colorBodyDim rounded animate-pulse" />
                        <div className="h-2 w-16 bg-colorBodyDim rounded animate-pulse" />
                      </div>
                      <div className="h-3 w-14 bg-colorBodyDim rounded animate-pulse" />
                    </div>
                  ))
                ) : items.length === 0 ? (
                  <p className="text-sm text-colorTextBody/50 text-center py-4">
                    Cart is empty
                  </p>
                ) : (
                  items.map((it) => (
                    <div key={it.key} className="flex gap-3 items-center ">
                      <div className="w-12 h-12 rounded-lg bg-colorBodyDim shrink-0 overflow-hidden">
                        {it.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-colorTextBody truncate">
                          {it.name}
                        </p>
                        <p className="text-xs text-colorTextBody/50">
                          {[it.color, it.size].filter(Boolean).join(" / ")} ×{" "}
                          {it.qty}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-colorTextBody shrink-0">
                        ৳ {(it.price * it.qty).toLocaleString("en-BD")}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">
                    Subtotal ({totalQty} items)
                  </span>
                  <span className="font-medium text-colorTextBody">
                    ৳ {subtotal.toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Delivery</span>

                  <span className="font-medium text-green-600">
                    {subtotal >= 3000 ? "Free" : `৳${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Payment</span>
                  <span className="font-medium text-colorTextBody">
                    Cash on Delivery
                  </span>
                </div>
              </div>

              <div className="border-t border-colorBorder py-4" />

              <div className="flex items-center justify-between ">
                <span className="font-bold text-colorTextBody mb-6">Total</span>
                <span className="text-xl font-bold text-colorTextBody">
                  ৳ {subtotal >= 3000 ? subtotal : subtotal + deliveryCharge}
                </span>
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="bg-red-50 border  mb-4 border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={
                  status === "loading" || cartLoading || items.length === 0
                }
                className="w-full   bg-colorBtnPrimary text-colorBtnPrimaryText py-3 rounded-lg font-semibold hover:bg-colorBtnPrimary/90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Place Order
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-colorTextBody/60">
                  <svg
                    className="w-4 h-4 shrink-0"
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
                    className="w-4 h-4 shrink-0"
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
                    className="w-4 h-4 shrink-0"
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
