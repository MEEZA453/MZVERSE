import Image from "next/image"
import { useRouter } from "next/navigation"
export default function VoteNotification ({noti}){
    const router = useRouter()
    return <div className="h-16 w-screen bg-[#151515] mb-0.5  justify-between items-center  flex px-2"><div className="flex items-center gap-1 ">
        <Image onClick={()=>router.push(`/${noti?.sender?.handle}`)} src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
        <button onClick={()=>router.push(`/${noti?.sender?.handle}`)}><h6 >@{noti?.sender?.handle}</h6></button>
        <h6 >voted you post</h6>


    </div>
        <Image onClick={()=>router.push(`/posts/${noti?.post?._id}`)} src = {noti?.post?.images[0] || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-sm object-cover h-10'/>
    </div> 
}