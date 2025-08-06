'use client'
import { useEffect, useState } from "react";
import {AnimatePresence, motion  } from 'framer-motion'
import { useNotification } from "../Context/Notification"
export default function Notification(){
const {notification , setNotification } = useNotification();
const [currentNotification , setCurrentNotification ]  = useState({headline : 'Test notification' , subline : 'tap to view the full list' , profile : './image.png' , button : {
        isButton : false,
        action : ()=>{ console.log('clicked')},
        text : 'Join now'
}})
const notificationState = {
    addToFavourait : {headline : 'Added to favourait.' , subline : 'tap to view the list.' , profile : '/fav.png' ,  button : {
        isButton : false,
        action : ()=>{ console.log('clicked')},
        text : 'Join now'
    } },
    onCreateUser : {headline : 'Account created successfully' , subline : 'tap to see profile.',  profile : '/image.png' ,button : { isButton : false,
        action : ()=>{ console.log('clicked')},
        text : 'Join now'} },
     loggedIn : {headline : 'Welcome to you profile' , subline : 'tap to see profile.',  profile : '/image.png' ,button : { isButton : false,
        action : ()=>{ console.log('clicked')},
        text : 'Join now'} },
         joinCommunity : {headline : 'Be a part of out community' , subline : 'tap to see profile.',  profile : '/image.png' ,button : { isButton : true,
        action : ()=>{ console.log('clicked')},
        text : 'Join now'} }
}



useEffect(()=>{
    if(notification === 'addToFav'){
        setCurrentNotification(notificationState.addToFavourait)
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

        {notification !== ''?<motion.div initial ={{y : -60}} animate= {{y : 0}} transition={{duration : 0.3 , ease : 'easeInOut'}} exit={{y : -60}} className="w-[97%] lg:w-90 px-2 items-center fixed top-2 z-[9999] h-13 flex justify-between  rounded bg-white">
<div className="flex gap-3">
<img className="h-10 w-10  rounded-full object-cover" src={currentNotification.profile} height={300} width={300} alt="profile"/>
<div className="mt-0.5"><h5 style={{fontSize : 15}} className="text-black">{currentNotification.headline}</h5><p style={{fontSize : 12 , lineHeight : 0.8}}>{currentNotification.subline}</p></div>
</div>

{currentNotification.button && currentNotification.button.isButton ? <button className="bg-black text-[14px] px-2 py-1 rounded-[3px]">{currentNotification.button.text}</button>:null}
    </motion.div>:null}
    </AnimatePresence>
        </div>
}