'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { getPostByIdAction } from '../../store/actions/post'
import { AppDispatch, RootState } from '../../store/store'
import MasterNavber from '../../Components/MasterNavber'
import Loading from '../../Components/loading'
import Image from 'next/image'
import ProductImages from '../../Components/ProductImages'
export default function Post() {
    const dispatch = useDispatch<AppDispatch>()
    const { post, loading } = useSelector((state: RootState) => state.posts)
    const [openIndex , setOpenIndex] = useState(0)
    const [currentIndex ,setCurrentIndex] = useState(0)
    const postId = usePathname().split('/')[2]

    useEffect(() => {
        console.log('calling API for postId:', postId)
        dispatch(getPostByIdAction(postId))
    }, [dispatch, postId])

    console.log(post)

    return (
        <div>
            <MasterNavber/>
            {!loading ?<div className='lg:flex'>
            <ProductImages images={post?.images}/>


    
     <div className='w-full '>
          <h6  className='mb-3'>Score:</h6>
        <div className='w-full '>

{post?.voteFields?.map((field : any ,index : number)=>{
    return <div className='score mb-1'>
              
                <div className=''>
                <div className='overall w-full h-6 flex items-center justify-between  relative'>
                    <h3   className='z-10 ml-2'>{field}:</h3>
                    <h3 >45%</h3>
                    <div className='ber w-[56%] h-full bg-[#1d1d1d] absolute top-0'></div>
                </div>
                </div>
            </div>
            
})}

            <div className='score'>
                
                      <div className=''>
                <div className='overall w-full h-6 flex items-center justify-between  relative'>
                    <h3  style={{color : 'black'}} className='z-10 ml-2'>Overall</h3>
                    <h3 >45%</h3>
                    <div className='ber w-[56%] h-full bg-white absolute top-0'></div>
                </div>
                </div>
            </div>
        </div>
<div className='tabs  mt-6'>
    <div className='flex gap-7'>
{['Community members' , 'Others'].map((el , i)=>{
    return <h6 style={{opacity :currentIndex === i ? 1 : 0.66}} typeof='button' onClick={()=> setCurrentIndex(i)}>{el}</h6>
})}
</div>
<div className='w-full border-t  border-[#4d4d4d] h-1.5 caro'>
    <div style={{transform : `translate(${currentIndex*174}px)` }} className='bg-white duration-300 w-20 h-full
    '></div>
    </div>

</div>


<div className='votes mt-4  relative w-[30vw] h-[60vh] overflow-x-hidden overflow-y-scroll'>
<div  style={{transform : `translate(-${currentIndex*30}vw)`}} className='h-50  duration-300 w-[60vw]  flex'>
    <div className='h-100 w-[30vw] community-votes  '>
    <div className='see-votes  px-2 mt-5'>
    <div className='gap-50 mb-4 flex'>
        <p>Origin</p>
        <p>Passion</p>
    </div>
    <div>
   {Array.from({length : 10}).map((_ , i)=>{
    return  <div onClick={()=> setOpenIndex(i)} key={i} className={`vote duration-500  ${openIndex === i ? 'bg-[#1d1d1d] h-40': 'h-10' }`}>
  <div className='w-full pt-1 overview flex pr-8 justify-between'>
<div className='vote flex  items-center gap-20.5'>
    <div className='profile  flex items-center gap-1'>
        <Image height = {40} width = {40} alt  = 'profile pic' src='/image.png' className = 'h-8 w-8 rounded-full object-cover'/>
        <h6>@madybymeeza</h6>
    </div>
    <h6>Designer</h6>
</div>
<h6>8</h6>
</div>

<div style={{opacity : openIndex === i ? 1 : 0}} className='details duration-300 delay-200 mt-2 px-10 w-full '>
  {post?.voteFields?.map((el , i)=>{
    return <div className='justify-between w-full flex'>
        <p className='mb-1'>{el}</p>
        <p>7.5</p>
    </div>
  })}
  <div className='w-full flex justify-between'><h3>Overall</h3><h3>8.8</h3></div>
</div>
  
 </div>
   })}
</div>
</div>
    </div>
    <div className='h-50 w-[30vw] bg-[#353535]'></div>

</div>
</div>

<div className='other-detais px-2 mt-10'>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>madeby:</h6><h6>{post?.createdBy?.handle}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>posted:</h6><h6>{post?.createdAt}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>typeof:</h6><h6>{post?.category}</h6></div>

</div>

</div>




            
            </div>: <Loading/>}
        </div>
    )
}
