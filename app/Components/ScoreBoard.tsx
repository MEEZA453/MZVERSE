import React, { useEffect, useState } from 'react'
import AnimatedNumber from './AnimateNumber'
import {motion} from 'framer-motion'
function ScoreBoard({validVotes, isLightMode, post}) {
    const [totalAvg , setTotalAvg] = useState(0)

    const averages = post?.voteFields?.length && validVotes?.length
  ? post.voteFields.reduce((acc, field) => {
      const total = validVotes.reduce((sum, vote) => sum + (vote[field] || 0), 0);
      acc[field] = parseFloat((total / validVotes.length).toFixed(2));
      return acc;
    }, {} as Record<string, number>)
  : {};


useEffect(() => {
  if (averages && Object.keys(averages).length > 0) {
    const delay = 200; // 1.1s in ms (matches AnimatedNumber duration)
    const fieldsCount = Object.keys(averages).length;
    
    const timer = setTimeout(() => {
      const values = Object.values(averages).filter(v => typeof v === "number");
  
      if (values.length > 0) {
        const totalAverage = values.reduce((sum, val) => sum + val, 0) / values.length;
        setTotalAvg(parseFloat(totalAverage.toFixed(1)));
      } else {
        setTotalAvg(0);
      }
    }, delay); 

    return () => clearTimeout(timer); 
  }
}, [averages]);


  return (
      <div>
   
          { validVotes.length > 0 && <div className='w-full px-1'>
   
   {post?.voteFields?.map((field : any ,index : number)=>{
       return <div key={index} className='score px-1  mb-1'>
                 
                   <div className=''>
                   <div className={`overall b border-b ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'} w-full h-5 pr-1 flex items-center justify-between  relative`}>
                       <h3   className='z-10 ml-2'>{field}:</h3>
                       <h3 >{averages[field]}  </h3>
                       {/* <motion.div    
                        initial={{width : 0}} animate = {{width : `${(averages[field]*10-10)}%`}}  transition={{duration : 0}}
                        className={`'ber h-full ${isLightMode ? 'bg-[#e2e2e2]':'bg-[#1d1d1d]'} absolute top-0'`}></motion.div> */}
   
                   </div>
                   </div>
               </div>
               
   
   
   })}
   
                <div  className={`score ${isLightMode ?'bg-[#f4f4f4]':'bg-[#1d1d1d]'}  w-full h-6 flex items-center pr-2 mt-4 justify-between  relative`}>
                       <h3  style={{  fontWeight : '200', color : isLightMode ? 'white':'black'}}  className={`z-10 ml-2 mix-blend-difference`}>Score:</h3>
                       <h3 className="">
       {<AnimatedNumber value ={totalAvg}/>}/10
   </h3>
                       <motion.div     initial={{width : 0}} animate = {{width : `${totalAvg*10-13}%`} } transition={{delay : 0.060 , duration : 1.5}  }  className={`ber h-full ${isLightMode ? 'bg-black ': 'bg-[#dadada]'} absolute top-0`}></motion.div>
                   </div>
           </div>} 
            </div>
  )
}

export default ScoreBoard