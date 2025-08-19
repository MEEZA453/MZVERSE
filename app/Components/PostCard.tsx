'use client'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function PostCard({post}){
      const currentPath  = usePathname  ();
      const router = useRouter()
    const handleClick = (path : string):void=>{
        router.push(`/posts/${path}`)
      }
    return        <div className="mb-2" > <div
        
            
            className="group relative flex flex-col items-center justify-center  overflow-hidden  bg-[#0d0d0d] border-[#1d1d1d] border rounded h-30 w-[45vw] pb-3 lg:h-90 min-h-[200px]"
          >
          {/* <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div> */}
          

{post?.images && post?.images?.length > 0 ? (
  <Image
    onClick={()=>handleClick(post?._id)}
    height={300}
    width={300}
    alt="dff"
    src={post?.images[0]}
    className="w-[45vw] h-fit object-cover lg:mb-4 lg:w-[55%]"
    priority
  />
) : null}

           
          </div>
           <div className="     flex justify-between items-center w-full pr-3 z-100  duration-200 ">
                        <div className="flex items-center  gap-1">
                          <button onClick={()=>router.push('/'+post?.createdBy?.handle)}><Image  
            height={300}
            width={300}
            alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src={post?.createdBy?.profile || '/image.png'}/></button>  
              <div>
                          <h3 className='mt-2'>{post.name}  </h3>
                          <p style={{fontSize : '12px'}} className=''>@{post?.createdBy?.handle}  </p>
          
          
              </div>
                           {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                        </div>
                        
                      </div>
          </div>
}