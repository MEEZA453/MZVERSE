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
import { useThemeContext } from '../Context/ThemeContext';
export default function Search({setSearch}){
    const searchTabs = ['Creators' , 'posts' , 'Assets'];
    const  {isLightMode}  = useThemeContext()
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
        dispatch(getDefaultAssets(1, 20, token)); // e.g. recent assets
      }
    } else {
      // 🔹 Perform search normally
      if (selectedIndex === 0) {
        dispatch(searchUsers(query, token));
      } else if (selectedIndex === 1) {
        dispatch(searchPostsAction(query));
      } else if (selectedIndex === 2) {
        dispatch(searchAssets(query, 1, 20 , token));
      }
    }
  }, 400);

  return () => {
    clearTimeout(handler);
  };
}, [query, selectedIndex, dispatch, token]);

       return     <div>

      <motion.div   initial ={{ y : -120 ,  opacity : 0}}  animate = {{y : 0 , scale : 1, opacity : 1}} transition={{duration : 0.1 }} exit ={{ y : -120 , opacity : 0}} className={`" lg:h-122 h-120 pt-2 fixed ${isLightMode ? 'bg-white' : 'bg-[#0d0d0d]'} top-0 z-[999] lg:w-140 overflow-y-scroll hide-scrollbar -translate-x-1/2 left-1/2 lg:top-10 lg:rounded-[6px] left-0 w-screen `}>
           <div className={`w-screen lg:w-full sticky ${isLightMode ? 'bg-white' : 'bg-[#0d0d0d]'} top-0 pt-1 z-100 `}>
             <div className={`flex items-center mx-2 z-[999]  ${isLightMode ? 'bg-[#ededed]' : 'bg-[#1d1d1d]/70'} pb-2 px-2  h-8  rounded-full my-3`}>
<IoSearchOutline className="mt-2"
            color="#8d8d8d"
              size={19}
            />
          <input
          
            type="text"
            placeholder=" Search.."
           style={{backgroundColor : 'transparent', borderColor : 'transparent'}}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-1 pt-2 outline-none text-sm"
            />
            </div>
            <div className={`tabs  flex justify-between w-full px-7  -translate-y-0  ${isLightMode ? 'border-[#dadada]' : 'border-[#2c2b2b]'} pb-1 items-center`}>
                {searchTabs.map((el , index)=>{
                    return <button style={{fontSize : '14px'}} onClick={()=>setSelectedIndex(index)} className={`${index === selectedIndex ? `opacity-100 border-b ${isLightMode ?'border-black':'border-white'}`: 'opacity-60'} w-full`} key={index}>{el}</button>
                })}
                 </div>
            </div>
      
            
            <div className='result'>
             { selectedIndex === 0 &&  <SearchedCreators/>}
             { selectedIndex === 1 &&  <SearchedPosts/>}
             { selectedIndex === 2 &&  <SearchedAssets/>}


       
            
         </div>
    </motion.div> <motion.div initial = {{opacity : 0}} animate = {{opacity : 0.7}} transition={{duration : 0.2}} exit = {{opacity : 0}} onClick={()=>setSearch(false)}  className='h-screen w-screen z-[700]  fixed top-0 right-0  bg-black'></motion.div> </div> 
}