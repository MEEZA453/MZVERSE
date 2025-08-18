import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import { getFavoritesByHandle } from '../store/actions/fav';
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import PostCard from './PostCard';
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
  
    if (token) {
      dispatch(getFavoritesByHandle(token , handle));
    }
  }, [dispatch, handle , token]);

  const { favourites , loading} = useSelector((state: any) => state.favourites)
  
const reoderedFav = [...favourites].reverse()

const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='fav border-l border-[#4d4d4d] w-screen px-3 h-full'>
    { !loading?<div className='lg:grid-cols-5 grid-cols-2 grid'>
    {reoderedFav?.map((post:any, index : number) => (
      <div  key={index}>
        <PostCard post={post}/>
      </div>
            
           ))}
      </div> : <Loading/> }
  </div>
}