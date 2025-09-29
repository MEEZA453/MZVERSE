import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function HighlightOfProduct({name, amount, isLightMode, postsOfAsset}) {
const router = useRouter()
  return (
    <div className='flex gap-1 items-center justify-between w-full px-2 mb-4'>
                     
                    <div className='flex gap-1  items-center'>
                      <h5   className="" style={{color : isLightMode ?'black': 'white'}}>{name}</h5> <label className={` px-1.5 flex items-center justify-center py-2.5 ${isLightMode ? 'bg-black text-white':'tab-dark'}`} style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                            }}>{amount === 0 ? null : '$'}{amount === 0 ? 'free':amount}</label>  </div>
                            
                             <div className="flex items-center">
                              <h3>Used by</h3>
                              {postsOfAsset.slice(0, 3).map((post, i) => (
                                <div key={i} className={i !== 0 ? "-ml-2" : ""}>
                                  <Image
                                    onClick={() => router.push(`/${post?.createdBy?.handle}`)}
                                    height={100}
                                    width={100}
                                    alt="profile pic"
                                    src={post?.createdBy?.profile || "/image.png"}
                                    className={`h-6 w-6 rounded-full object-cover border-2 ${isLightMode?'border-white':'border-black'}`}
                                  />
                                </div>
                              ))}
                              <div  className={`h-6 w-6 rounded-full bg-black flex items-center justify-center border-2 -ml-2 font-[inter-light] ${isLightMode?'border-white bg-black text-white':'border-black bg-white text-black'}`}>+</div>
                            </div>
                            </div>
  )
}

export default HighlightOfProduct