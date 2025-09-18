"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PayButton from "../../Components/PaypalButton";
import { useSelector } from "react-redux";
import { useAuth } from "../../Context/AuthContext";
import { getDesignById } from "../../store/actions/design";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export default function PaymentPage() {
  const { productId } = useParams(); // product id
  const dispatch = useDispatch<AppDispatch>()
  const {token} = useAuth()
const {product , loading} = useSelector((state : any)=> state.design)

 useEffect(()=>{
dispatch(getDesignById(product))
 },[dispatch])
  const [method, setMethod] = useState<"paypal" | "card" | null>(null);
// async function payWithRazorpay() {
//   // 1. Call backend to create order
//   const res = await fetch("/api/payment/razorpay/create", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ amount, productId }),
//   });

//   const data = await res.json();

//   if (!data.success) return alert("Order creation failed");

//   const order = data.order;

//   // 2. Razorpay options
//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // public key
//     amount: order.amount,
//     currency: order.currency,
//     name: "Your Website Name",
//     description: "Purchase Description",
//     order_id: order.id, // created order id from backend
//     handler: async function (response) {
//       // 3. Capture payment on backend
//       const captureRes = await fetch("/api/payment/razorpay/capture", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ paymentId: response.razorpay_payment_id, orderId: order.id }),
//       });

//       const captureData = await captureRes.json();
//       if (captureData.success) alert("Payment successful! Check your email.");
//     },
//     prefill: {
//       email: "customer@example.com",
//       contact: "9999999999",
//     },
//     theme: { color: "#3399cc" },
//   };

//   // 4. Open Razorpay checkout
//   const rzp = new Razorpay(options);
//   rzp.open();
// }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">💳 Choose Payment Method</h1>

        <div className="flex flex-col gap-4">
          {/* Card Option (UI only for now) */}
          <button
            onClick={() => setMethod("card")}
            className={`w-full py-3 rounded-lg font-medium ${
              method === "card"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Pay with Card
          </button>

          {/* PayPal Option */}
          <button
            onClick={() => setMethod("paypal")}
            className={`w-full py-3 rounded-lg font-medium ${
              method === "paypal"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Pay with PayPal
          </button>
        </div>

        {/* Render Selected Payment Method */}
        <div className="mt-6">
          {method === "card" && (
            <p className="text-center text-gray-600">⚠️ Card checkout will be added later.</p>
          )}
          {method === "paypal" && (
            <PayButton productId={productId as string} token={token} />
          )}
        </div>
      </div>
      <button>Razorpay</button>
    </div>
  );
}
