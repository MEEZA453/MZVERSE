'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useState} from 'react'

import Login from '../Components/Login'
import JoinCommunityInput from '../Components/JoinCommunity';
import Loading from '../Components/loading'
import { useShowInput } from '../Context/ShowInputContext';
import { MdOutlineAttachFile } from "react-icons/md";

import { useAuth } from '../Context/AuthContext';
import { HiOutlineLinkSlash } from 'react-icons/hi2';
export default function AllAssets() {
  const currentPath  = usePathname();
  const showCreateProduct = true;
  const {showLoginInput , setShowLoginInput  , setShowSignupInput , showSignupInput } = useShowInput()
  const router = useRouter();
  const [red , setRed ] = useState(false)
  const { data , loading }: { data: Product[] , loading : boolean } = useAssets();
  const handleClick = (path : string):void=>{
    router.push(currentPath + '/'+path)
  }


  return (
    <div className='w-screen'>
      <MasterNavber setShowSignupInput={setShowSignupInput} setShowLoginInput={setShowLoginInput}/>
     
      {showLoginInput ? <div className='z-[999] fixed  -translate-y-20  bg-black/70 h-screen w-screen '><Login setShowLoginInput={setShowLoginInput}/></div>:null}
      {showSignupInput ? <div className='z-[999] fixed flex -translate-y-20 items-center justify-center   bg-black/70 h-screen w-screen '><JoinCommunityInput setShowSignupInput={setShowSignupInput}/></div>:null}
   {   !loading ? <div className='lg:grid-cols-5 grid-cols-2 grid'>
        {data?.map((product, index) => (
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
      </div> : <Loading/>}
<div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[900] top-0"></div>

    </div>
  );
}
