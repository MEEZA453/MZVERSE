import Image from "next/image"
import { useRouter } from "next/navigation"
import { deleteNotification } from "../store/actions/notification"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import {motion} from 'framer-motion'
import { useThemeContext } from "../Context/ThemeContext"
export default function VoteNotification ({noti}){
    const dispatch  = useDispatch<AppDispatch>()
const {isLightMode} = useThemeContext()
    const router = useRouter()
    return <motion.div       className={`h-12 w-full ${isLightMode ? 'bg-white': 'bg-[#151515]'} mb-0.5  justify-between items-center  flex px-2`}><div className="flex items-center gap-1 ">
        <Image onClick={()=>router.push(`/${noti?.sender?.handle}`)} src = {noti?.sender?.profile || '/image.png'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full object-cover h-10'/>
        <button onClick={()=>router.push(`/${noti?.sender?.handle}`)}><h6 style={{fontWeight : 500}} >@{noti?.sender?.handle}</h6></button>
        <h6 >{noti.message}</h6>


    </div>
        <Image onClick={()=>router.push(`/posts/${noti?.post?._id}`)} src = {noti?.image || '/starlight.webp'} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-sm object-cover h-10'/>
    </motion.div> 
}