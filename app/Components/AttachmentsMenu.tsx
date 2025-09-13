'use client'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { detachAsset, getAssetsOfPost } from '../store/actions/attach';
import Image from 'next/image';
import SwipeToDelete from './SwipeToDelete';

interface AttachmentsMenuProps {
  postId: string;
  token: string;
  setAttachmentsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  assetsOfPost :any;
}

export default function AttachmentsMenu({ postId, token, setAttachmentsMenu, assetsOfPost }: AttachmentsMenuProps) {
  console.log(assetsOfPost)
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isAddToCart , setAddToCart] = useState(false)


  // ✅ fetch once when menu opens
  useEffect(() => {
    dispatch(getAssetsOfPost(postId, token));
  }, [dispatch, postId, token]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
  }, []);

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
      className="h-screen w-screen z-[999] fixed top-0   bg-[#101010]/50 backdrop-blur-xl"
    >
      <div onClick={() => setAttachmentsMenu(false)} className="w-screen h-screen "></div>
      {assetsOfPost?.length<1? <p className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center'>No attachments found</p>: <div>
      <motion.div
        initial={{ y: 160 }}
        animate={{ y: 0 }}
        exit={{ y: 160 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:absolute lg:w-60 lg:top-16 px-2 lg:left-[2vw] lg:h-fit z-200 bottom-4 py-2 max-sm:-translate-x-1/2 max-sm:left-1/2 flex px-1 flex-col items-center justify-center w-full rounded-[6px]"
      >
  
{assetsOfPost.map((asset: any) => (
          <SwipeToDelete key={asset._id} onDelete={() => handleDeleteClick(asset._id)}>
            <div

              className="w-full mb-1 rounded-[3px] px-3 border border-[#2d2d2d] items-center relative flex h-12 bg-[#151515] flex justify-between"
            >
              <div className="flex gap-2 items-center py-2">
                <div className="h-10 w-10 bg-[#1d1d1d] flex items-center">
                  <Image
                                onClick={() => router.push('/AllAssets/' + asset._id)}
                    src={asset?.image?.[0]}
                    height={100}
                    width={100}
                    alt="preview"
                    className="h-9 w-fit rounded-[2px] object-cover"
                  />
                </div>
                <div>
                  <div className='flex items-center gap-1 justify-center'>
                  <h6>{asset?.name}</h6>
            <label className="bg-white text-black px-1.5 flex items-center justify-center py-2.5  " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                        }}>$ 29.99</label>
                  </div>
                  <p style={{ fontSize: '12px' }}>@madeby</p>
                </div>
              </div>
              <button  style={{fontWeight : 400}}  onClick={handleAddToCart}  className={`text-[14px] pb-1  h-7 ${
            !isAddToCart ? "bg-white text-black" : "border"
          } px-2  py-0.5 rounded-[3px]`}>{!isAddToCart?'Add to bag':'Added'}</button>
            </div>
          </SwipeToDelete>
        ))}
       
        
      </motion.div>
        </div>}
    </motion.div>
  );
}
