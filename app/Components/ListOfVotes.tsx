import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function ListOfVotes({post, validVotes, isLightMode, isMobile, setVoteMenu}) {
        const [currentIndex ,setCurrentIndex] = useState(0)
          const [openIndex , setOpenIndex] = useState(0)
          const router = useRouter()
  return (
    <div>{validVotes.length > 0 && <div className='tabs  mt-6'>
    <div className={`flex relative border-b  ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'}  pb-1 px-3 gap-12`}>
{['Creators' , 'Judges'].map((el , i)=>{
    return <button className='text-[14px]' key={i} style={{opacity :currentIndex === i ? 1 : 0.66}}  onClick={()=> setCurrentIndex(i)}>{el}</button>
})}
{/* <div className='bg-[white/10 ]pointer-events-none h-full z-[200] w-20 absolute top-0 left-0'></div> */}
</div>
{/* <div className='w-full border-t mt-[2px]  border-[#4d4d4d] h-1.5 caro'>
    <div style={{transform : !isMobile ?`translate(${currentIndex*174}px)`:`translate(${currentIndex*103}px)` }} className='bg-white duration-300 translate-x-[13px] w-12 h-[3px] rounded-full
    '></div>
    </div> */}

</div>}


{validVotes.length <1 ? <p className='text-center mt-10'>No vote available </p>: <div className={`votes mt-4 border-b ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'}  relative w-screen lg:w-[30vw] max-h-100 h-[50vh] overflow-x-hidden overflow-y-scroll hide-scrollbar`}>
<div  style={{transform : isMobile ? `translate(-${currentIndex*100}vw)`: `translate(-${currentIndex*30}vw)`}} className='h-50  duration-300 w-[200vw] lg:w-[60vw]  flex'>
    <div className='max-h-100 h-full w-screen lg:w-[30vw] community-votes  '>
    <div className='see-votes  px-2 mt-5'>
    <div className='gap-35 lg:gap-43 mb-4 flex'>
        <p>Origin</p>
        <p>Passion</p>
    </div>
    <div>
   {validVotes.map((vote , i)=>{
    return <div  key={i}>{ vote?.user && <div  onClick={()=> setOpenIndex(i)} className={`vote rounded relative px-2 duration-500  ${openIndex === i ? isLightMode ? 'bg-[#ededed] h-36': 'bg-[#1d1d1d] h-36': 'h-10' }`}>
      

  <div className='w-full pt-2  mt-2 overview flex pr-2  justify-between items-center'>
<div className='vote flex  items-center gap-12 lg:gap-20.5'>
    <div className='profile w-30  flex items-center gap-1'>
        <Image onClick={()=> router.push(`/${vote.user.handle}`)} height = {100} width = {100} alt  = 'profile pic' src={vote?.user?.profile || '/image.png'} className = 'h-8 w-8 rounded-full object-cover'/>
        <h3 >@{vote?.user?.handle || 'unknowuser'}</h3>
    </div>
    <h3 >Designer</h3>
</div>
{ openIndex === i ?   <button onClick={()=>setVoteMenu(true)} style={{lineHeight : 0}} className='absolute  right-2 top-2'>...</button>:<h3  >  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)} </h3>}
</div>



<div style={{opacity : openIndex === i ? 1 : 0}} className='details duration-300 delay-200 px-10 w-full '>
{post?.voteFields?.map((el ,i)=>{
    return <div key={i} className='justify-between w-full flex'>
        <p className='mb-0.5'>{el}:</p>
        <p>{vote[el]}</p>
    </div>
})}

  <div className='w-full flex justify-between'><h3>Overall</h3><h3>  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)}</h3></div>
</div>
  
 </div>}</div>
   })}
</div>
</div>
    </div>
    <div className={`h-50 ${isMobile ? 'w-screen':'w-[30vw]'}`}> <p className='mt-10  text-center'>No vote available</p></div>

</div>
</div>}</div>
  )
}

export default ListOfVotes