import Image from "next/image"
export default function ImageShower ({images = []}){
    return <div className="h-[50vh] mt-10 mb-4 overflow-y-scroll">
   <div className="flex w-[300vw]">

{images?.map((img : string , i : number)=>{
    return      <div key={i} className="h-fit w-[100vw] flex items-center justify-center"> <Image src={img} height = {400} width = {300} alt = 'image' className = 'w-[70%]'/>

        </div>
})}
</div>

    </div>
}