import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import { getPostsByHandleAction } from '../store/actions/post';
import PostCard from './PostCard';
export default function Crafts(){
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

    if (token) {
      dispatch(getPostsByHandleAction( handle));
    }
  }, [dispatch, handle , token]);

  const { posts , loading} = useSelector((state: any) => state.posts)

const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='  w-[100vw] h-full'>{posts?.length > 0 ?<div>

    { !loading?<div className='lg:grid-cols-5 grid-cols-2 px-2 mb-10 grid'>
    {posts?.map((post:any, index : number) => (
      <div key={index}>
              <PostCard post={post}/>
             </div>

))}
      </div> : <Loading/> }
</div>:<p className='w-screen mt-10 text-center'>{` You have'nt craft anything yet.`}</p>}
  </div>
}