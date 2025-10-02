import { preconnect } from 'next/dist/server/app-render/entry-base'
import React from 'react'

function MetaOfProduct({isLightMode, creator, dateOfPosted, size, type}) {
  return (
   <div className='w-full  mb-4 px-2'>
    <div>

  <div className={`w-full mt-0.5 pb-[2px] ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'}    flex border-b justify-between items-center`}>
    <h3 >createdBy:</h3>
    <h3 >@{creator}</h3>
  </div>
 <div className={`w-full mt-0.5 pb-[2px] ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'}  flex border-b justify-between items-center`}>
    <h3>Supply type:</h3>
    
        <h3>{type}</h3>
        
  </div>
<div className={`w-full  mt-0.5 pb-[2px] ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'}  flex border-b justify-between items-center`}>
    <h3 >Size:</h3>
    <h3 >{size}</h3>
  </div>
  <div className={`w-full  mt-0.5 pb-[2px] ${isLightMode ? 'border-[#bababa]':'border-[#4d4d4d]'}  flex border-b justify-between items-center`}>
    <h3 >Rated:</h3>
    <h3 >4/5</h3>
  </div>
    </div>
  

</div>
  )
}

export default MetaOfProduct