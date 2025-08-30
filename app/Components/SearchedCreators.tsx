import Image from "next/image"
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useAuth } from "../Context/AuthContext"
import { AppDispatch } from "../store/store"
import { searchUsers } from "../store/actions/auth"
import Loading  from './loading'
export default function SearchedCreators(){
    const router = useRouter()
const {userResult , loading} = useSelector((state : any)  => state.search)
console.log(userResult)
    return <div className="w-full">
       { loading ? <Loading/>:<div  className="w-full  justify-start px-2">
            {userResult.map((user , index )=>{
                return <div key={index}> <div onClick={()=>router.push(`/${user?.handle}`)}  className="flex items-center   gap-1">
                                      <Image  
                        height={300}
                        width={300}
                        alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src={user?.profile || '/image.png'}/>  
                          <div>
                                      <h3 className='mt-2'>{user?.name}  </h3>
                                      <p style={{fontSize : '12px'}} className=''>@{user?.handle}  </p>
                      
                      
                          </div>
                                       {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                                    </div></div>
            })}
            
        </div>}
    </div>
}