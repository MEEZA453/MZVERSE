import { useSelector } from "react-redux"
import { getAssetsOfPost } from "../store/actions/attach"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import Attachment from "./Attachment"
import MultipleAttachment from "./Skeleton/MultipleAttachment"

export default function Attachments ({postId , token, setAttachmentsMenu}){
    const dispatch = useDispatch<AppDispatch>()
    const {assetsOfPost} = useSelector((state: any)=>state.attach)
    console.log(assetsOfPost)

    useEffect(()=>{
          dispatch(getAssetsOfPost(postId , token))
    },[dispatch , token])
   return (
  <div className="px-2">
    {assetsOfPost.length > 1 ? (
      <MultipleAttachment 
      setAttachmentsMenu={setAttachmentsMenu}
        length={assetsOfPost?.length} 
        coverImage={assetsOfPost[0]?.image[0]} 
      />
    ) : (
      <Attachment asset={assetsOfPost[0]} />
    )}
  </div>
);
}