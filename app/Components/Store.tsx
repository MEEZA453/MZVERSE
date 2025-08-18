import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { getProductById } from "../store/actions/auth";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import Loading from './loading'
import { MdOutlineAttachFile } from "react-icons/md";
import StoreCard from "./StoreCard";
export default function Store(){
    const dispatch = useDispatch<AppDispatch>();
const pathname = usePathname();
const userHandle = pathname.split('/').pop();
useEffect(()=>{
      if (!userHandle) return; 
    console.log('getting')
 dispatch(getProductById(userHandle))
},[userHandle ])

    const { product, loading, error } = useSelector((state: any) => state.getProductOfUser || {});
    return   <div>
      {product?.length > 0 ? <div className='assets border-t  border-[#4d4d4d] w-screen h-full'>
    { !loading ? <div className='lg:grid-cols-5 grid-cols-2 grid px-2'>
    {product?.map((product:any, index : number) => (
      <div
      
      key={index}
      className=""
      >
               {/* <button onClick={handleFavClick} className='absolute top-2 left-2' >{red ? <GoHeartFill size={18}className='text-red-600'/>:<PiHeartLight size={18} className='text-[#4d4d4d]' />}</button> */}
               {/* <div  className='flex gap-[2px] lg:gap-2 items-center absolute top-2 left-1'>
   
             <Image  
             height={300}
             width={300}
             alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
             <h3 className='opacity-[0.66]'>meeza_29</h3>
             </div> */}
   
   <StoreCard product = {product}/>
             </div>
           ))}
      </div> : <Loading/>}
  </div>:<p className="text-center w-screen mt-10">{`You have'nt add a product yet.`}</p>}
           </div>
}