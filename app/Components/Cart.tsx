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
export default function Cart({setIsCart}){
const {token} = useAuth()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
const {items , loading} = useSelector((state : any)=>state.cart)
const [localItems, setLocalItems] = useState<any[]>([]);
const totalAmount = localItems.reduce((acc , item , i )=>{
 acc += item?.product?.amount
 return acc
}, 0)
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
        <button className="w-fit bg-white h-7 rounded-full text-black flex text-[14px] px-3 flex items-center justify-center ">Explore store</button>
        </div>:<div>
            <div>
              {localItems.map((item , index)=>{
         
        return         <div key={index}>
          <SwipeToDelete 
               onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}
          onDelete={()=>handleDelete(item?.product._id)}>

                  <CartItemCart asset={item?.product}/>
          </SwipeToDelete>
                  </div>
              })}
            </div>
            <button className="bg-white w-[96%] -translate-x-1/2 left-1/2 rounded-[2px] h-6 items-center justify-center text-[14px] text-black absolute bottom-5">Proceed order at $ {totalAmount}</button>
            </div>}
            </div>}
            
      </div>

</motion.div>
}