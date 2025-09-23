import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import { getFavoritesByHandle } from '../store/actions/fav';
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import PostCard from './PostCard';
import { getPromotion } from '../store/actions/Promotion'; 
export default function Promotion(){
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
  const {promotion , loading} = useSelector((state: any) => state.promotion)


   useEffect(() => {
  
    if (token) {
      dispatch(getPromotion(token));
    }
  }, [dispatch, promotion?.length, token]);

  const reoderedPromotion = [...promotion].reverse()
const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='fav    w-screen h-full'>
    { !loading?<div className='lg:grid-cols-5 grid-cols-2 px-3 lg:gap-5 lg:px-10  mb-10 grid'>
    {reoderedPromotion?.map((post:any, index : number) => (
      <div  key={index}>
        <PostCard post={post}/>
      </div>
            
           ))}
      </div> : <Loading/> }
  </div>
}