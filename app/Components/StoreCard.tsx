'use client'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";
import { useThemeContext } from "../Context/ThemeContext";
import Link from "next/link";
export default function PostCard({product}){
  const {isLightMode} = useThemeContext()
      const currentPath  = usePathname  ();
  
      const router = useRouter()
    const handleClick = (path : string):void=>{
        router.push(`/AllAssets/${path}`)
      }
    return        <div className="mb-2" > <div
        
            onClick={()=>handleClick(product?._id)}
            className={`group relative flex flex-col items-center  justify-center overflow-hidden ${isLightMode?'card-light':'card-dark'} border rounded h-30 w-[43vw] lg:w-full  lg:h-100 min-h-[200px]`}
          >
          {/* <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div> */}
          

{product?.image && product?.image?.length > 0 ? (
 <Link  href={{
    pathname: `/posts/${product._id}`,
    query: { data: JSON.stringify(product) } // pass the full post as a string
  }} prefetch>
          
              <Image
                height={300}
                width={300}
                alt={product?.name || "Asset"}
                src={product.image[0]}
                className="w-full h-fit object-cover flex items-center justify-center lg:mb-4"
                priority
              />
           
          </Link>
) : null}

            {/* <div className="   absolute bottom-0 bg-white/40 flex h-6 px-2 justify-between items-center w-full  z-100  duration-200 ">
                        <div className="flex items-center  gap-1">
                
              <div>
                          <h3 >{product.name || 'My post'}  </h3>
          
          
              </div>
                       
                        </div>
                       
                      </div> */}

                        <div className="flex absolute top-1 px-1  w-full items-center justify-between">

  <div className="     flex justify-between items-center w-full pr-3 z-100  duration-200 ">
                        <div className="flex items-center  gap-1">
                          <button onClick={()=>router.push('/'+product?.postedBy?.handle)}><Link href={`/${product?.postedBy?.handle}`} prefetch>
            
                <Image
                  height={300}
                  width={300}
                  alt={product?.postedBy?.handle || "profile"}
                  src={product?.postedBy?.profile || "/image.png"}
                  className="h-6 w-6 rounded-full object-cover"
                />
            
            </Link></button>  
              <div>
                          <h3 className='mt-2'>{product.name}  </h3>
                          <p style={{fontSize : '12px'}} className=''>@{product?.postedBy?.handle}  </p>
          
          
              </div>
                           {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                        </div>
                        
                      </div>
             <label className="bg-white text-black px-1.5 flex items-center justify-center py-2.5 " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                        }}>{product?.amount ? '$':null}{product?.amount || 'free'}</label>
          </div>
            </div>
          
          </div>
}