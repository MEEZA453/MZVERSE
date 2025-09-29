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
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Header from './Header';
import DynamicOverlay from './DynamicOverlay';
import HighlightOfProduct from './HighlightOfProduct';
import MetaOfProduct from './MetaOfProduct';
import PurchaseHandler from './PurchaseHandler';

export default function ProductPage({selectedProduct}:{selectedProduct?:any}) {
const pathname = usePathname()
const productpath = pathname.split('/');
const {items} = useSelector((state : any)=>state.cart)
const slug = productpath[productpath.length - 1]
const [isMenu , setIsMenu] = useState(false)
const {token} = useAuth()
const [isMobile , setIsMobile] = useState(false)
const dispatch = useDispatch<AppDispatch>()
const {isLightMode} = useThemeContext()
const [product , setProduct] = useState(null)
const productId = usePathname().split('/')[2]
const scrollRef = useRef<HTMLDivElement>(null)
const {rdxProduct , loading} = useSelector((state : any)=> state.design)
const [post, setPost] = useState<any>(null)
const [votes, setVotes] = useState<any[]>([])
const {postsOfAsset} = useSelector((state:any)=>state.attach)

useEffect(() => {
  if (selectedProduct) {
    setProduct(selectedProduct);
  } else {
    console.log("calling api", productId);
    dispatch(getDesignById(productId, token)); // dispatch async action
  }
}, [selectedProduct, productId, dispatch, token]);

// This effect runs whenever rdxProduct updates
useEffect(() => {
  if (rdxProduct) {
    console.log("Updating local product:", rdxProduct);
    setProduct(rdxProduct);
  }
}, [rdxProduct]);

   useEffect(() => {
    dispatch(getUserCart(token))
   }, [dispatch  , slug, token])
   useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])


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
              

                       {isMobile ? <AnimatePresence>{  isMenu ?  <ProductMenu currentData={product} setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> :
                       <AnimatePresence>{  isMenu ?  <ProductMenuLg setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> }
     
      <main  className='desc flex max-sm:flex-col h-screen w-screen  max-sm:items-center'>

<section className='sticky top-0'>
<DynamicOverlay scrollRef={scrollRef}/>
<ImageShower setIsMenu={setIsMenu} isMyProduct = {product?.isMyProduct} name ={product?.name} amount = {product?.amount} isMobile = {isMobile} images = {product?.image}/>
</section>
<Header setIsMenu={setIsMenu} isLightMode={isLightMode}/>
<div  style={{ height: `${product?.image.length * 50 + 50}vh` }} className=' '>
  

        <aside  className={`flex flex-col ${isLightMode ? 'bg-white border-t border-[#dadada]':'bg-black'} pt-3  lg:overflow-y-scroll h-fit py-10 hide-scrollbar -translate-y-32 lg:w-[30vw] rounded-t-[6px] items-center lg:border-l w-screen sticky top-2    lg:mt-24`}>
<HighlightOfProduct name={product?.name} amount={product?.amount} isLightMode={isLightMode} postsOfAsset={postsOfAsset}/>
<div className='w-full mb-2 px-2'>
<MetaOfProduct type={'preset'} creator={product?.createdBy?.handle} size={'2.40GB'} dateOfPosted = {product?.createdAt} isLightMode={isLightMode}/>
<PurchaseHandler amount={product?.amount} productId={product?._id}/>
</div>

{/* <div className='w-full justify-between  flex px-2'>
  <button onClick={()=>setViewUsages(true)} className={`text-[14px] w-full  ${viewUsages ? 'border-b opacity-100':'opacity-60'} duration-100`}>Useages</button>
  <button onClick={()=>setViewUsages(false)} className={`text-[13px] w-full  ${viewUsages ? 'opacity-60':'border-b opacity-100'} duration-100`}>Details of Asset</button>

</div> */}
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

  <div>
<ProductDetails isLightMode={isLightMode} product = {product}/> 
<Suspense><Useages setPost={setPost} setVotes={setVotes} assetId  = {product?._id} token ={token }/></Suspense>
<Suspense><RelatedProducts query ={'Preset'} token={token} productId={product?._id}/></Suspense>  
  </div> 
    

    
        </aside>
</div>


         </main>
    

{/* <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[300] top-0"></div> */}
      
       </div>} 
        
    </div>
  );
}
