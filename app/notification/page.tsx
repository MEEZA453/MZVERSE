'use client'
import { UseDispatch , useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getNotifications, markAllNotificationsRead , deleteNotification} from "../store/actions/notification"
import { useAuth } from "../Context/AuthContext"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { HiOutlineDotsVertical } from "react-icons/hi"
import FollowNotification from "../Components/FollowNotification"
import VoteNotification from "../Components/VoteNotification"
import SkeletonNotification from "../Components/Skeleton/SkeletonNotification"
import WelcomeNotification from "../Components/WelcomeNotification"
import {motion } from 'framer-motion'
import { useNotification } from "../Context/Notification"
import notification from "../store/reducers/notification"
import JuryApplicationRequest from "../Components/JuryApplicationRequest"
import JuryApproval from "../Components/JuryApproval"
import SwipeToDelete from "../Components/SwipeToDelete"
import AttachRequestNotification from "../Components/AttachRequestNotification"
import ApproveAttachNotification from "../Components/ApproveAttachNotification"
import OrderCreatedNotification from "../Components/OrderCreatedNotification"
import MoneyReceivedNotification from "../Components/MoneyReceivedNotification"
import { useThemeContext } from "../Context/ThemeContext"
export default function Notification () {
  const {setIsNotification} = useNotification()
    const {token} = useAuth()
    const {isLightMode} = useThemeContext()
    const [localItems, setLocalItems] = useState<any[]>([]);
    const router  = useRouter()
    const [isMobile ,setIsMobile] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const {items , loading} = useSelector((state: any)=>state.notification)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
useEffect(() => {
  setLocalItems(items);
}, [items]);
const handleDelete = (notificationId: string) => {
  console.log(notificationId)
  // instantly update UI
  setLocalItems(prev => prev.filter((item: any) => item?._id !== notificationId));

  // still call redux action + API
dispatch(deleteNotification(notificationId, token))
};
useEffect(() => {
  if (!token) return; 
    dispatch(getNotifications(token));
    dispatch(markAllNotificationsRead(token))
  
}, [dispatch, token]);
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])


  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

    return <motion.div    className={`w-screen fixed top-0 right-0 ${isLightMode ? 'bg-white':'bg-black'} overflow-y-scroll hide-scrollbar h-screen px-2 z-[999] lg:w-120`}>
 <div className='w-full flex justify-between lg:w-[23vw] items-center px-0 z-[100] my-4 '>
              <div className='flex gap-1 items-center justify-center'>
              <button onClick={()=> setIsNotification(false)}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Notifications</h4></div>
    
            </div>

             { loading ?  (
  Array.from({ length: 4 }).map((_, i) => <SkeletonNotification key={i} />)
): <div className=" ">{
  localItems?.map((noti: any, index: number) => {
    return (
      <div key={index}>
        {noti?.type === "follow" && (
          <SwipeToDelete       onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)} onDelete={() => dispatch(handleDelete(noti._id))}>
            <FollowNotification noti={noti} />
          </SwipeToDelete>
        )}
         {noti?.type === "order_created" && (
          <SwipeToDelete       onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}  onDelete={() => dispatch(handleDelete(noti._id))}>
            <OrderCreatedNotification noti={noti} />
          </SwipeToDelete>
        )}
          {noti?.type === "asset_attach_approved" && (
          <SwipeToDelete      onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}  onDelete={() => dispatch(handleDelete(noti._id))}>
       <ApproveAttachNotification noti={noti}/>
          </SwipeToDelete>
        )}
         {noti?.type === "cash_received" && (
          <SwipeToDelete      onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}  onDelete={() => dispatch(handleDelete(noti._id))}>
       <MoneyReceivedNotification noti={noti}/>
          </SwipeToDelete>
        )}

     {(noti?.type === "jury_request" || noti?.type === "jury_removal_request") && (
  <JuryApplicationRequest noti={noti} />
)}
        {(noti?.type === "vote" || noti?.type === "product_sold") && (
          <SwipeToDelete     onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}  onDelete={() => dispatch(handleDelete(noti._id))}>
            <VoteNotification noti={noti} />
          </SwipeToDelete>
        )}
          {noti?.type === "asset_attach_request" && (

            <AttachRequestNotification noti={noti} />

        )}

        {(noti?.type === "jury_approved" ||
          noti?.type === "jury_rejected" ||
          noti?.type === "normal_request_rejected" ||
          
          noti?.type === "jury_removed") && (
          <SwipeToDelete      onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)} onDelete={() => dispatch(handleDelete(noti._id))}>
            <JuryApproval message={noti.message} />
          </SwipeToDelete>
        )}
      </div>
    )
  })
}</div>}
               
    </motion.div>
}