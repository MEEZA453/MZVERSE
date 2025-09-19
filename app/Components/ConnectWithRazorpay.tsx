"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store/store";

import { useAuth } from "../Context/AuthContext";

export default function ConnectRazorpayButton() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { loading, error, connectUrl } = useSelector(
//     (state: RootState) => state.razorpayConnect
//   );

// const {token} = useAuth()

//   const handleConnect = async () => {
//     const url = await dispatch(fetchRazorpayConnectUrl(token));
//     if (url) {
//       // Redirect to Razorpay Connect
//       window.location.href = url;
//     }
//   };

  return (
    <div>
      {/* <button
        onClick={handleConnect}
        disabled={loading}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Connect Razorpay Account"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
}
