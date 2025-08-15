'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
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

export default function AllAssets() {
  const currentPath  = usePathname();

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [red , setRed ] = useState(false)



  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
          setLoading(false);
    const fetchData = async () => {
      await dispatch(getDesign(9 , 10));
   
    };

    fetchData();
  }, [dispatch]);

  const data = useSelector((state: any) => state.design);

  return (
    <div className='w-screen px-2 '>
      {/* <Notification/>
      <MasterNavber /> */}
     

   {   !loading ? <div className='lg:grid-cols-5 border-l  border-[#4d4d4d] grid-cols-2  grid'>
        {data?.map((product, index) => (
          <div   key={index} >
         <StoreCard product = {product}/>
          </div>
        ))}
      </div> : <Loading/>}


    </div>
  );
}
