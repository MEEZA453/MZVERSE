"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useAuth } from "../Context/AuthContext";
import { connectAccount, getWalletTransactions, withdrawBalance } from "../store/actions/payment";


export default function WalletPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();

  const { wallet, loading, error } = useSelector((state: any) => state.payment);
console.log(wallet)
  useEffect(() => {
    if (token) dispatch(getWalletTransactions(token));
  }, [dispatch, token]);

  const handleWithdraw = () => {
    if (!token) return;
    dispatch(withdrawBalance(token));
  };

  const handleConnect = () => {
    const razorpayAccountId = prompt("Enter your Razorpay Account ID:");
    if (!razorpayAccountId || !token) return;
    dispatch(connectAccount(token, razorpayAccountId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">💰 My Wallet</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Balance */}
        <div className="text-center mb-6">
          <p className="text-gray-600">Available Balance</p>
          <p className="text-3xl font-bold">₹{wallet?.balance || 0}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handleWithdraw}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Withdraw
          </button>
          <button
            onClick={handleConnect}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Connect Razorpay
          </button>
        </div>

        {/* Transactions */}
        <h2 className="text-lg font-semibold mb-2">📜 Transactions</h2>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {wallet?.transactions?.length > 0 ? (
            wallet.transactions.map((tx: any) => (
              <div
                key={tx._id}
                className="border p-3 rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "CREDIT" ? "+" : "-"}₹{tx.amount}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
}
