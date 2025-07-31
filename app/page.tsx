'use client'
import MasterNavber from "./Components/MasterNavber";
import InteractiveGrid from "./Components/InteractiveGrid"
import JoinCommunityInput from "./Components/JoinCommunity";
import Login from "./Components/Login";
import {useState} from 'react'
import { useShowInput } from "./Context/ShowInputContext";
export default function Home(){
const {showLoginInput , showSignupInput ,setShowLoginInput , setShowSignupInput}  = useShowInput()

  return <div>
    {showSignupInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<JoinCommunityInput setShowSignupInput={setShowSignupInput}/>
</div>: null}
 {showLoginInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<Login setShowLoginInput={setShowLoginInput}/>
</div>: null}
    <MasterNavber setShowLoginInput = {setShowLoginInput} setShowSignupInput = {setShowSignupInput}/>
    <InteractiveGrid/>
    <div className="bg-[#3b3b3b] h-screen w-screen relative z-[30]"></div>
      </div>
}