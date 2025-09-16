import Image from "next/image"

export default function Attachment({asset}){

    return <div className={`w-fit absolute    rounded-[3px] pl-2 pr-10  border border-[#2d2d2d]  flex h-11 bg-[#151515]/70 `}>
      <div className="flex gap-2 items-center  py-2 ">
                          <div className="h-8 w-10 bg-[#1d1d1d]/70 justify-center flex items-center ">
                          <Image src={asset?.image?.[0]} height={100} width={100}  alt="preview" className="h-8 w-10 rounded-[2px] object-cover"/></div>
                          <div>
                          <h6>{asset?.name}</h6>
                        <p style={{fontSize  :'12px'}}>@{asset?.postedBy?.handle}</p>
                          </div>
                      </div>
    </div>
}