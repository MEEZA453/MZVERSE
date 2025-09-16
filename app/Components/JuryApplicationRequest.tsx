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


export default function JuryApplicationRequest ({ noti }) {
    const {token} = useAuth()
  const router = useRouter()
  const [fullNotification, setFullNotification] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleApprove = (approve: boolean) => {
    {noti?.type === "jury_removal_request" ? dispatch(approveNormal(noti?.sender?._id, approve , token)):dispatch(approveJury (noti?.sender?._id, approve , token)) }
     // 👈 pass senderId + approve
    dispatch(deleteNotification(noti?._id , token))
  }

  return (
    <div className={`${fullNotification ? 'h-40' : 'h-12'} relative duration-300 w-full bg-[#151515] mb-0.5 rounded  px-2`}>
      <div className=" flex items-center justify-between  gap-1 ">
        <div className="flex items-center gap-1">
          <Image src={noti?.sender?.profile || '/image.png'} width={100} height={100} alt='profile' className='w-10 rounded-full h-10'/>
          <div>
            <div className="flex gap-1">
              <h6>@{noti?.sender?.handle}</h6>
              <h6>{noti?.type === "jury_removal_request" ? 'wants step off as jury':'applid for jury'}</h6>
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

      <p className={`${fullNotification ? 'opacity-100':'opacity-0'} flex px-2 mt-2 duration-200 delay-100`}>{noti.message}</p>

      <div className={`mt-6 w-full ${fullNotification ? 'opacity-100':'opacity-0'} duration-200 delay-100 flex gap-1 `}>
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
