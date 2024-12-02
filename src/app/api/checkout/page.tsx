"use client";

import PayPalButton from "@/components/PayPalButton";
import { PaymentDetails } from "@/types/payement";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePaymentSuccess = async (details: PaymentDetails) => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: details.id,
          paymentId: details.purchase_units[0].payments.captures[0].id,
          status: details.status,
          amount: details.purchase_units[0].amount.value,
          currency: details.purchase_units[0].amount.currency_code,
          payerEmail: details.payer.email_address,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      setSuccess(true);
    } catch {
      setError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: unknown) => {
    setError("Payment failed. Please try again.");
    console.error("PayPal Error:", error);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Payment successful! Thank you for your order.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p className="text-gray-600">Total Amount: $99.99</p>
          </div>

          {loading ? (
            <div className="text-center">Processing payment...</div>
          ) : (
            <PayPalButton 
              amount={99.99}
              currency="USD"
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </div>
      )}
    </div>
  );
}