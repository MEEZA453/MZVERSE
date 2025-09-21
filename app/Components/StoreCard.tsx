'use client'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function PostCard({product}){
      const currentPath  = usePathname  ();
  
      const router = useRouter()
    const handleClick = (path : string):void=>{
        router.push(`/AllAssets/${path}`)
      }
    return        <div className="mb-2" > <div
        
            onClick={()=>handleClick(product?._id)}
            className="group relative flex flex-col items-center justify-center overflow-hidden  bg-[#0d0d0d] border-[#1d1d1d] border rounded h-30 w-[43vw] lg:w-full  lg:h-100 min-h-[200px]"
          >
          {/* <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div> */}
          

{product?.image && product?.image?.length > 0 ? (
  <Image
    onClick={()=>handleClick(product?._id)}
    height={300}
    width={300}
    alt="dff"
    src={product?.image[0]}
    className="w-full h-fit object-cover flex items-center justify-center lg:mb-4 "
    priority
  />
) : null}

            <div className="   absolute bottom-0 bg-white/40 flex h-6 px-2 justify-between items-center w-full  z-100  duration-200 ">
                        <div className="flex items-center  gap-1">
                
              <div>
                          <h3 >{product.name || 'My post'}  </h3>
          
          
              </div>
                           {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                        </div>
                       
                      </div>

                        <div className="flex absolute top-1 px-1  w-full items-center justify-between">


                                <button onClick={()=>router.push('/'+product?.createdBy?.handle)}><Image  
            height={300}
            width={300}
            alt='fdfdf'  className='h-7 w-7 rounded-full items-center object-cover' src={product?.postedBy?.profile || '/image.png'}/></button>  
             <label className="bg-white text-black px-1.5 flex items-center justify-center py-2.5 " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                        }}>{product?.amount ? '$':null}{product?.amount || 'free'}</label>
          </div>
            </div>
          
          </div>
}