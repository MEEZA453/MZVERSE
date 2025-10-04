'use client'
import { useEffect, useState } from "react";
import {AnimatePresence, motion  } from 'framer-motion'
import { useNotification } from "../Context/Notification"
import { LiaVoteYeaSolid } from "react-icons/lia";
import { IoMdHeart } from "react-icons/io";
import { IoBagCheckSharp, IoBagSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { PiWalletFill } from "react-icons/pi";
import { useThemeContext } from "../Context/ThemeContext";
import { useRouter } from "next/navigation";
export default function Notification(){
const {notification , setNotification } = useNotification();
const {isLightMode} = useThemeContext()
const router  = useRouter()
const [currentNotification , setCurrentNotification ]  = useState( {headline : 'Added to Moodboard.' , subline : 'tap to view the list.' , profile : <LiaVoteYeaSolid />
 ,  button : {
     
      action : null,
        text : 'Join now'
    } })
const notificationState = {
    addToFavourait : {headline : 'Added to Moodboard.' , subline : 'tap to view the list.' , profile : <IoMdHeart /> ,  button : {
     
      action : null,
        text : 'Join now'
    } },
        removeFromFavorite : {headline : 'Removed from Moodboard.' , subline : 'tap to view the list.' , profile : <IoMdHeart /> ,  button : {
     
        action : null,
        text : 'Join now'
    } },
 addedToCart : {headline : 'Added to Bag successfully' , subline : 'tap to view the list.' , profile :<IoBagSharp /> , button : { isButton : true,
        action : ()=>{router.push('/cart')},
        text : 'Open Bag'} },
     cashReceived : {headline : 'Cash received in your wallet' , subline : 'tap to view the list.' , profile :<PiWalletFill /> ,  button : {
        action : null,
      
        text : 'Open cart'
    } },
 voteSubmit : {headline : 'Vote Submitted Successfully' , subline : 'tap to view the list.' , profile : <LiaVoteYeaSolid /> ,  button : {
        action : null,
        text : 'Join now'
    } },
     supplyCreated : {headline : 'Supply Created successfully.' , subline : 'tap to view the list.' , profile : <MdDone />,  button : {
     
         action : null,
        text : 'Join now'
    } },
     postCreated : {headline : 'Post created successfully.' , subline : 'tap to view the list.' , profile :<MdDone /> ,  button : {
        action : null,
      
        text : 'Join now'
    } },
     orderCreated : {headline : 'Order created successfully' , subline : 'tap to view the list.' , profile :<GoMail /> ,  button : {
        action : null,
      
        text : 'Join now'
    } },
        cartOrderCreated : {headline : 'Order created successfully' , subline : 'tap to view the list.' , profile :<IoBagCheckSharp /> ,  button : {
        action : null,
      
        text : 'Join now'
    } },
    onCreateUser : {headline : 'Account created successfully' , subline : 'tap to see profile.',  profile : <LiaVoteYeaSolid /> ,button : { isButton : false,
        action : null,
        text : 'Join now'} },
     loggedIn : {headline : 'Welcome to you profile' , subline : 'tap to see profile.',  profile : <LiaVoteYeaSolid /> ,button : { isButton : false,
        action : null,
        text : 'Join now'} },
         joinCommunity : {headline : 'Be a part of out community' , subline : 'tap to see profile.',  profile : <LiaVoteYeaSolid /> ,button : { isButton : true,
        action : null,
        text : 'Join now'} }
}



useEffect(()=>{
    if(notification === 'addToFav'){
        setCurrentNotification(notificationState.addToFavourait)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    }     else if(notification === 'removeFromFav'){
        setCurrentNotification(notificationState.removeFromFavorite)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    
    }    else if(notification === 'addToBag'){
        setCurrentNotification(notificationState.addedToCart)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    
    }   else if(notification === 'orderCreated'){
        setCurrentNotification(notificationState.orderCreated)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
      
    
    } else if(notification === 'cashReceived'){
        setCurrentNotification(notificationState.cashReceived)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
      
    
    }    else if(notification === 'cartOrderCreated'){
        setCurrentNotification(notificationState.cartOrderCreated)
        setTimeout(()=>{
setNotification('')
        }, 1000)   } else if(notification === 'voteSubmitted'){
        setCurrentNotification(notificationState.voteSubmit)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    
    }  else if(notification === 'postCreated'){
        setCurrentNotification(notificationState.postCreated)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    
    }  else if(notification === 'supplyCreated'){
        setCurrentNotification(notificationState.supplyCreated)
        setTimeout(()=>{
setNotification('')
        }, 1000)   
         
    
    } else if( notification === 'accountCreated'){
        setCurrentNotification(notificationState.onCreateUser)
        setTimeout(()=>{
setNotification('')
        }, 1000)    
    }
    else if( notification === 'loggedIn'){
        setCurrentNotification(notificationState.loggedIn)
        setTimeout(()=>{
setNotification('')
        }, 1000)    
        
    }
      else if( notification === 'joinCommunity'){
        setCurrentNotification(notificationState.joinCommunity)
        setTimeout(()=>{
setNotification('')
        }, 4000)    
        
    }


},[notification])


    return <div className="w-screen flex justify-center "><AnimatePresence>

        {notification !== ''?<motion.div initial ={{y : -60}} animate= {{y : 0}} transition={{duration : 0.3 , ease : 'easeInOut'}} exit={{y : -60}} className="w-[97%] flex lg:w-90 px-2 items-center fixed top-2 z-[9999] h-fit py-1 flex justify-between  rounded-[5px] bg-[#ededed] border border-[#dadada]">
<div className="flex gap-3">
<div className={`h-8 w-8  rounded-lg flex items-center justify-center text-black text-[15px] ${isLightMode ? 'bg-white':'bg-black/20'}`} >{currentNotification.profile}</div>
<div className="mt-0.5 flex flex-col items-center justify-center"><h5 style={{fontSize : 13, fontWeight : 300}} className="text-black">{currentNotification.headline}</h5></div>
</div>

{currentNotification.button && currentNotification.button.action ? <button onClick={currentNotification.button.action} style={{color: 'white'}} className="bg-black text-[14px] px-2 py-1 rounded-[3px]">{currentNotification.button.text}</button>:null}
    </motion.div>:null}
    </AnimatePresence>
        </div>
}