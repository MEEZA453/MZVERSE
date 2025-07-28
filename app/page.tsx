'use client'
import MasterNavber from "./Components/MasterNavber";
import InteractiveGrid from "./Components/InteractiveGrid"
import {useState} from 'react'
export default function Home(){
const [showInput , setShowInput] = useState(false)
console.log(showInput)
  return <div>
    <MasterNavber setShowInput = {setShowInput}/>
    <InteractiveGrid showInput = {showInput} setShowInput={setShowInput}/>
    <div className="bg-[#3b3b3b] h-screen w-screen relative z-[30]"></div>
      </div>
}