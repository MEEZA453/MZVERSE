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
export default function Notification () {
  const {setIsNotification} = useNotification()
    const {token} = useAuth()
    console.log(token)
    const router  = useRouter()
    const [isMobile ,setIsMobile] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const {items , loading} = useSelector((state: any)=>state.notification)

useEffect(() => {
  if (!token) return; 
    dispatch(getNotifications(token));
    dispatch(markAllNotificationsRead(token))
  
}, [dispatch, token]);
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
console.log(items)

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

    return <motion.div  {...(isDesktop
        ? { 
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 }
          }
        : {})}   className="w-screen fixed top-0 right-0 bg-black h-screen px-2 z-[999] lg:w-[23vw]">
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
  items?.map((noti: any, index: number) => {
    return (
      <div key={index}>
        {noti?.type === "follow" && (
          <SwipeToDelete onDelete={() => dispatch(deleteNotification(noti._id, token))}>
            <FollowNotification noti={noti} />
          </SwipeToDelete>
        )}

     {(noti?.type === "jury_request" || noti?.type === "jury_removal_request") && (
  <JuryApplicationRequest noti={noti} />
)}
        {noti?.type === "vote" && (
          <SwipeToDelete onDelete={() => dispatch(deleteNotification(noti._id, token))}>
            <VoteNotification noti={noti} />
          </SwipeToDelete>
        )}

        {(noti?.type === "jury_approved" ||
          noti?.type === "jury_rejected" ||
          noti?.type === "normal_request_rejected" ||
          
          noti?.type === "jury_removed") && (
          <SwipeToDelete  onDelete={() => dispatch(deleteNotification(noti._id, token))}>
            <JuryApproval message={noti.message} />
          </SwipeToDelete>
        )}
      </div>
    )
  })
}</div>}
                <WelcomeNotification/>
    </motion.div>
}