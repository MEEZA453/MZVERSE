'use client'
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'
import SearchedCreators from './SearchedCreators';
import SearchedPosts from './SearchedPosts';
import SearchedAssets from './SearchedAssets';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { searchUsers } from '../store/actions/auth';
import { useAuth } from '../Context/AuthContext';
import { searchPostsAction } from '../store/actions/post';

import { useSelector } from 'react-redux';
import { getDefaultAssets, getDefaultPosts, getDefaultUsers, searchAssets } from '../store/actions/search';
import SearchedAssetsToAttach from './SearchAssetsToAttach';
export default function SearchAssets({setSearchAssets , postId}){
    const searchTabs = ['Creators' , 'posts' , 'Assets'];
    const [selectedIndex , setSelectedIndex] = useState(0)
  const [query , setQuery ] = useState("")

  const {token} =  useAuth()
  const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
  const handler = setTimeout(() => {
    if (!query.trim()) {
      // 🔹 Fetch default results if query is empty
        dispatch(getDefaultAssets(1, 20 , token)); // e.g. recent assets

    } else {
      // 🔹 Perform search normally
  
        dispatch(searchAssets(query, 1, 20 , token));
      
    }
  }, 400);

  return () => {
    clearTimeout(handler);
  };
}, [query, selectedIndex, dispatch, token]);

       return     <div>

      <motion.div   initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }} className="h-fit  rounded-b  rounded-lg lg:h-100  fixed  top-0 z-[999] lg:w-[35vw] overflow-y-scroll hide-scrollbar -translate-x-1/2 left-1/2  px-2 lg:top-4 lg:rounded left-0 w-screen ">
             <div className="flex items-center z-[999]   h-8 bg-[#1d1d1d]/70 rounded-full my-3 ">
<IoSearchOutline className=""
            color="#8d8d8d"
              size={19}
            />
          <input
          
            type="text"
            placeholder=" Search assets.."
           
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-1 outline-none text-sm"
            />
            </div>
            <div className='w-screen lg:w-full '>
            <div className='result'>
     
     <SearchedAssetsToAttach postId={postId}/>


       
            
            </div>
         </div>
    </motion.div> <div onClick={()=>setSearchAssets(false)} className='h-screen w-screen z-[700]  fixed top-0 right-0  bg-black/50 backdrop-blur-xl'></div> </div> 
}