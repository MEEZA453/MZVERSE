'use client'

import { useAssets } from '../../Context/AllAssetsContext';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import { Product } from '../../types/Product';
import { HiOutlineLink } from "react-icons/hi2";
import MasterNavber from '../../Components/MasterNavber';
import ProductImages from '../../Components/ProductImages'
import Loading from '../../Components/loading'
import { PiHeartLight } from "react-icons/pi";
import { GoHeartFill } from "react-icons/go";
import Login from '../../Components/Login';
import { useShowInput } from '../../Context/ShowInputContext';
import { useState  , useEffect} from 'react';
import Notification from '../../Components/Notification';
import { useNotification } from '../../Context/Notification';
import { addToFavorites , removeFromFavorites } from '../../store/actions/fav';
import { useDispatch , useSelector} from 'react-redux';
import { AppDispatch } from '../../store/store';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';
import ProductMenu from '../../Components/ProductMenu';
import { useAuth } from '../../Context/AuthContext';
import { FaArrowDown } from 'react-icons/fa';
import { SlArrowDown } from 'react-icons/sl';
import ImageShower from '../../Components/ImageShower';
import { IoIosArrowBack } from 'react-icons/io';
import Useages from '../../Components/Useges';
export default function ProductPage() {
const pathname = usePathname()

const [openIndex, setOpenIndex] = useState(0);
const {setNotification , notification} = useNotification()
const productpath = pathname.split('/');
const [token , setToken] = useState('')
const [isMobile , setIsMobile] = useState(false)
const {role  } = useAuth()
const [red ,setRed ] = useState(false)
const {setShowLoginInput , setShowSignupInput , showLoginInput , showSignupInput} = useShowInput()
const slug = productpath[productpath.length - 1]
const [isMenu , setIsMenu] = useState(false)
  const [opacity, setOpacity] = useState(0); // start at 0
  const { data , loading}: { data: Product[] ; loading : boolean } = useAssets();
  const product = data.find((item) => item._id === slug);
  const [viewUsages , setViewUsages]  = useState(true)
  const router  = useRouter()


   useEffect(() => {
     if (typeof window !== 'undefined') {
       const profile = localStorage.getItem('profile')
       if (profile) {
         const parsedUser = JSON.parse(profile)
         setToken(parsedUser.token)
       }
     }
   }, [])
   useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])

useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300; // adjust scroll distance where opacity reaches 0.6
      const newOpacity = Math.min(scrollY / maxScroll, 0.6); 
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const dispatch = useDispatch<AppDispatch>();
  const isFavorited = false


  return (
    <div className='w-screen h-screen'>

  <Notification/>
       <MasterNavber setShowSignupInput={setShowSignupInput} setShowLoginInput={setShowLoginInput}/>
          <div className='w-full flex justify-between lg:w-[70vw] items-center px-3 fixed z-[999] top-14 '>
                     <div className='flex gap-1 items-center justify-center'>
                     <button onClick={()=> router.back()}>
                       <IoIosArrowBack size={20} />
                       
                       </button>
                     <h4 >{product?.name}</h4></div>
           
                     <button className=' text-white' onClick={()=> {setIsMenu(true)}}><HiOutlineDotsVertical/></button></div>
                       <AnimatePresence>{  isMenu ?  <ProductMenu setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> 
      {showLoginInput ? <div className='z-[999] fixed   bg-black/70 h-screen w-screen '><Login setShowLoginInput={setShowLoginInput}/></div>:null}
      {
      loading ? <Loading/>: <main  className='desc flex max-sm:flex-col h-screen w-screen  max-sm:items-center'>

<section className='sticky top-0'>
<div       style={{ opacity }} className='h-full absolute pointer-events-none top-0 z-[99] w-full bg-black'></div>
        <ImageShower isMobile = {isMobile} images = {product?.image}/>
</section>
{/* <div className='absolute top-16 left-3 flex justify-between z-[999] w-[92vw]  lg:w-[68vw]'>
 <div  className='flex gap-[2px] lg:gap-2 items-center  '>

          <Image  
  height={300}
  width={300}
  alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                <h3 className='opacity-[0.66]'>meeza_29</h3>
            </div> 
              <button className='absolute z-[999] top-14 left-5 text-white' onClick={()=> {setIsMenu(true)}}><HiOutlineDotsVertical/></button>

              
        <AnimatePresence>{  isMenu ?  <ProductMenu setIsMenu = {setIsMenu} token={token?token:''} postId = {product?._id}/>:null} </AnimatePresence> 
           
</div> */}
<div  style={{ height: `${product?.image.length * 50 + 50}vh` }} className=' '>

        <aside  className='flex flex-col bg-black pt-3 -translate-y-4 rounded-t-[6px] items-center  w-screen sticky top-2    lg:mt-4'>
<div className='w-full mb-8 px-2'>
  <div className='w-full mt-1  border-[#4d4d4d] pb-1 flex border-b justify-between items-center'>
    <h3 >createdBy:</h3>
    <h3 >@immeeza</h3>
  </div>
 <div className='w-full mt-1 border-[#4d4d4d] pb-1 flex border-b justify-between items-center'>
    <h3>Supply type:</h3>
    
            <label className='text-[13px] pt-0.5 bg-[#4d4d4d] text-[#dadada] px-2'>Preset</label>
        
  </div>
<div className='w-full  mt-1 border-[#4d4d4d] pb-1 flex border-b justify-between items-center'>
    <h3 >Size:</h3>
    <h3 >2.0GB</h3>
  </div>
  <button className='bg-white text-black w-full rounded-[2px]  h-6 flex items-center justify-center pb-0.5 text-[14px] mt-4'>Buy now</button>
  <button className='border border-white text-white w-full rounded-full h-6 flex items-center pb-1 justify-center  text-[14px] mt-2'>Add to Bag</button>


</div>

<div className='w-full justify-between  flex px-2'>
  <button onClick={()=>setViewUsages(true)} className={`text-[14px] w-full  ${viewUsages ? 'border-b opacity-100':'opacity-60'} duration-100`}>Useages</button>
  <button onClick={()=>setViewUsages(false)} className={`text-[13px] w-full  ${viewUsages ? 'opacity-60':'border-b opacity-100'} duration-100`}>Details of Asset</button>

</div>
         {/* <div className='pricing flex flex-col justify-between pb-4 relative bg-white h-40 rounded w-[96%] '>
            <div className='name flex gap-1 px-2 items-center'>
            <h4 className='text-black'>{product?.name}</h4>    <label className="text-white mt-1.5 bg-black px-1.5 flex items-center justify-center py-2.5 " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '13px'
                        }}>$ 29.99</label>
            </div>
            <div className='buttons px-1 relative flex flex-col items-center gap-1'>
              <button className='buy w-full h-7 bg-black text- rounded pb-1'>Buy now</button>
              <button  className='buy w-full h-7 border rounded-full border-black pb-1 text-black'>View Profile</button>

            </div>
         </div> */}

<div className='h-full'>
{
  viewUsages?  <Useages assetId  = {product?._id} token ={token }/> :     <div className='details h-full mt-10'>
         <div className='section-details'>
          {product?.sections.map((section , index)=>{
            return <div  className={` h-fit  mb-2 duration-500`} key={index}>
              <div className=' flex justify-between items-center w-screen  lg:w-[30vw]   px-3'>
              <h4  className='mb-1   w-full '> {section.title}</h4>

              </div>
              <div className={`px-2 duration-200 delay-200`}>{section.content.map((el , i)=>{
                return <p className='mb-1' key={i}>- {el}</p>
              })}</div>
            </div>
          })}
         </div>
         <div className='hastags'>
          <h4 className='  mb-2 px-3 w-screen lg:w-[30vw]'>Tags</h4>
          <div className='flex px-3 gap-2'>

          {product?.hastags?.map((el , i)=>{
            return <label key={i} className='text-[14px] bg-[#4d4d4d] text-[#dadada] px-2'>#{el}</label>
            
          })}
          </div>
         </div>
      </div>
}
  </div>       

    
        </aside>
</div>


         </main>
    }

{/* <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[300] top-0"></div> */}
      
    </div>
  );
}
