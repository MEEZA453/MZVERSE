import Image from "next/image"
import { useRouter } from "next/navigation"
import { useThemeContext } from "../Context/ThemeContext"
export default function ApproveAttachNotification ({noti}){
    const  {isLightMode} = useThemeContext()
    const router = useRouter()
    return <div onClick={()=>router.push(`/${noti?.sender?.handle}`)} className={`h-12 justify-between w-full ${isLightMode ? 'bg-[#ededed]': 'bg-[#151515]'} flex items-center gap-1 mb-0.5 rounded  px-2`}>
        <div className="flex gap-1.5 items-center">

        <Image src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
        {/* <h6 >@{noti?.sender?.handle}</h6> */}
        <h6 >@{noti?.sender?.handle} approved your attachment</h6>
        </div>
<div className=" relative mt-1">
 <Image onClick={()=>router.push(`/posts/${noti?.post?._id}`)} src = {noti?.meta?.postImage|| '/starlight.webp'} width = {100} height = {100} alt = 'profile' className = 'w-7 absolute z-100 left-0 -translate-x-3 -translate-y-1 top-0 rounded-sm object-cover h-7'/>

 <Image onClick={()=>router.push(`/posts/${noti?.post?._id}`)} src = {noti?.meta?.assetImage|| '/starlight.webp'} width = {100} height = {100} alt = 'profile' className = 'w-8 rounded-[4px] object-cover h-8'/>
</div>
    </div>
}