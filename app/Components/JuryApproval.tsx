import Image from "next/image"
import { useRouter } from "next/navigation"
import { useThemeContext } from "../Context/ThemeContext"
export default function JuryApproval ({message}){
    const {isLightMode} = useThemeContext()
    const router = useRouter()
    return <div  className={`h-12 w-full ${isLightMode ? 'bg-[#ededed]': 'bg-[#151515]'} flex items-center gap-2 mb-0.5 rounded  px-2`}>
        <Image src =  '/logo.png' width = {100} height = {100} alt = 'profile' className = 'w-10 rounded-full h-10'/>
       
        <h6 className="" >{message}</h6>


    </div>
}