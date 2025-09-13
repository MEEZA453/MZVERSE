import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {  detachAsset, requestAttachAsset } from "../store/actions/attach";
import { useAuth } from "../Context/AuthContext";

export default function SearchedAssetsCard({asset, postId, isAttached}){
const router = useRouter()
 const  [attached , setAttach] = useState( isAttached ?? false)
 const dispatch = useDispatch<AppDispatch>()
 const {token}  = useAuth()

  useEffect(() => {
    setAttach(isAttached ?? false);
  }, [isAttached]);
  const handleAttach = (assetId ) => {
    // if (!user._id) return;

    if (attached) {
      setAttach(false); // instant
      console.log('detached')
      dispatch(detachAsset(postId , assetId, token))
    } else {
      dispatch(requestAttachAsset(postId , assetId , 'dfdf', token))
      setAttach(true); // instant


    }
  };

return <div  className="w-full flex justify-start px-2">
            <div className="px-2 justify-between w-full mt-2 items-center flex">
                <div className="flex gap-2 items-center justify-center">
                    <div className="h-10 w-10 bg-[#1d1d1d] flex items-center justify-center">
                    <Image   onClick={()=>router.push(`/AllAssets/${asset?._id}`)}  src={asset?.image?.[0]} height={100} width={100}  alt="preview" className="h-9 w-fit rounded-[2px] object-cover"/></div>
                    <h6>{asset?.name}</h6>
                </div>
            <button
          onClick={()=>handleAttach(asset?._id )}
          className={`text-[13px] border px-2 py-0.5 rounded-[2px] `}
        >
          {!attached ? "Send reaqest" : "Requested"}
        </button>
                 </div>
        </div>
}