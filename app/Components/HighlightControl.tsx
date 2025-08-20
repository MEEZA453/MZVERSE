import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import { getFavoritesByHandle } from '../store/actions/fav';
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import PostCard from './PostCard';
import { getHighlight } from '../store/actions/Highlight';
export default function HighlightControl(){
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
      dispatch(getHighlight(token));
    }
  }, [dispatch, handle , token]);

  const {highlight , loading} = useSelector((state: any) => state.highlight)
  
const reoderedHighlight = [...highlight].reverse()
const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='fav border-l px-3  border-[#4d4d4d] w-screen h-full'>
    { !loading?<div className='lg:grid-cols-5 grid-cols-2 px-3 lg:gap-5 lg:px-10  mb-10 grid'>
    {reoderedHighlight?.map((post:any, index : number) => (
      <div  key={index}>
        <PostCard post={post}/>
      </div>
            
           ))}
      </div> : <Loading/> }
  </div>
}