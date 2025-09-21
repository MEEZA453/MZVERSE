import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../store/actions/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useAuth } from "../Context/AuthContext";

export default function AttachmentCard({asset , isAlreadyAddedToCart}){
    const  router = useRouter()

const [isAddedToCart  ,setAddedToCart] = useState(isAlreadyAddedToCart ?? false)
const {token}  = useAuth()
const  dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setAddedToCart(isAlreadyAddedToCart);
  }, [isAlreadyAddedToCart]);

const handleAddToBag = ()=>{
  if(!isAddedToCart){
setAddedToCart(true)
    dispatch(addToCart(asset?._id , token))
  }else{
    setAddedToCart(false)
    dispatch(removeFromCart(asset?._id , token))
  }
}
    return  <div

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
                        }}> {asset?.amount ? '$':null}{asset?.amount === 0 ? 'free':asset?.amount}</label>
                  </div>
                  <p style={{ fontSize: '12px' }}>@madeby</p>
                </div>
              </div>
              <button  style={{fontWeight : 400}}  onClick={handleAddToBag}  className={`text-[14px] pb-1  h-7 ${
            !isAddedToCart ? "bg-white text-black" : "border"
          } px-2  py-0.5 rounded-[3px]`}>{!isAddedToCart?'Add to bag':'Added'}</button>
            </div>
}