import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import { getFavoritesByHandle } from '../store/actions/fav';
import Image from 'next/image';
import { AppDispatch } from '../store/store';
export default function Favourites(){
    const [token , setToken] = useState('')
    const dispatch = useDispatch<AppDispatch>();
const  handle = usePathname().split('/')[1]
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile')
      if (profile) {
        const parsedUser = JSON.parse(profile)
        setToken(parsedUser.token)
      }
    }
  }, [])


   useEffect(() => {
    console.log('called')
    if (token) {
      dispatch(getFavoritesByHandle(token , handle));
    }
  }, [dispatch, handle , token]);

  const { favourites } = useSelector((state: any) => state.favourites)
  console.log(favourites)
const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='fav border-l border-[#4d4d4d] w-screen h-full'>
     <div className='lg:grid-cols-5 grid-cols-2 grid'>
    {favourites?.map((product:any, index : number) => (
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
   
               <div className="absolute  group-hover:-translate-y-5 duration-200 left-2 top-[88%]">
                 <div className="flex items-center gap-2">
                   {/* <h6 className=''>{product.name}  </h6> */}
                    {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                 </div>
                 <div className='flex gap-1'>
                   {product?.hastags?.map((h:string , i:number)=>{
                     return  <p key={i} className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   #{h} 
                 </p>
                   })}
                 </div>
                
               </div>
             </div>
           ))}
      </div> 
  </div>
}