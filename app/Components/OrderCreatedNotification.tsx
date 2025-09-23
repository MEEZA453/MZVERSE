import Image from "next/image"
import { useRouter } from "next/navigation"
import { deleteNotification } from "../store/actions/notification"
import { useThemeContext } from "../Context/ThemeContext"

export default function OrderCreatedNotification ({noti}){
    const {isLightMode } = useThemeContext()
    const router = useRouter()
    return <div  className={`h-12 w-full ${isLightMode ? 'bg-[#ededed]': 'bg-[#151515]'} flex items-center  justify-between mb-0.5 rounded  px-2`}>
        <div className="flex items-center gap-2">

        <Image onClick={()=>router.push('/AllAssets/'+noti?.meta.productId)} src = {noti?.image} width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-lg h-10'/>
       
        <h6 >Order Created Successfully</h6>
        </div>
<button className="border rounded-[3px] px-2 h-6.5 text-[14px] flex items-center justify-center">Get Invoice</button>

    </div>
}