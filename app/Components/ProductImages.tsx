'use client'
type ProductImagesProps  = {
    images : string[];
}
export default function ProductImages({images}: ProductImagesProps){
    return <div className="w-screen lg:w-[70vw] border-r border-[#4d4d4d] mb-4 ">
        <div className="w-screen lg:w-[70vw]  h-80 lg:h-screen border-b relative flex justify-center items-center border-[#4d4d4d] ">
            <img src={images[0]} className="w-[35vw] lg:w-[20vw]"/>
        </div>
      { images.length > 1 ? <div className=" h-80 lg:h-[60vh] border-b relative grid grid-cols-2 justify-center items-center border-[#4d4d4d] ">
           <div className="border-r border-[#4d4d4d] flex h-full items-center justify-center">
            <img src={images[1]} className="w-[17vw]"/>
        </div>


        <div className="  flex items-center justify-center">
            <img src={images[2]} className="w-[17vw]"/>
        </div>


        </div> : null}
    </div>
}