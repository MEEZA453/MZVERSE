'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
export default function PhotographyOfTheDay({p}){
const router = useRouter()
 const photo = [{name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur1.jpg']},
// {name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur2.jpg']},
// {name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur3.jpg']},
// {name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur4.jpg']},
]
    return <div className="px-4 mt-2">
<div  className="">
            <Image src = {p.images[0]} height = {300} width  = {300} alt = 'photo' className ='w-full mb-2 h-90 rounded object-cover'/>
              <div className="     flex justify-between items-center w-full pr-3 z-100  duration-200 ">
                                    <div className="flex items-center  gap-1">
                                      <button onClick={()=>router.push('/'+p.handle)}><Image  
                        height={300}
                        width={300}
                        alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src={p.profile}/></button>  
                          <div>
                                      <h3 className='mt-2'>{p.name}  </h3>
                                      <p style={{fontSize : '12px'}} className=''>@{p?.handle}  </p>
                      
                      
                          </div>
                                       {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                                    </div>
                                    <h5>8.6</h5>
                                  </div>
        </div>
    </div>
}