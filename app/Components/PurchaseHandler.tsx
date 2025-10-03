import React, { useEffect, useRef, useState } from 'react'
import { useThemeContext } from '../Context/ThemeContext';
import { useNotification } from '../Context/Notification';
import { useAuth } from '../Context/AuthContext';
import { capturePayment, createOrder } from '../store/actions/payment';
import Alart from './Alart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cart';
import { AppDispatch } from '../store/store';
import { getDownloadLink, handleProductUnlock } from '../store/actions/order';


function PurchaseHandler({productId , amount}) {
const  [isAlart , setAlart] = useState(false)
const dispatch = useDispatch<AppDispatch>()
const { unlocked,  pendingPayments , notification , orderLoading} = useSelector((state: any) => state.freeProducts);
const freeProducts = useRef(null)
const {items} = useSelector((state : any)=>state.cart)
    const {isLightMode} = useThemeContext()
    const {setNotification} = useNotification()
    const {token , user} = useAuth()
  const [customer, setCustomer] = useState({
    name: "",
    email: user?.email || "",
  });


const isAlreadyAddedToCart = items.some((f : any)=> f?.product?._id === String(productId))

const [isAddedToCart  ,setAddedToCart] = useState(isAlreadyAddedToCart )
useEffect(() => {
  setAddedToCart(isAlreadyAddedToCart);
}, [isAlreadyAddedToCart]);
const handleAddToBag = ()=>{
  if(!isAddedToCart){
setAddedToCart(true)
    dispatch(addToCart(productId, token))
    setNotification('addToBag')
  }else{
    setAddedToCart(false)
    dispatch(removeFromCart(productId , token))
    
  }
}
     const unlockToken = unlocked[productId];
     
useEffect(() => {
  if (unlockToken && productId) {
    dispatch(getDownloadLink(productId, unlockToken));
  }
}, [unlockToken, productId, dispatch]);

const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country === "IN" ? "INR" : "USD"; // simple logic
  } catch {
    return "INR"; // fallback
  }
};

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
      const userCurrency = await getUserCurrency();
      console.log(userCurrency)
const orderData: any = await dispatch(
  createOrder(token, productId as string, userCurrency)
);
      // const orderData: any = await dispatch(createOrder(token ,product?._id as string));
      if (!orderData?.success) {
        console.log(orderData)
        alert("Failed to create Razorpay order");
        return;
      }

      // 2. Razorpay options
      const options: any = {
        key: orderData.key,
        amount: orderData.amount,
       currency: orderData.currency,
        name: "Grido",
        description: "A platform for degital  creative",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const payload = {
            orderId: orderData.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            productId: productId
          };
          const captureRes: any = await dispatch(capturePayment(token, payload));

          if (captureRes?.success) {
            setAlart(false)
              setNotification('orderCreated')
              setTimeout(()=>{
                setNotification('moneyReceived')
              }, 1000)
          } else {
            setAlart(false)

            alert("❌ Payment capture failed");
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
        },
theme: {
  color: "#000000",      // Primary color of checkout page
  image: "/logo.png", // Optional logo

}
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay payment error:", err);
      alert("Something went wrong with Razorpay");
    }
  };

//   useEffect(() => {
//   if (freeProducts) {
//     freeProducts.current.innerText = notification;
//     freeProducts.current.style.opacity = 0.6;

//   }
// }, [notification]);
const handleAlart = async()=>{
  if(amount === 0){
        if (!notification && productId) {
      await dispatch(handleProductUnlock(productId, amount, token));
      setNotification('orderCreated')
    }
  }else{
    setAlart(true)

  }
}
const handleBuyNow = async () => {
  if (amount === 0) {
    // Free unlock

  } else {
    // Redirect to custom payment page
   await payWithRazorpay()
         setAlart(false)

};}
  return (
    <div> 
               { isAlart&& <Alart setAlart={setAlart}  func ={handleBuyNow} nameOfFunc='Proceed'/>}
        
         <button ref={freeProducts} onClick={handleAlart} style={{color : isLightMode ? 'white': 'black'}} className={`${isLightMode ? 'bg-black text-white':'bg-white text-black'} w-full rounded-[2px]  h-6 flex items-center justify-center  text-[13.5px] mt-3`}>{orderLoading ? 'Creating order..': amount === 0 ?'Get it for free': 'Buy now'}</button>
  <button onClick={handleAddToBag} className={`border ${isLightMode ? 'border-black  text-black':'border-white text-white'}  w-full rounded-full h-6 flex items-center  justify-center  text-[13.5px] mt-2`}>{isAddedToCart ? 'Added to bag': 'Add to bag'}</button></div>
  )
}

export default PurchaseHandler