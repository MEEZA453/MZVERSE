import Image from "next/image"
import { useThemeContext } from "../../Context/ThemeContext"

export default function MultipleAttachment({length ,coverImage, setAttachmentsMenu}){
    const {isLightMode}  = useThemeContext()
return <div className="relative h-12 w-12">
    <div className={`h-4 w-4 rounded-full ${isLightMode?'bg-black text-white':'bg-white text-black'} absolute right-0  text-[10px] items-center justify-center flex`}>{length}</div>
   <div className={`h-11 w-11 ${isLightMode ? 'bg-[#dadada]':' bg-[#1d1d1d]'} flex justify-center items-center`}>
                             <Image onClick={()=>setAttachmentsMenu(true)} src={coverImage} height={100} width={100}  alt="preview" className="h-11  lg:h-11 w-9 lg:w-10  rounded-[2px] object-cover"/></div>
</div>
}