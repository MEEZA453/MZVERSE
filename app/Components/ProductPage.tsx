'use client'
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import { Product } from '../types/Product';
import { HiOutlineLink } from "react-icons/hi2";
import MasterNavber from './MasterNavber';
import ProductImages from './ProductImages'
import Loading from './loading'
import { PiHeartLight } from "react-icons/pi";
import { GoHeartFill } from "react-icons/go";

import { useShowInput } from '../Context/ShowInputContext';
import { useState  , useEffect, useRef, Suspense} from 'react';
import Notification from './Notification';
import { useNotification } from '../Context/Notification';
import { addToFavorites , removeFromFavorites } from '../store/actions/fav';
import { useDispatch , useSelector} from 'react-redux';
import { AppDispatch } from '../store/store';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';
import ProductMenu from './ProductMenu';
import { useAuth } from '../Context/AuthContext';
import { FaArrowDown } from 'react-icons/fa';
import { SlArrowDown } from 'react-icons/sl';
import ImageShower from './ImageShower';
import { IoIosArrowBack } from 'react-icons/io';
import Useages from './Useges';
import ProductMenuLg from './ProductMenuLg';
import { getDesignById } from '../store/actions/design';
import { addToCart, getUserCart, removeFromCart } from '../store/actions/cart';
import { getDownloadLink, handleProductUnlock } from '../store/actions/order';
import Alart from './Alart';
import { capturePayment, createOrder } from '../store/actions/payment';
import { useThemeContext } from '../Context/ThemeContext';
import Post from './Post';

export default function ProductPage({selectedProduct}:{selectedProduct:any}) {
const pathname = usePathname()

const [openIndex, setOpenIndex] = useState(0);

const productpath = pathname.split('/');
const {items} = useSelector((state : any)=>state.cart)
  const { unlocked,  pendingPayments , notification , orderLoading} = useSelector((state: any) => state.freeProducts);
const freeProducts = useRef(null)
const [isMobile , setIsMobile] = useState(false)
const {role  } = useAuth()
const [red ,setRed ] = useState(false)
const {setShowLoginInput , setShowSignupInput , showLoginInput , showSignupInput} = useShowInput()
const slug = productpath[productpath.length - 1]
const [isPayment , setOpenPayment] = useState(false)
const [isMenu , setIsMenu] = useState(false)
const {token , user} = useAuth()
  const [opacity, setOpacity] = useState(0); // start at 0
const  [isAlart , setAlart] = useState(false)
const dispatch = useDispatch<AppDispatch>()
const {isLightMode} = useThemeContext()
const [product , setProduct] = useState(null)
const loading = false
  const [viewUsages , setViewUsages]  = useState(true)
  const router  = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
// const {product , loading} = useSelector((state : any)=> state.design)
const {setNotification} = useNotification()
const isAlreadyAddedToCart = items.some((f : any)=> f?.product?._id === String(product?._id))
  const [post, setPost] = useState<any>(null)
  const [votes, setVotes] = useState<any[]>([])
    const {postsOfAsset} = useSelector((state:any)=>state.attach)
// console.log(items[0].product?._id , product?._id)
const [isAddedToCart  ,setAddedToCart] = useState(isAlreadyAddedToCart ?? false)

  useEffect(() => {
    setAddedToCart(isAlreadyAddedToCart);
  }, [isAlreadyAddedToCart]);

useEffect(()=>{
if(selectedProduct){
  setProduct(selectedProduct)
}
},[selectedProduct])
   useEffect(() => {
    dispatch(getUserCart(token))
   }, [dispatch  , slug, token])
   useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
useEffect(() => {
  if (freeProducts.current) {
    freeProducts.current.innerText = notification;
    freeProducts.current.style.opacity = 0.6;

  }
}, [notification]);
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrollY = scrollRef.current.scrollTop
      const maxScroll = 300
      const newOpacity = Math.min(scrollY / maxScroll, 0.6)
      setOpacity(newOpacity)
    }

    const container = scrollRef.current
    container?.addEventListener("scroll", handleScroll)

    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])


useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300; // adjust scroll distance where opacity reaches 0.6
      const newOpacity = Math.min(scrollY / maxScroll, 0.6); 
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isFavorited = false


const handleAddToBag = ()=>{
  if(!isAddedToCart){
setAddedToCart(true)
    dispatch(addToCart(product?._id , token))
    setNotification('addToBag')
  }else{
    setAddedToCart(false)
    dispatch(removeFromCart(product?._id , token))
    
  }
}
     const unlockToken = unlocked[product?._id];
     
useEffect(() => {
  if (unlockToken && product?._id) {
    dispatch(getDownloadLink(product._id, unlockToken));
  }
}, [unlockToken, product?._id, dispatch]);

const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country === "IN" ? "INR" : "USD"; // simple logic
  } catch {
    return "INR"; // fallback
  }
};


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
      const userCurrency = await getUserCurrency();
      console.log(userCurrency)
const orderData: any = await dispatch(
  createOrder(token, product?._id as string, userCurrency)
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
            productId: product?._id
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

const handleAlart = async()=>{
  if(product?.amount === 0){
        if (!notification && product?._id) {
      await dispatch(handleProductUnlock(product._id, product?.amount, token));
      setNotification('orderCreated')
    }
  }else{
    setAlart(true)

  }
}
const handleBuyNow = async () => {
  if (product?.amount === 0) {
    // Free unlock

  } else {
    // Redirect to custom payment page
   await payWithRazorpay()
         setAlart(false)

};}

  return (
    <div style={{backgroundColor : isLightMode ? 'white': 'black'}} ref={scrollRef} className='fixed top-0 left-0 z-[9999] hide-scrollbar w-screen h-screen overflow-y-auto '>

  <Notification/>
       {/* <MasterNavber setShowSignupInput={setShowSignupInput} setShowLoginInput={setShowLoginInput}/> */}

      { loading || !product? <Loading/> :<div>
          {(post ) && (
                        <div className='abso'>
                
                         <Post catchedPost={post} catchedVotes={votes}/>
                        </div>
                      )}
                           { isAlart&& <Alart setAlart={setAlart}  func ={handleBuyNow} nameOfFunc='Proceed'/>}

                       {isMobile ? <AnimatePresence>{  isMenu ?  <ProductMenu currentData={product} setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> :
                       <AnimatePresence>{  isMenu ?  <ProductMenuLg setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> }
     
      <main  className='desc flex max-sm:flex-col h-screen w-screen  max-sm:items-center'>

<section className='sticky top-0'>
<div       style={{ opacity }} className={`h-full absolute pointer-events-none top-0 z-[99] w-full bg-black }`}></div>
        <ImageShower setIsMenu={setIsMenu} isMyProduct = {product?.isMyProduct} name ={product?.name} amount = {product?.amount} isMobile = {isMobile} images = {product?.image}/>
</section>
       <div className={`${isLightMode ? 'bg-white border-[#dadada]':'bg-black border-[#4d4d4d]'} h-9 z-[10] border-b w-screen px-2 absolute top-0 flex justify-between w-full items-center`}>
       <button onClick={()=> router.back()}>
                       <IoIosArrowBack  color={isLightMode ? 'black': 'white'} size={17} />
                       
                       </button>
                                             <button 
      className="text-white" 
      onClick={() => setIsMenu(true)}
    >
      <HiOutlineDotsVertical  color={isLightMode ? 'black': 'white'}/>
    </button>
       </div>
{/* <div className='absolute top-16 left-3 flex justify-between z-[999] w-[92vw]  lg:w-[68vw]'>
 <div  className='flex gap-[2px] lg:gap-2 items-center  '>

          <Image  
  height={300}
  width={300}
  alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                <h3 className='opacity-[0.66]'>meeza_29</h3>
            </div> 
              <button className='absolute z-[999] top-14 left-5 text-white' onClick={()=> {setIsMenu(true)}}><HiOutlineDotsVertical/></button>

              
        <AnimatePresence>{  isMenu ?  <ProductMenu setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> 
           
</div> */}
<div  style={{ height: `${product?.image.length * 50 + 50}vh` }} className=' '>
  

        <aside  className={`flex flex-col ${isLightMode ? 'bg-white border-t border-[#dadada]':'bg-black'} pt-3  lg:overflow-y-scroll h-screen hide-scrollbar -translate-y-24 lg:w-[30vw] rounded-t-[6px] items-center  w-screen sticky top-2    lg:mt-14`}>
            <div className='flex gap-1 items-center justify-between w-full px-2 mb-4'>
                     
                    <div className='flex gap-1  items-center'>
                      <h5   className="" style={{color : isLightMode ?'black': 'white'}}>{product?.name}</h5> <label className={`bg-white text-black px-1.5 flex items-center justify-center py-2.5 ${isLightMode ? 'tab-light':'tab-dark'}`} style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                            }}>{product?.amount === 0 ? null : '$'}{product?.amount === 0 ? 'free':product?.amount}</label>  </div>
                            
                             <div className="flex items-center">
                              <h3>Voted by</h3>
                              {postsOfAsset.slice(0, 3).map((post, i) => (
                                <div key={i} className={i !== 0 ? "-ml-2" : ""}>
                                  <Image
                                    onClick={() => router.push(`/${post?.createdBy?.handle}`)}
                                    height={100}
                                    width={100}
                                    alt="profile pic"
                                    src={post?.createdBy?.profile || "/image.png"}
                                    className={`h-6 w-6 rounded-full object-cover border-2 ${isLightMode?'border-white':'border-black'}`}
                                  />
                                </div>
                              ))}
                              <div  className={`h-6 w-6 rounded-full bg-black flex items-center justify-center border-2 -ml-2 font-[inter-light] ${isLightMode?'border-white bg-black text-white':'border-black bg-white text-black'}`}>+</div>
                            </div>
                            </div>
<div className='w-full mb-8 px-2'>
  <div className={`w-full mt-0.5 ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'}   pb-1 flex border-b justify-between items-center`}>
    <h3 >createdBy:</h3>
    <h3 >@immeeza</h3>
  </div>
 <div className={`w-full mt-0.5 ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'} pb-1 flex border-b justify-between items-center`}>
    <h3>Supply type:</h3>
    
            <label style={{fontSize:'14px'}} className={`' ${isLightMode?'bg-[#dadada] text-black':'bg-[#4d4d4d] text-[#dadada]'} rounded-[3px] px-2 `}>Preset</label>
        
  </div>
<div className={`w-full  mt-0.5 ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'} pb-1 flex border-b justify-between items-center`}>
    <h3 >Size:</h3>
    <h3 >2.0GB</h3>
  </div>
  <button ref={freeProducts} onClick={handleAlart} style={{color : isLightMode ? 'white': 'black'}} className={`${isLightMode ? 'bg-black text-white':'bg-white text-black'} w-full rounded-[2px]  h-6 flex items-center justify-center  text-[14px] mt-4`}>{orderLoading ? 'Creating order..':  product?.amount === 0 ?'Get it for free': 'Buy now'}</button>
  <button onClick={handleAddToBag} className={`border ${isLightMode ? 'border-black  text-black':'border-white text-white'}  w-full rounded-full h-6 flex items-center pb-1 justify-center  text-[14px] mt-2`}>{isAddedToCart ? 'Added to bag': 'Add to bag'}</button>


</div>

<div className='w-full justify-between  flex px-2'>
  <button onClick={()=>setViewUsages(true)} className={`text-[14px] w-full  ${viewUsages ? 'border-b opacity-100':'opacity-60'} duration-100`}>Useages</button>
  <button onClick={()=>setViewUsages(false)} className={`text-[13px] w-full  ${viewUsages ? 'opacity-60':'border-b opacity-100'} duration-100`}>Details of Asset</button>

</div>
         {/* <div className='pricing flex flex-col justify-between pb-4 relative bg-white h-40 rounded w-[96%] '>
            <div className='name flex gap-1 px-2 items-center'>
            <h4 className='text-black'>{product?.name}</h4>    <label className="text-white mt-1.5 bg-black px-1.5 flex items-center justify-center py-2.5 " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '13px'
                        }}>$ 29.99</label>
            </div>
            <div className='buttons px-1 relative flex flex-col items-center gap-1'>
              <button className='buy w-full h-7 bg-black text- rounded pb-1'>Buy now</button>
              <button  className='buy w-full h-7 border rounded-full border-black pb-1 text-black'>View Profile</button>

            </div>
         </div> */}

<div className='h-full'>
{
  viewUsages? <Suspense><Useages setPost={setPost} setVotes={setVotes} assetId  = {product?._id} token ={token }/></Suspense>  :     <div className='details h-full mt-10'>
         <div className='section-details'>
          {product?.sections.map((section , index)=>{
            return <div  className={` h-fit  mb-2 duration-500`} key={index}>
              <div className=' flex justify-between items-center w-screen  lg:w-[30vw]   px-3'>
              <h4  className='mb-1   w-full '> {section.title}</h4>

              </div>
              <div className={`px-2 duration-200 delay-200`}>{section.content.map((el , i)=>{
                return <p style={{opacity}} className='mb-0.5' key={i}>- {el}</p>
              })}</div>
            </div>
          })}
         </div>
         <div className='hashtags'>
          <h4 className='  mb-2 px-3 w-screen lg:w-[30vw]'>Tags</h4>
          <div className='flex px-3 gap-2'>

          {product?.hashtags?.map((el , i)=>{
            return <label key={i} className={` ${isLightMode?'bg-[#dadada] text-black':'bg-[#4d4d4d] text-[#dadada]'} px-2`}>#{el}</label>
            
          })}
          </div>
         </div>
      </div>
}
  </div>       

    
        </aside>
</div>


         </main>
    

{/* <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[300] top-0"></div> */}
      
       </div>} 
        
    </div>
  );
}
