import Image from "next/image"
import { useRouter } from "next/navigation"
import { deleteNotification } from "../store/actions/notification"
import { PiWalletFill } from "react-icons/pi"

export default function MoneyReceivedNotification ({noti}){
console.log(noti)
    const router = useRouter()
    return <div  className="h-12 w-full bg-[#151515] flex items-center  justify-between mb-0.5 rounded  px-2">
        <div className="flex items-center gap-2">

<div className="h-9 w-9  rounded-lg flex items-center justify-center text-black text-[18px] bg-white/80" ><PiWalletFill /></div>
        <h6 >{noti?.message}</h6>
        </div>
<h5>+{noti?.amount}</h5>

    </div>
}