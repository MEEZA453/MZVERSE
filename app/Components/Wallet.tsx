"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useAuth } from "../Context/AuthContext";
import { connectAccount, getWalletTransactions, withdrawBalance } from "../store/actions/payment";
import { motion } from "framer-motion"
import { IoIosArrowBack } from "react-icons/io"
import { getUserCart, removeFromCart } from "../store/actions/cart"
import WalletTransection from "./WalletTransection";
import Loading from "./loading";
import BalanceCard from "./BalanceCard";
import Alart from "./Alart";

export default function WalletPage({setIsWallet}:{setIsWallet :React.Dispatch<React.SetStateAction<boolean>>}) {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
const [isAlart , setAlart] = useState(false)
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
const totalAmount = products.reduce((sum, p) => sum + p.amount, 0);

// ensure it's always integer
const amountInSubunits = Math.round(totalAmount * 100);

  return    <motion.div   className="w-screen fixed top-0 right-0 bg-black h-screen px-2 z-[999] overflow-y-scroll hide-scrollbar lg:w-[23vw]">
      <div>
                  
 <div className='w-full flex justify-between lg:w-[23vw] items-center px-0 z-[100] my-4 '>

     <div className='flex gap-1 items-center absolute top-3 left-2 justify-center'>
              <button onClick={()=> setIsWallet(false)}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Wallet</h4>
              </div>
            </div>
        {loading ?   <Loading/>: <div>{wallet?.length === 0 ? <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center flex-col gap-3 "><p>Nothing in the bag</p>
        <button  className="w-fit bg-white h-7 rounded-full text-black flex text-[14px] px-3 flex items-center justify-center ">Explore store</button>
        </div>:<div>
            { isAlart&& <Alart setAlart={setAlart}  func ={handleWithdraw} nameOfFunc='Connect'/>}
        <BalanceCard amount={Number(totalAmount?.toFixed(2))} acctId={wallet?.razorpayAccountId}/>
            <div>
              {wallet?.transactions?.map((transaction , index)=>{
         
        return         <div key={index}>
     
        <WalletTransection transaction={transaction?.product} buyer={transaction?.purchasedBy}/>

                  </div>
              })}
            </div>
            <button onClick={()=>setAlart(true)} className="bg-white w-[96%] -translate-x-1/2 left-1/2 rounded-[2px] h-6.5 items-center justify-center text-[14px] text-black fixed bottom-5">Withdraw</button>
            </div>}
            </div>}
            
      </div>

</motion.div>
}
