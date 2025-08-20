'use client'
import { useRouter } from "next/navigation";
import MasterNavber from "../Components/MasterNavber";
import PhotographyOfTheDay from "../Components/PhotographyOfTheDay";
import PosterOfTheDay from "../Components/PosterOfTheDay"
import PromotionOfTheDay from '../Components/PromotionOfTheDay';
import AllPosts from "../posts/page";
import { useState } from "react";
import AllAssets from "../AllAssets/page";
export  default function Feed (){
    const router =  useRouter()
    const [activeIndex ,setActiveIndex] = useState(0)
    const tabs = [{name : 'Explore' , origin : ()=>router.push('/feed')} , {name : 'Posts' , origin : ()=>router.push('/posts')}, {name : 'Store' , origin : ()=>router.push('/AllAssets')}]
     const photo = [{name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur1.jpg']},
{name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur2.jpg']},
{name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur3.jpg']},
{name : 'Surrelism collection', profile : '/image.png' , handle : 'suchguy' , images : ['/sur4.jpg']},
]
    return <div> 
        {/* <MasterNavber/> */}
        <div className="sticky top-13 z-[100]">
        <div className=" left-1/2 w-screen  justify-center items-center flex px-2 mt-3 gap-1">
{
    tabs.map((tab, index : number)=>{
       return       <button onClick={()=> setActiveIndex(index)} key={index} className={`rounded-full ${activeIndex  === index ? 'bg-white text-black': 'bg-[#1d1d1d]  text-white'} items-center justify-center  px-3 text-[14px] py-0.5`}>{tab.name}</button>
        
    })
}        </div>
</div>
{activeIndex === 0 && <div>
        {/* <PhotographyOfTheDay p={photo[2]}/> */}
         <PosterOfTheDay/>
        
        <PromotionOfTheDay/>



         
<AllPosts/>

</div>}
{ activeIndex === 1 && <AllPosts/>
}
{ activeIndex === 2 && <AllAssets/>
}
       {/* <DesignerOfTheDay/> */}
        {/* <AllPosts/> */}
        <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-[#000000] to-[#00000000] z-[50] top-0"></div>
    </div>
}