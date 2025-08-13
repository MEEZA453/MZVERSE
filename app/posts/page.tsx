'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useState , useEffect} from 'react'
import Notification from '../Components/Notification';
import Loading from '../Components/loading'
import { useDispatch  ,useSelector } from 'react-redux'
import { MdOutlineAttachFile } from "react-icons/md";
import { AppDispatch } from '../store/store'
import { useAuth } from '../Context/AuthContext';
import { getPostsAction } from '../store/actions/post';
export default function AllPosts() {
  const currentPath  = usePathname();

const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [red , setRed ] = useState(false)
    const [data , setData] = useState([])
  const { posts , loading} = useSelector((state: any) => state.posts);

  useEffect(()=>{
   dispatch(getPostsAction())
  },[dispatch])
  const handleClick = (path : string):void=>{
    router.push(currentPath + '/'+path)
  }
  const {token } = useAuth()

  return (
    <div className='w-screen px-2'>
      <Notification/>
      <MasterNavber />
     

   {   !loading ? <div className='lg:grid-cols-5  border-l border-[#4d4d4d] pl-1 grid-cols-2 grid'>
        {posts?.map((post:any, index:number) => (
          <div
        
            key={index}
            className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-32 pb-3 lg:h-90 min-h-[220px]"
          >
          <div className="absolute pointer-events-none w-full h-20 bg-gradient-to-t from-black to-[#00000000] z-[0] bottom-0"></div>
          

{post.images && post.images.length > 0 ? (
  <Image
    onClick={()=>handleClick(post._id)}
    height={300}
    width={300}
    alt="dff"
    src={post.images[0]}
    className="w-[75%] lg:mb-4 lg:w-[55%]"
    priority
  />
) : null}

            <div className="   absolute pb-2  flex justify-between items-center w-full pr-3 z-100 bottom-0 left-1 duration-200 ">
                        <div className="flex items-center  gap-1">
                          <button onClick={()=>router.push('/'+post?.createdBy?.handle)}><Image  
            height={300}
            width={300}
            alt='fdfdf'  className='h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover' src={post.createdBy.profile}/></button>  
              <div>
                          <h3 className='mt-2'>{post.name}  </h3>
                          <p style={{fontSize : '12px'}} className=''>@{post?.createdBy?.handle}  </p>
          
          
              </div>
                           {/* <label className='bg-[#d4d4d4] text-black text-[13px] leading-4 px-1 '>${product.amount}</label> */}
                        </div>
                        
                      </div>
          </div>
        ))}
      </div> : <Loading/>}
<div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[900] top-0"></div>

    </div>
  );
}
