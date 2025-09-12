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
import { searchAssets } from '../store/actions/design';
import { useSelector } from 'react-redux';
import { getDefaultAssets, getDefaultPosts, getDefaultUsers } from '../store/actions/search';
import SearchedAssetsToAttach from './SearchAssetsToAttach';
export default function SearchAssets({setSearchAssets , postId}){
    const searchTabs = ['Creators' , 'posts' , 'Assets'];
    const [selectedIndex , setSelectedIndex] = useState(0)
  const [query , setQuery ] = useState("")
  console.log(query)
  const {token} =  useAuth()
  const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
  const handler = setTimeout(() => {
    if (!query.trim()) {
      // 🔹 Fetch default results if query is empty
        dispatch(getDefaultAssets(1, 20)); // e.g. recent assets

    } else {
      // 🔹 Perform search normally
   
        dispatch(searchAssets(query, 1, 20));
      
    }
  }, 400);

  return () => {
    clearTimeout(handler);
  };
}, [query, selectedIndex, dispatch, token]);

       return     <div>

      <motion.div   initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }} className="h-91 rounded-b  rounded-lg lg:h-100  fixed  top-0 z-[999] lg:w-[35vw] overflow-y-scroll hide-scrollbar -translate-x-1/2 left-1/2 lg:top-4 lg:rounded left-0 w-screen bg-[#101010]">
             <div className="flex items-center z-[999] px-2 pt-1  bg-[#101010] ">
<IoSearchOutline className="mt-2"
            color="#8d8d8d"
              size={19}
            />
          <input
          
            type="text"
            placeholder=" Search.."
           
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-1 pt-2 outline-none text-sm"
            />
            </div>
            <div className='w-screen lg:w-full '>
            <div className='result'>
     
     <SearchedAssetsToAttach postId={postId}/>


       
            
            </div>
         </div>
    </motion.div> <div onClick={()=>setSearchAssets(false)} className='h-screen w-screen z-[700] bg-black/70 fixed top-0 right-0'></div> </div> 
}