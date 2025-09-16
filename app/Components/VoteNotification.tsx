import Image from "next/image"
import { useRouter } from "next/navigation"
import { deleteNotification } from "../store/actions/notification"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import {motion} from 'framer-motion'
export default function VoteNotification ({noti}){
    const dispatch  = useDispatch<AppDispatch>()

    const router = useRouter()
    return <motion.div       className="h-12 w-full bg-[#151515] mb-0.5  justify-between items-center  flex px-2"><div className="flex items-center gap-1 ">
        <Image onClick={()=>router.push(`/${noti?.sender?.handle}`)} src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
        <button onClick={()=>router.push(`/${noti?.sender?.handle}`)}><h6 >@{noti?.sender?.handle}</h6></button>
        <h6 >voted you post</h6>


    </div>
        <Image onClick={()=>router.push(`/posts/${noti?.post?._id}`)} src = {noti?.post?.images[0] || '/starlight.webp'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-sm object-cover h-10'/>
    </motion.div> 
}