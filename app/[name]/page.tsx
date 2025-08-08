'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Notification from '../Components/Notification'
import { AppDispatch } from '../store/store'
import  Loading from '../Components/loading'
import {useAuth } from '../Context/AuthContext'
import { useDispatch  ,useSelector } from 'react-redux'
import { IoMenuOutline } from "react-icons/io5";
import Image from 'next/image'
import { getFavorites } from '../store/actions/fav'
import { getProductById  , getUserByHandle} from '../store/actions/auth'
import { MdOutlineAttachFile } from "react-icons/md";

export default function Account() {
const dispatch = useDispatch<AppDispatch>();
const {logout} = useAuth()
const pathname = usePathname();
const userHandle = pathname.split('/').pop();
const [token , setToken] = useState('')
    
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile')
      if (profile) {
        const parsedUser = JSON.parse(profile)
        setToken(parsedUser.token)
      }
    }
  }, [])
   useEffect(() => {
    if (token) {
      dispatch(getFavorites(token));
    }
  }, [dispatch, token]);
  const { favourites } = useSelector((state: any) => state.favourites);

console.log( 'fav list is ',favourites)


useEffect(()=>{
 dispatch(getProductById(userHandle))
},[userHandle])
useEffect(()=>{
  if (userHandle) dispatch(getUserByHandle(userHandle));
  }, [userHandle]);



const { user } = useSelector((state: any) => state.auth);

console.log(user);
const { product, loading, error } = useSelector((state: any) => state.getProductOfUser || {});
  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = ['Assets', 'Favourait', 'About']
const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
console.log(product)
  return (
    <div className='w-screen overflow-hidden'>
      <Notification/>
      <div className='absolute w-screen flex justify-between px-2 top-2 '>
      <h5 > </h5>

<IoMenuOutline onClick={()=>logout()} className='  text-white  rounded-[2px]'  size={24}/>
      </div>
{loading ? <Loading/> : <div> 
      <div className='profile relative flex flex-col h-90 border-b border-[#4d4d4d] gap-3 mt-10 items-center justify-center w-screen'>
        <Image height = {300} width = {300}
          className='h-24 w-24 rounded-full bg-[#dadada] object-cover'
          src={user?.profile || '/image.png'}
          alt ='profile' 
        />
        {/* <h5 style={{fontSize : '17px', lineHeight : -1 ,marginTop : 4}}>{user?.name}</h5> */}
      {/* <p  style={{lineHeight : -0.3}}>{user?.bio}</p> */}
 
        <div className='flex gap-1 mt-2'>
          <button className='border rounded text-[14px] px-4 py-0.5'>Instagram</button>
          <button className='bg-white text-black text-[14px] px-4 py-0.5 rounded'>Hire now</button>
        </div>

        <div className='w-screen absolute bottom-1 flex justify-around gap-3'>
          {tabs.map((tab, index) => (
            <h6
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer ${index === activeIndex ? 'text-white':'text-[#767676]'} text-sm`}
            >
              {tab}
            </h6>
          ))}
        </div>

        {/* Slider */}
        <div
          className='h-[2px] w-[33.33vw] -translate-x-[33.33vw] bg-white absolute bottom-0 transition-transform duration-500'
          style={{ transform: `translateX(${activeIndex * 33.33}vw)` }}
        />
      </div>

{ !loading ? <div className='w-[300vw] flex duration-500' style={{transform :`translate(${-activeIndex*100}vw)`}}>

  <div className='assets w-screen h-90'>
     <div className='lg:grid-cols-5 grid-cols-2 grid'>
    {product?.map((product:any, index : number) => (
             <div
           
               key={index}
               className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-32 pb-3 lg:h-90 min-h-[220px]"
             >
               <div  className='flex px-1 py-0.5 items-center absolute top-2 rounded-[2px] bg-white/75  right-2'><MdOutlineAttachFile className='text-black   ' size={17}/><h6 className='text-black'>3</h6></div>
               {/* <button onClick={handleFavClick} className='absolute top-2 left-2' >{red ? <GoHeartFill size={18}className='text-red-600'/>:<PiHeartLight size={18} className='text-[#4d4d4d]' />}</button> */}
               {/* <div  className='flex gap-[2px] lg:gap-2 items-center absolute top-2 left-1'>
   
             <Image  
     height={300}
     width={300}
     alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                   <h3 className='opacity-[0.66]'>meeza_29</h3>
               </div> */}
   
   {product.image && product.image.length > 0 ? (
     <Image
       onClick={()=>handleClick(product._id)}
       height={300}
       width={300}
       alt="dff"
       src={product.image[0]}
       className="w-[55%] lg:mb-4 lg:w-[55%]"
       priority
     />
   ) : null}
   
               <div className="absolute  group-hover:-translate-y-5 duration-200 left-2 top-[88%]">
                 <div className="flex items-center gap-2">
                   <h6 className=''>{product.name}  </h6>
                    {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                 </div>
                 <div className='flex gap-1'>
                   {product?.hastags?.map((h , i)=>{
                     return  <p key={i} className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   #{h} 
                 </p>
                   })}
                 </div>
                
               </div>
             </div>
           ))}
      </div> 
  </div>
<div className='fav w-screen h-90'>
     <div className='lg:grid-cols-5 grid-cols-2 grid'>
    {favourites?.map((product:any, index : number) => (
             <div
           
               key={index}
               className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-32 pb-3 lg:h-90 min-h-[220px]"
             >
               
               
               {/* <button onClick={handleFavClick} className='absolute top-2 left-2' >{red ? <GoHeartFill size={18}className='text-red-600'/>:<PiHeartLight size={18} className='text-[#4d4d4d]' />}</button> */}
               {/* <div  className='flex gap-[2px] lg:gap-2 items-center absolute top-2 left-1'>
   
             <Image  
     height={300}
     width={300}
     alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                   <h3 className='opacity-[0.66]'>meeza_29</h3>
               </div> */}
   
   {product.image && product.image.length > 0 ? (
     <Image
       onClick={()=>handleClick(product._id)}
       height={300}
       width={300}
       alt="dff"
       src={product.image[0]}
       className="w-[55%] lg:mb-4 lg:w-[55%]"
       priority
     />
   ) : null}
   
               <div className="absolute  group-hover:-translate-y-5 duration-200 left-2 top-[88%]">
                 <div className="flex items-center gap-2">
                   {/* <h6 className=''>{product.name}  </h6> */}
                    {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                 </div>
                 <div className='flex gap-1'>
                   {product?.hastags?.map((h:string , i:number)=>{
                     return  <p key={i} className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   #{h} 
                 </p>
                   })}
                 </div>
                
               </div>
             </div>
           ))}
      </div> 
  </div>

  <div className='About w-screen h-90'></div>

</div>: <Loading/> }
</div>}

    </div>
  )
}
