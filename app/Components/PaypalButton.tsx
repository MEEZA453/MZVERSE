'use client'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { capturePaypalOrder, createPaypalOrder } from "../store/actions/payment";
import { AppDispatch } from "../store/store";


export default function PayButton({ productId, token }: { productId: string; token: string }) {
    console.log(productId , token)
  const dispatch = useDispatch<AppDispatch>();
    console.log("PayPal Client ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
    <PayPalButtons
      createOrder={async () => {
        const res = await dispatch(createPaypalOrder(productId, token));
        console.log(res)
        return res?.orderId;
      }}
      onApprove={async (data) => {
        console.log(data.orderID)
        await dispatch(capturePaypalOrder(data.orderID, token));
        alert("Payment successful ✅. Download link sent to your email.");
      }}
    />
  );
}
