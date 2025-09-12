'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useAuth } from "../Context/AuthContext";
import { approveJury, approveNormal } from "../store/actions/jury";
import { deleteNotification } from "../store/actions/notification";
import { approveAttachRequest } from "../store/actions/attach";


export default function AttachRequestNotification ({ noti }) {
    const {token} = useAuth()
  const router = useRouter()
  const [fullNotification, setFullNotification] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  console.log(noti?.sender?._id , token)
  const handleApprove = (approve: boolean) => {
    dispatch(approveAttachRequest(noti?._id , approve , token))
    // dispatch(deleteNotification(noti?._id , token))
    
  }

  return (
    <div className={`${fullNotification ? 'h-44' : 'h-12'} relative duration-300 w-full bg-[#151515] mb-0.5 rounded  px-2`}>
      <div className=" flex items-center justify-between  gap-1 ">
        <div className="flex items-center gap-1">
          <Image src={noti?.sender?.profile || '/image.png'} width={100} height={100} alt='profile' className='w-10 rounded-full h-10'/>
          <div>
            <div className="flex gap-1">
              <h6>@{noti?.sender?.handle}</h6>
              <h6> wants to attach your asset</h6>
            </div>
          </div>
        </div>
        <button onClick={() => setFullNotification(!fullNotification)}>
          <SlArrowDown 
            style={{ rotate: fullNotification ? '180deg' : '0deg' }} 
            className="duration-300" 
            size={13} 
          />
        </button>
      </div>
      <div className={`relative h-16 w-24 translate-x-10 ${fullNotification ? 'opacity-100':'opacity-0'} `}>
<Image src={noti?.meta?.postImage} alt="assets" width={100} height={100} className="h-10 absolute top-0 right-0 w-10 object-cover rounded"/>

<Image src={noti?.meta?.assetImage} alt="assets" width={100} height={100} className="h-16 w-20 object-cover rounded-lg"/>
      </div>

      <div className={`mt-6 w-full ${fullNotification ? 'opacity-100':'opacity-0'} flex gap-1 duration-200 delay-100`}>
        <button 
          onClick={() => handleApprove(true)} 
          className="px-2 w-full flex items-center justify-center h-6 text-center mt-1 border border-white text-[14px] rounded-[2px]"
        >
          Approve
        </button>

        <button 
          onClick={() => handleApprove(false)} 
          className="px-2 w-full flex items-center justify-center h-6 text-center mt-1 text-white text-[14px] rounded-[2px] border border-white"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
