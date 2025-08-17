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
export default function Search({setSearch}){
    const searchTabs = ['Creators' , 'posts' , 'Assets'];
    const [selectedIndex , setSelectedIndex] = useState(0)
  const [query , setQuery ] = useState("")
  console.log(query)
  const {token} =  useAuth()
  const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
    if (!query.trim()) return; // don’t search empty query

    const handler = setTimeout(() => {
      if (selectedIndex === 0) {
        dispatch(searchUsers(query , token)); // 🔹 search creators
      } else if (selectedIndex === 1) {
        dispatch(searchPostsAction(query)); // 🔹 search posts
      } else if (selectedIndex === 2) {
        dispatch(searchAssets(query , 1 , 20)); // 🔹 search assets
      }
    }, 400); // 400ms debounce
    return () => {
      clearTimeout(handler); // cleanup
    };
  }, [query, selectedIndex, dispatch]);
       return     <div>

      <motion.div   initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }} className="h-100 fixed  top-0 z-[999] overflow-y-scroll left-0 w-screen bg-[#101010]">
             <div className="flex items-center z-[999] px-2 sticky top-0  bg-[#101010] ">
<IoSearchOutline className=""
            color="#8d8d8d"
              size={19}
            />
          <input
          
            type="text"
            placeholder=" Search.."
           
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 outline-none text-sm"
            />
            </div>
            <div className='w-screen'>
            <div className='flex justify-between w-full px-7  mt-2 border-b border-[#2c2b2b] pb-1 items-center'>
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