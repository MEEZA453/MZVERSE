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
}

export default function AttachmentsMenu({ postId, token, setAttachmentsMenu }: AttachmentsMenuProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { assetsOfPost } = useSelector((state: any) => state.attach);
console.log(assetsOfPost)
  // ✅ fetch once when menu opens
  useEffect(() => {
    dispatch(getAssetsOfPost(postId, token));
  }, [dispatch, postId, token]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
  }, []);

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
      className="h-screen w-screen z-[999] fixed top-0 bg-black/50"
    >
      <div onClick={() => setAttachmentsMenu(false)} className="w-screen h-screen"></div>

      <motion.div
        initial={{ y: 160 }}
        animate={{ y: 0 }}
        exit={{ y: 160 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:absolute lg:w-60 lg:top-16 lg:left-[2vw] lg:h-fit z-200 bottom-4 py-2 max-sm:-translate-x-1/2 max-sm:left-1/2 flex px-3 flex-col items-center justify-center w-full rounded-[6px]"
      >
        {assetsOfPost.map((asset: any) => (
          <SwipeToDelete key={asset._id} onDelete={() => handleDeleteClick(asset._id)}>
            <div
              onClick={() => router.push('/AllAssets/' + asset._id)}
              className="w-full mb-1 rounded-[3px] px-3 border border-[#2d2d2d] relative flex h-12 bg-[#1d1d1d]"
            >
              <div className="flex gap-2 items-center py-2">
                <div className="h-10 w-10 bg-[#1d1d1d] flex items-center">
                  <Image
                    src={asset?.image?.[0]}
                    height={100}
                    width={100}
                    alt="preview"
                    className="h-9 w-fit rounded-[2px] object-cover"
                  />
                </div>
                <div>
                  <h6>{asset?.name}</h6>
                  <p style={{ fontSize: '12px' }}>@madeby</p>
                </div>
              </div>
            </div>
          </SwipeToDelete>
        ))}
      </motion.div>
    </motion.div>
  );
}
