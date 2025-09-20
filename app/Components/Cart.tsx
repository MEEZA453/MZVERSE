import { motion } from "framer-motion"
import { IoIosArrowBack } from "react-icons/io"
import CartItemCart from "./CartItemCard"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { useEffect, useState } from "react"
import { getUserCart, removeFromCart } from "../store/actions/cart"
import { useAuth } from "../Context/AuthContext"
import SwipeToDelete from "./SwipeToDelete"
import Loading from "./loading"
import SkeletonNotification from "./Skeleton/SkeletonNotification"
import Alart from "./Alart"
import { captureCartPayment, createCartOrder } from "../store/actions/payment"
import { useNotification } from "../Context/Notification"
export default function Cart({setIsCart}){
const {token , user} = useAuth()
const {setNotification} = useNotification()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
const {items , loading} = useSelector((state : any)=>state.cart)
const [isAlart , setAlart]  = useState(false)
const [localItems, setLocalItems] = useState<any[]>([]);
const totalAmount = localItems.reduce((acc, item) => {
  if (item?.product?.amount) {
    return acc + item.product.amount;
  }
  return acc;
}, 0);
const dispatch = useDispatch<AppDispatch>()
useEffect(()=>{
  dispatch(getUserCart(token))
}, [dispatch , token])
useEffect(() => {
  setLocalItems(items);
}, [items]);
const handleDelete = (productId: string) => {
  // instantly update UI
  setLocalItems(prev => prev.filter((item: any) => item?.product?._id !== productId));

  // still call redux action + API
  dispatch(removeFromCart(productId, token));
};

const cartItems = localItems.map((item) => ({
  productId: item.product._id,
  amount: item.product.amount, // optional if backend needs
}));

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
const payForCart = async () => {
  try {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1. Create order from backend (send cart items)
    const orderData: any = await dispatch(createCartOrder(token, cartItems));
    if (!orderData?.success) {
      console.log(orderData);
      alert("Failed to create Razorpay cart order");
      return;
    }

    // 2. Razorpay options
    const options: any = {
      key: orderData.key,
      amount: orderData.amount,
      currency: "INR",
      name: "MZCO Store",
      description: "Cart Purchase",
      order_id: orderData.orderId,
      handler: async function (response: any) {
        const payload = {
          orderId: orderData.orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          cartItems, // ✅ include all items to capture
        };

        const captureRes: any = await dispatch(captureCartPayment(token, payload));

        if (captureRes?.success) {
          setAlart(false);
          setNotification("cartOrderCreated");
        } else {
          setAlart(false);
          alert("❌ Cart payment capture failed");
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
    console.error("Razorpay cart payment error:", err);
    alert("Something went wrong with Razorpay cart payment");
  }
};


const handleExplore = async ()=>{
 await localStorage.setItem("activeTab", String(2));
  setIsCart(false)
}
     return <motion.div   className="w-screen fixed top-0 right-0 bg-black h-screen px-2 z-[999] overflow-y-scroll hide-scrollbar lg:w-[23vw]">
      <div>
 <div className='w-full flex justify-between lg:w-[23vw] items-center px-0 z-[100] my-4 '>
              <div className='flex gap-1 items-center justify-center'>
              <button onClick={()=> setIsCart(false)}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Bag</h4></div>
    
            </div>
        {loading ?   <Loading/>: <div>{items?.length === 0 ? <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center flex-col gap-3 "><p>Nothing in the bag</p>
        <button onClick={handleExplore} className="w-fit bg-white h-7 rounded-full text-black flex text-[14px] px-3 flex items-center justify-center ">Explore store</button>
        </div>:<div>
                      { isAlart&& <Alart setAlart={setAlart}  func ={payForCart} nameOfFunc='Proceed'/>}
            <div>
              {localItems.map((item , index)=>{
         
        return         <div key={index}>
          { item?.product && <SwipeToDelete 
               onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}
          onDelete={()=>handleDelete(item?.product._id)}>

                  <CartItemCart asset={item?.product}/>
          </SwipeToDelete>}
                  </div>
              })}
            </div>
            <button onClick={()=>setAlart(true)}  className="bg-white w-[96%] -translate-x-1/2 left-1/2 rounded-[2px] h-6.5 items-center justify-center text-[14px] text-black absolute bottom-5">Proceed order at $ {totalAmount}</button>
            </div>}
            </div>}
            
      </div>

</motion.div>
}