'use client'
import MasterNavber from "./Components/MasterNavber";
import InteractiveGrid from "./Components/InteractiveGrid"

export default function Home(){
console.log('rendered')
  return <div>
    <MasterNavber/>
    <InteractiveGrid/>
    <div className="bg-[#3b3b3b] h-screen w-screen relative z-[30]"></div>
      </div>
}