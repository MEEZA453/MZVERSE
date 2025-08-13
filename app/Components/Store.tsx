import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { getProductById } from "../store/actions/auth";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import Loading from './loading'
import { MdOutlineAttachFile } from "react-icons/md";
export default function Store(){
    const dispatch = useDispatch<AppDispatch>();
const pathname = usePathname();
const userHandle = pathname.split('/').pop();
useEffect(()=>{
      if (!userHandle) return; 
    console.log('getting')
 dispatch(getProductById(userHandle))
},[userHandle ])

const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    const { product, loading, error } = useSelector((state: any) => state.getProductOfUser || {});
    return   <div className='assets w-screen h-full'>
    { !loading ? <div className='lg:grid-cols-5 grid-cols-2 grid'>
    {product?.map((product:any, index : number) => (
             <div
           
               key={index}
               className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-32 pb-3 lg:h-90 min-h-[220px]"
             >
               {/* <button onClick={handleFavClick} className='absolute top-2 left-2' >{red ? <GoHeartFill size={18}className='text-red-600'/>:<PiHeartLight size={18} className='text-[#4d4d4d]' />}</button> */}
               {/* <div  className='flex gap-[2px] lg:gap-2 items-center absolute top-2 left-1'>
   
             <Image  
     height={300}
     width={300}
     alt='fdfdf'  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                   <h3 className='opacity-[0.66]'>meeza_29</h3>
               </div> */}
   
   {product.image && product.image.length > 0 ? (
     <Image
       onClick={()=>handleClick(product._id)}
       height={300}
       width={300}
       alt="dff"
       src={product.image[0]}
       className="w-[55%] lg:mb-4 lg:w-[55%]"
       priority
     />
   ) : null}
   
                   <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div>
               
                               <div className=" absolute pb-2  flex justify-between items-center w-full pr-3 z-100 bottom-0 left-1 duration-200 ">
                                            <div className="flex items-center  gap-1">
                                                <Image  
                                height={300}
                                width={300}
                                alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                                  <div>
                                              <h3 className=''>{product.name}  </h3>
                                              <p style={{fontSize : '13px'}} className=''>@madyby  </p>
                              
                              
                                  </div>
                                               {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                                            </div>
                                            <h6 >${product.amount}</h6>
                                          </div>
             </div>
           ))}
      </div> : <Loading/>}
  </div>
}