    'use client'
    import Image from "next/image"
    export default function ImageShower ({images = []}){
        return <div className="h-[50vh] mt-10 mb-4 overflow-y-scroll">

        
    <div className="flex w-[300vw]">

    {images?.map((img : string , i : number)=>{
        return      <div key={i} className="h-full w-[100vw] flex items-center  justify-center "> <Image src={img} height = {400} width = {300} alt = 'image' className = 'w-[100%] h-[50vh] object-cover  '/>

            </div>
    })}

    </div>
    <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[300] top-0"></div>

        </div>
    }