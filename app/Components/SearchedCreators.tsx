import Image from "next/image"
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useAuth } from "../Context/AuthContext"
import { AppDispatch } from "../store/store"
import { searchUsers } from "../store/actions/auth"
import { TfiArrowTopRight } from "react-icons/tfi";
import Loading  from './loading'
import { MdArrowForwardIos } from "react-icons/md"
export default function SearchedCreators(){
    const router = useRouter()
const {userResult , loading} = useSelector((state : any)  => state.search)

    return <div className="w-full">
       { loading && !userResult ? <Loading/>:<div  className="w-full  justify-start  ">
            {userResult?.map((user : any , index :number )=>{
                return <div key={index} className="flex px-2  pb-1 border-[#4d4d4d] items-center justify-between mt-2.5" > <div onClick={()=>router.push(`/${user?.handle}`)}  className="flex items-center    gap-2">
                                      <Image  
                        height={300}
                        width={300}
                        alt='fdfdf'  className='h-9 w-9 rounded-full items-center object-cover' src={user?.profile || '/image.png'}/>  
                          <div>
                                      <h6   className=''>{user?.name}  </h6>
                                      <p style={{fontSize : '13px'}} className=''>@{user?.handle}  </p>
                      
                      
                          </div>
                                       {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                                    </div>
                              </div>
            })}
            
        </div>}
    </div>
}