'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useState} from 'react'
import Login from '../Components/Login'
import Loading from '../Components/loading'
import { useShowInput } from '../Context/ShowInputContext';
import { useAuth } from '../Context/AuthContext';
export default function AllAssets() {
  const currentPath  = usePathname()
  const {showInput , setShowInput } = useShowInput()
  const router = useRouter();
  const { data , loading }: { data: Product[] , loading : boolean } = useAssets();
  console.log(data);
  const handleClick = (path : string):void=>{
    router.push(currentPath + '/'+path)
  }

  return (
    <div className='w-screen'>
      <MasterNavber setShowInput={setShowInput}/>
      {showInput ? <div className='z-[999] fixed   bg-black/70 h-screen w-screen '><Login setShowInput={setShowInput}/></div>:null}
   {   !loading ? <div className='lg:grid-cols-5 grid-cols-3 grid'>
        {data.map((product, index) => (
          <div
          onClick={()=>handleClick(product._id)}
            key={index}
            className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-14 lg:h-90 min-h-[190px]"
          >
            <div  className='flex gap-1 lg:gap-2 items-center absolute top-2 left-1'>

         <img className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                <h3 className='opacity-[0.66]'>meeza_29</h3>
            </div>

  <Image  
  alt='' 
  height={400} 
  width={300} 
  src={product.image[0]}  
  className="w-[70%]  lg:mb-4  lg:w-[55%]"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
            <div className="absolute  group-hover:-translate-y-7 duration-200 left-2 top-[88%]">
              <div className="flex items-center gap-2">
                <h5>{product.name}</h5>
                 {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
              </div>
              <p className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.headline} 
              </p>
            </div>
          </div>
        ))}
      </div> : <Loading/>}
    </div>
  );
}
