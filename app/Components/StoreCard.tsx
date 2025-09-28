'use client'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";
import { useThemeContext } from "../Context/ThemeContext";
import Link from "next/link";
export default function PostCard({product, openProduct}){
  const {isLightMode} = useThemeContext()

      const currentPath  = usePathname  ();
  
      const router = useRouter()
   
    return        <div className="mb-2" > <div
        
           
            className={`group relative flex flex-col items-center  justify-center overflow-hidden ${isLightMode?'card-light':'card-dark'} border rounded h-30 w-[43vw] lg:w-full  lg:h-100 min-h-[200px]`}
          >
          {/* <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div> */}
          

{product?.image && product?.image?.length > 0 ? (

          
              <Image
              onClick={()=>openProduct(product)}
                height={300}
                width={300}
                alt={product?.name || "Asset"}
                src={product.image[0]}
                className="w-full h-fit object-cover flex items-center justify-center lg:mb-4"
                priority
              />
           
    
) :null}
  <div className="absolute pointer-events-none w-full h-40 bg-gradient-to-b from-[#fffffff] to-[#00000000] z-[50] top-0"></div>
            <div className={`  absolute bottom-0 ${!isLightMode ? 'bg-white/80':'bg-black/80'} flex h-6 px-2 justify-between items-center w-full  z-100  duration-200 `}>
                        <div className="flex items-center  gap-1">
                
              <div>
                          <h3  style={{color :isLightMode ? 'white':'black'}}>{product.name || 'My post'}  </h3>
          
          
              </div>
                           <p style={{fontSize : '10px', color :isLightMode ? 'white':'black'}}>by @meeza</p>    
                        </div>
                       
                      </div>

                        <div className="flex absolute top-1 px-1  w-full items-center justify-between">

  <div className="     flex justify-between items-center w-full pr-3 z-100  duration-200 ">
                       
                
                      </div>
             <label  className={`${isLightMode ? 'bg-black text-white':'bg-white text-black'} px-1.5 z-[100] flex items-center justify-center py-2.5  `} style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                        }}>{product?.amount ? '$':null}{product?.amount || 'free'}</label>
          </div>
            </div>
          
          </div>
}
//  <div className="flex items-center  gap-1">
//                           <button onClick={()=>router.push('/'+product?.postedBy?.handle)}><Link href={`/${product?.postedBy?.handle}`} prefetch>
            
//                 <Image
//                   height={300}
//                   width={300}
//                   alt={product?.postedBy?.handle || "profile"}
//                   src={product?.postedBy?.profile || "/image.png"}
//                   className="h-6 w-6 rounded-full object-cover"
//                 />
            
//             </Link></button>  
//                    <p style={{fontSize : '10px', color : 'black'}}>@meeza</p>
//                            {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
//                         </div>