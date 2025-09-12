import Image from "next/image"

export default function Attachment({asset}){
console.log(asset)
    return <div className={`w-fit absolute -translate-y-10   rounded-[3px] px-3 border border-[#2d2d2d]  flex h-12 bg-[#151515] `}>
      <div className="flex gap-2 items-center  py-2 ">
                          <div className="h-10 w-10 bg-[#1d1d1d] flex items-center ">
                          <Image src={asset?.image?.[0]} height={100} width={100}  alt="preview" className="h-9 w-fit rounded-[2px] object-cover"/></div>
                          <div>
                          <h6>{asset?.name}</h6>
                        <p style={{fontSize  :'12px'}}>@madeby</p>
                          </div>
                      </div>
    </div>
}