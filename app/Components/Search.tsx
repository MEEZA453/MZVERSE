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
export default function Search({setSearch}){
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
      if (selectedIndex === 0) {
        dispatch(getDefaultUsers(token)); // e.g. top users
      } else if (selectedIndex === 1) {
        dispatch(getDefaultPosts()); // e.g. trending posts
      } else if (selectedIndex === 2) {
        dispatch(getDefaultAssets(1, 20)); // e.g. recent assets
      }
    } else {
      // 🔹 Perform search normally
      if (selectedIndex === 0) {
        dispatch(searchUsers(query, token));
      } else if (selectedIndex === 1) {
        dispatch(searchPostsAction(query));
      } else if (selectedIndex === 2) {
        dispatch(searchAssets(query, 1, 20));
      }
    }
  }, 400);

  return () => {
    clearTimeout(handler);
  };
}, [query, selectedIndex, dispatch, token]);

       return     <div>

      <motion.div   initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }} className="h-110 fixed  top-0 z-[999] overflow-y-scroll left-0 w-screen bg-[#101010]">
             <div className="flex items-center z-[999] px-2   bg-[#101010] ">
<IoSearchOutline className=""
            color="#8d8d8d"
              size={19}
            />
          <input
          
            type="text"
            placeholder=" Search.."
           
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 outline-none text-sm"
            />
            </div>
            <div className='w-screen '>
            <div className='flex justify-between w-full px-7 bg-[#101010] sticky top-0 pt-2  border-b border-[#2c2b2b] pb-1 items-center'>
                {searchTabs.map((el , index)=>{
                    return <button style={{fontSize : '14px'}} onClick={()=>setSelectedIndex(index)} className={`${index === selectedIndex ? 'opacity-100': 'opacity-60'}`} key={index}>{el}</button>
                })}
                 </div>
            <div className='result'>
             { selectedIndex === 0 &&  <SearchedCreators/>}
             { selectedIndex === 1 &&  <SearchedPosts/>}
             { selectedIndex === 2 &&  <SearchedAssets/>}


       
            
            </div>
         </div>
    </motion.div> <div onClick={()=>setSearch(false)} className='h-screen w-screen z-[700] bg-black/70 fixed top-0 right-0'></div> </div> 
}