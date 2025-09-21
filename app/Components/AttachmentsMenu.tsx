'use client'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { detachAsset, getAssetsOfPost } from '../store/actions/attach';
import Image from 'next/image';
import SwipeToDelete from './SwipeToDelete';
import AttachmentCard from './AttachmentCard';

interface AttachmentsMenuProps {
  postId: string;
  token: string;
  setAttachmentsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  assetsOfPost :any;
  isMyPost : boolean;
}

export default function AttachmentsMenu({ postId, token, setAttachmentsMenu, assetsOfPost, isMyPost }: AttachmentsMenuProps) {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const dispatch = useDispatch<AppDispatch>();
  const [isAddToCart , setAddToCart] = useState(false)


  // ✅ fetch once when menu opens
  useEffect(() => {
    dispatch(getAssetsOfPost(postId, token));
  }, [dispatch, postId, token]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
  }, [])
const {items} = useSelector((state : any)=>state.cart)




  const handleAddToCart = ()=>{
    setAddToCart(!isAddToCart)
  }


  const handleDeleteClick = (assetId: string) => {
    console.log(assetId)
    dispatch(detachAsset(postId, assetId, token));
    // no need to call getAssetsOfPost again, reducer updates store immediately
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="h-screen w-screen z-[9999] fixed bottom-0   bg-[#101010]/50 backdrop-blur-xl"
    >
      <div onClick={() => setAttachmentsMenu(false)} className="w-screen h-screen "></div>
      {assetsOfPost?.length<1? <p className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center'>No attachments found</p>: <div>
      <motion.div
        initial={{ y: 160 }}
        animate={{ y: 0 }}
        exit={{ y: 160 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed  lg:w-[30vw] px-2  lg:h-fit z-200 bottom-4 py-2 -translate-x-1/2  left-1/2 flex px-1 flex-col items-center justify-center w-full rounded-[6px] gap-1"
      >
  
{assetsOfPost.map((asset: any , index : number) => {
  console.log(asset)
        const isAlreadyAddedToCart = items.some((f : any)=> f?.product?._id === String(asset?._id))

      return <div className='w-full'>

       {isMyPost ? <SwipeToDelete     onClose={() => setOpenIndex(null)}
            isOpen={openIndex === index}
            onOpen={() => setOpenIndex(index)} key={asset._id} onDelete={() => handleDeleteClick(asset._id)}>
           <AttachmentCard asset ={asset} isAlreadyAddedToCart = {isAlreadyAddedToCart}/>
          </SwipeToDelete> : <AttachmentCard asset ={asset} isAlreadyAddedToCart = {isAlreadyAddedToCart}/>}
            </div>
        })}
       
        
      </motion.div>
        </div>}
    </motion.div>
  );
}
