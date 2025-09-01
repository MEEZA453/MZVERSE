import Image from "next/image"
import { useRouter } from "next/navigation"
export default function FollowNotification ({noti}){
    const router = useRouter()
    return <div onClick={()=>router.push(`/${noti?.sender?.handle}`)} className="h-12 w-screen bg-[#151515] flex items-center gap-1  rounded  px-2">
        <Image src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
        <h6 >@{noti?.sender?.handle}</h6>
        <h6 >started to following you</h6>


    </div>
}