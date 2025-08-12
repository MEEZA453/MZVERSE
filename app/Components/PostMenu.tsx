import { MdDelete } from "react-icons/md";
import {useState , useEffect} from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deletePostAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
export default function PostMenu({postId , token}){

const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
}
    return <div className="bg-[#1d1d1d] absolute  z-[990] top-18 rounded-[2px] left-13 h-fit w-40">
  <button
      onClick={()=>handleDeleteClick()}
      className="text-red-500 border-b border-[#4d4d4d] w-full text-[14px] px-3 py-1 flex items-center justify-left gap-1"
    >
      Delete post 
    </button>
      <button
      onClick={()=>handleDeleteClick()}
      className="text-white text-[14px]  px-3 py-1 flex items-center justify-left gap-1"
    >
      Edit post
    </button>
    </div>
}