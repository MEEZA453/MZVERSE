import React from 'react'

function PostMeta({isLightMode, post}) {
  return (
  <div className='other-detais  px-2 mt-10'>
      <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >madeby:</h3><h6>{post?.createdBy?.handle}</h6></div>
      <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >posted:</h3><h6>{post?.createdAt}</h6></div>
      <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >typeof:</h3><h6>{post?.category}</h6></div>
  
  </div>
  )
}

export default PostMeta