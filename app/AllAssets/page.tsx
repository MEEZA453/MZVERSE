'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useState} from 'react'
import Notification from '../Components/Notification';
import Loading from '../Components/loading'

import { MdOutlineAttachFile } from "react-icons/md";

export default function AllAssets() {
  const currentPath  = usePathname();


  const router = useRouter();
  const [red , setRed ] = useState(false)
  const { data , loading }: { data: Product[] , loading : boolean } = useAssets();
  const handleClick = (path : string):void=>{
    router.push(currentPath + '/'+path)
  }


  return (
    <div className='w-screen'>
      <Notification/>
      <MasterNavber />
     

   {   !loading ? <div className='lg:grid-cols-5  grid-cols-2 px-2 grid'>
        {data?.map((product, index) => (
          <div   key={index} >
          <div
        
          
            className=" relative flex flex-col items-center  justify-center  border-b border-r border-[#4d4d4d] h-60 pb-3 lg:h-90 min-h-[220px]"
          >
          <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div>

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
    className="w-[75%] lg:mb-4 lg:w-[55%]"
    priority
  />
) : null}

           
     
           <div className=" absolute pb-2  flex justify-between items-center w-full pr-3 z-100 bottom-0 left-1 duration-200 ">
              <div className="flex items-center  gap-1">
                  <Image  
  height={300}
  width={300}
  alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
    <div>
                <h3 className=''>{product.name}  </h3>
                <p style={{fontSize : '13px'}} className=''>@madyby  </p>


    </div>
                 {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
              </div>
              <h6 >${product.amount}</h6>
            </div>
                 </div>
          </div>
        ))}
      </div> : <Loading/>}
<div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[900] top-0"></div>

    </div>
  );
}
