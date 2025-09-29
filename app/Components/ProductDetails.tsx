import React from 'react'

function ProductDetails({product, isLightMode}) {
  return (
  <div className='details h-full mt-4'>
         <div className='section-details'>
          {product?.sections.map((section , index)=>{
            return <div  className={` h-fit  mb-2 duration-500`} key={index}>
              <div className=' flex justify-between items-center w-screen  lg:w-[30vw]   px-3'>
              <h4  className='mb-1   w-full '> {section.title}</h4>

              </div>
              <div className={`px-2 duration-200 delay-200`}>{section.content.map((el , i)=>{
                return <p className='mb-0.5' key={i}>- {el}</p>
              })}</div>
            </div>
          })}
         </div>
         <div className='hashtags'>
          <h4 className='  mb-2 px-3 w-screen lg:w-[30vw]'>Tags</h4>
          <div className='flex px-3 gap-2'>

          {product?.hashtags?.map((el , i)=>{
            return <label key={i} className={` ${isLightMode?'bg-[#dadada] text-black':'bg-[#4d4d4d] text-[#dadada]'} px-2`}>#{el}</label>
            
          })}
          </div>
         </div>
      </div>
  )
}

export default ProductDetails