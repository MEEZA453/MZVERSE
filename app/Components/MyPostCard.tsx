'use client'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useThemeContext } from "../Context/ThemeContext";
export default function MyPostCard({post, openPost}){
      const currentPath  = usePathname  ();
      const {isLightMode} = useThemeContext()
      const router = useRouter()

    return        <div className="mb-2" > <div
        
            
            className={`group relative flex flex-col items-center justify-center  overflow-hidden  ${isLightMode ? 'bg-[#ededed] border-[#dadada]':'bg-[#0d0d0d] border-[#1d1d1d]'} border rounded h-30 w-[43vw] lg:w-full  lg:h-100 min-h-[200px]`}
          >
          {/* <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div> */}
          

{post?.images && post?.images?.length > 0 ? (
  <Image
      onClick={()=>openPost(post)}

    height={300}
    width={300}
    alt="dff"
    src={post?.images[0]}
    className="w-[45vw] h-fit object-cover lg:mb-4 lg:w-[20vw]"
    priority
  />
) : null}

           
          </div>
       
          </div>
}