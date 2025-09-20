"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../Context/AuthContext";
import { AppDispatch } from "../../store/store";
import { capturePayment, createOrder } from "../../store/actions/payment";


export default function PaymentPage() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useAuth();

  // Customer info
  const [customer, setCustomer] = useState({
    name: "",
    email: user?.email || "",
  });

  // 👉 Razorpay Loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 👉 Payment handler
  const payWithRazorpay = async () => {
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 1. Create order from backend
      const orderData: any = await dispatch(createOrder(token ,productId as string));
      if (!orderData?.success) {
        console.log(orderData)
        alert("Failed to create Razorpay order");
        return;
      }

      // 2. Razorpay options
      const options: any = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "MZCO Store",
        description: "Purchase Design",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const payload = {
            orderId: orderData.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            productId,
          };
          const captureRes: any = await dispatch(capturePayment(token, payload));

          if (captureRes?.success) {
            alert("✅ Payment successful! Check your email.");
          } else {
            alert("❌ Payment capture failed");
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
        },
        theme: { color: "#6366f1" }, // Indigo
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay payment error:", err);
      alert("Something went wrong with Razorpay");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className=" shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Checkout Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">🛒 Checkout</h1>

        {/* Product Summary */}
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <p className="font-semibold">Product: Poster Design</p>
          <p className="text-gray-600">High-quality digital poster</p>
          <p className="mt-2 text-lg font-bold">₹499</p>
        </div>

        {/* Customer Info */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Payment Button */}
        <button
          onClick={payWithRazorpay}
          className="w-full py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
        >
          Pay Securely with Razorpay
        </button>
      </div>
    </div>
  );
}
