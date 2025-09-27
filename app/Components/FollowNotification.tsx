import Image from "next/image"
import { useRouter } from "next/navigation"
import { useThemeContext } from "../Context/ThemeContext"
export default function FollowNotification ({noti}){
    const router = useRouter()
    const {isLightMode} = useThemeContext()
    return <div onClick={()=>router.push(`/${noti?.sender?.handle}`)} className={`h-12 w-full ${isLightMode ? 'bg-white': 'bg-[#151515]'} flex items-center gap-1 mb-0.5 rounded  px-2`}>
        <Image src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
        {/* <h6 >@{noti?.sender?.handle}</h6> */}
        <h3 >{noti.message}</h3>


    </div>
}