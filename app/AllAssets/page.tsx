'use client'
import MasterNavber from '../Components/MasterNavber';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useEffect, useState} from 'react'
import Notification from '../Components/Notification';
import Loading from '../Components/loading'

import { MdOutlineAttachFile } from "react-icons/md";
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { getDesign } from '../store/actions/design';
import { useSelector } from 'react-redux';
import StoreCard from '../Components/StoreCard';
import { VscUnlock } from "react-icons/vsc";
import { SkeletonCard } from '../Components/Skeleton/SkeletonCard';
import { useAuth } from '../Context/AuthContext';
import { SkeletonMyPostCard } from '../Components/Skeleton/SkeletomMyPostCard';
export default function AllAssets() {
  const currentPath  = usePathname();
   const [unlock, setUnlock] = useState(false)

  const router = useRouter();
  const [red , setRed ] = useState(false)

  const {token}  = useAuth()

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDesign(token));
      
    };
    
    fetchData();

  }, [dispatch , token]);
useEffect(() => {
  if (!unlock) {
    document.body.style.overflow = "hidden"; // lock scroll
  } else {
    document.body.style.overflow = "auto"; // unlock scroll
  }

  return () => {
    document.body.style.overflow = "auto"; // cleanup
  };
}, [unlock]);
  const {items , loading} = useSelector((state: any) => state.design);

  return (
    <div className='w-screen px-4 mt-10 lg:px-22'>
      {/* <Notification/>
      <MasterNavber /> */}
     {/* { !unlock && <div className={'w-screen h-screen fixed top-0 bg-black/20 backdrop-blur-2xl z-400 flex items-center justify-center'}>
      <div className='flex flex-col items-center justify-center  gap-2'>
<p>Shop feature will open  soon</p>
    <button onClick={()=>setUnlock(true)} className='bg-[#dadada]/70 py-1 px-3 text-[14px] border-white rounded-full text-black flex items-center justify-center'><VscUnlock />Try Beta</button>
      </div>
    </div>} */}

      {   !loading ? <div className='lg:grid-cols-5 lg:gap-5 gap-2   grid-cols-2 grid'>
           {items?.map((product:any, index:number) => (
             <div key={index}>
     <StoreCard   product={product}/>
     </div>
           ))}
         </div> : <div className="lg:grid-cols-5 lg:gap-5 gap-1   grid-cols-2 grid">
               {Array.from({ length: 6 }).map((_, i) => (
                 <SkeletonMyPostCard key={i} />
               ))}
             </div>}

    </div>
  );
}
