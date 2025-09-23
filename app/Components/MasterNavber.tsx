'use client'
import { useRouter , usePathname  } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState , useRef }  from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
import { GoPlus } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import CreateMenu from './CreateMenu';
import { useAuth } from '../Context/AuthContext';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import Search from './Search';
import { VscMail } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { getNotifications } from '../store/actions/notification';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useNotification } from '../Context/Notification';
import CreateMenuLg from './CreateMenuLg';
import { PiBag } from "react-icons/pi";
import { useThemeContext } from '../Context/ThemeContext';

interface MasterNavberProps {
  setShowLoginInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignupInput?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCart?: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function MasterNavber({setShowLoginInput , setShowSignupInput , setIsCart}:MasterNavberProps) {
  const router = useRouter();
  
  const {setIsNotification}  = useNotification()
  
  const  [isMobile , setIsMobile ]  = useState(false)
  const {isLoggedIn , profileLink , user} = useAuth();
 const [openCreate , setOpenCreate] = useState(false)
  const currentPath = usePathname();
  const [search ,setSearch] = useState(false)
  const {isLightMode} = useThemeContext()
   const [activeIndex ,setActiveIndex]  = useState(1)
const  dynamicButtonRef = useRef<HTMLButtonElement>(null)
  const outerMenu: { name: string; path: string }[] = [
    { name: 'Store', path: '/AllAssets' },
    { name: 'Gallary', path: '/posts' },
  ];

  const innerMenu: { name: string; path: string }[] = [
    { name: 'Texture', path: '/' },
    { name: 'Inspiration', path: '/' },
    { name: 'Presets', path: '/' },
    { name: 'Account', path: '/' },

  ];
  const dispatch = useDispatch<AppDispatch>()
  const {token} = useAuth()
    const { items } = useSelector((state: any) => state.notification);
     useEffect(() => {
    if (token) {
      dispatch(getNotifications(token));
    }
  }, [dispatch, token]);

    const hasUnread = items.some((n) => !n.isRead);

  const [isLargeScreen, setIsLargeScreen] = useState(false);
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
  useEffect(() => {
    // Safe window access
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 640);
    };

    handleResize(); // call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
// useEffect(()=>{
// if(currentPath  === '/' && dynamicButtonRef.current){
//   dynamicButtonRef.current.innerText = 'Join community'
// }else{
//   dynamicButtonRef.current.innerText = 'Login'

// }
// },[])
  return (
    <nav  className="w-screen  overflow-hidden">

      <div className="  w-screen border-[#4d4d4d] flex justify-between items-center px-1 lg:px-2">
        
        <div>
        </div>
      </div>

      <div className="top-2 fixed z-[700] lg:px-3 bottom  border-[#4d4d4d]  flex w-screen justify-between items-center">
<button onClick={()=>router.push('/')}><Image alt='logo' width={100} height={100} src="/logo.png" className="w-8 ml-2 rounded-xl lg:w-7" /></button>

        {/* <div className="flex gap-1 fixed top-15 left-1/2 -translate-x-1/2 lg:gap-6">
          {outerMenu.map((el, i) => (
            <button   className={`border ${i === activeIndex ? 'text-black bg-white': 'text-white'}  rounded text-[14px] lg:w-60 w-[160px] py-0.5`} onClick={()=>{ setActiveIndex(i), router.push(el.path)}} key={i}>{el.name}</button>
            ))}
            </div> */}

      
            {search && <Search setSearch = {setSearch} />}

        <div className="flex gap-3 mr-2 items-center lg:gap-6 lg:mr-4">
          <div className="search mt-0.5 relative">
      
          <button onClick={()=>setSearch(true)}>
            <IoSearchOutline className='mt-1'
            
            size={20}
            /> 

            </button> 
              

          </div>
          {/* <h6>[ 10 ]</h6> */}
          {isLoggedIn? <div className='flex  gap-4  lg:gap-4'><div className='flex gap-4'>
            {/* <button className=" text-white  duration-300"onClick={()=> router.push('/createPost ') } ref={dynamicButtonRef}><GoPlusCircle size={22}/></button> */}

             <button style={{color: isLightMode ? 'black': 'white'}} className=" relative text-white  duration-300"onClick={()=> setIsNotification(true) } ref={dynamicButtonRef}><VscMail size={22}/>
               {hasUnread && (
          <span className="absolute top-[6px] right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
        )}
             </button>
 <button style={{color: isLightMode ? 'black': 'white'}} onClick={()=>setIsCart(true)}>
            <PiBag className=''
            
            size={20}
            /> 

            </button> 
            <button style={{rotate : openCreate ? '45deg' : '0deg',color: isLightMode ? 'black': 'white'}}  className=" text-white  duration-300"onClick={()=> setOpenCreate(!openCreate)} ref={dynamicButtonRef}><GoPlusCircle size={22}/></button>

           <AnimatePresence> {openCreate && <CreateMenu setOpenCreate = {setOpenCreate}/>}</AnimatePresence>
                      <Image height = {100} width ={100} alt ="profile" onClick={()=>router.push('/'+profileLink)} className='w-8 h-8 rounded-full full object-cover' src={user.profile || '/image.png'}/>
                      
          
 </div></div>
          :null
        }
                  </div>
      </div>

    </nav>
  );
}
  // <div className='flex gap-2 items-center'>
  //             <button className='border border-white px-2 rounded-[4px] py-0.5 text-[15px] text-white ' onClick={()=> setShowSignupInput(true)} ref={dynamicButtonRef}>Sign up</button>
  //           <button className='border bg-white px-2 py-0.5 text-[15px] text-black rounded-[3px]' onClick={()=> setShowLoginInput(true)} ref={dynamicButtonRef}>Login</button>
        
  //         </div>