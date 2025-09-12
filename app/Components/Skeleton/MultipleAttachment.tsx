import Image from "next/image"

export default function MultipleAttachment({length ,coverImage, setAttachmentsMenu}){
return <div className="relative h-12 w-11">
    <div className="h-4 w-4 rounded-full bg-white absolute right-0 text-black text-[10px] items-center justify-center flex">{length}</div>
   <div className="h-10 w-10 bg-[#1d1d1d] flex justify-center items-center ">
                             <Image onClick={()=>setAttachmentsMenu(true)} src={coverImage} height={100} width={100}  alt="preview" className="h-9 w-fit rounded-[2px] object-cover"/></div>
</div>
}