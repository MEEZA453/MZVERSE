'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../store/actions/follow";
import { useAuth } from "../Context/AuthContext";
import { AppDispatch } from "../store/store";

export default function User({ user, isFollowing , isFollowingList }: { user: any; isFollowing?: boolean; isFollowingList?: boolean}){
    console.log(isFollowing)
    const {token} = useAuth()
    const router  = useRouter()
    const dispatch = useDispatch<AppDispatch>()
const  handleUnfollow  =()=>{
      dispatch(unfollowUser(user?._id, token));
}

    const handleFollowClick = () => {
      if (!user._id) return;
    
      if (isFollowing) {
        dispatch(unfollowUser(user?._id, token));
      } else {
        dispatch(followUser(user?._id, token));
      }
    };
    return <div className=' flex bg-[#151515] mb-[1px] w-full h-10  px-2 items-center justify-between'>
        <div className='profile w-30  flex items-center gap-1'>
            <Image onClick={()=> router.push(`/${user?.handle}`)} height = {100} width = {100} alt  = 'profile pic' src={user?.profile || '/image.png'} className = 'h-8 w-8 rounded-full object-cover'/>
            <h3 >@{user?.handle || 'unknowuser'}</h3>
        </div>
        <h3 >Designer</h3>
{ isFollowingList ? <button onClick={handleUnfollow} className={`text-[13px] border px-2 py-0.5 rounded-[3px] `}>Unfollow</button>:<button  
 onClick={handleFollowClick} className={`text-[13px] ${!isFollowing ?  'bg-white text-black' : 'border'} px-2 py-0.5 rounded-[3px] `}>{!isFollowing ? 'Follow' : 'following'}</button>}
    </div>
}