'use client'
import MasterNavber from '../Components/MasterNavber'
import {useRouter} from 'next/navigation'
import {users} from '../lib/DummyUser'
import JoinCommunityInput from '../Components/JoinCommunity'
import Login from '../Components/Login'
import { useShowInput } from '../Context/ShowInputContext'
export default function Posts(){
    const router = useRouter()
    const {showLoginInput , setShowLoginInput , setShowSignupInput , showSignupInput} = useShowInput()
   const allPosts = users.flatMap(user => user.post.map(post => ({
    
    ...post,
    userId: user.id,
    userName: user.name,
    userProfile: user.profile
  })))
const handleProfileClick = (userId:string)=>{
    window.location.href = window.location.origin+'/'+userId
}
    return <div>
            <MasterNavber setShowSignupInput={setShowSignupInput} setShowLoginInput={setShowLoginInput}/>

    {showSignupInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<JoinCommunityInput setShowSignupInput={setShowSignupInput}/>
</div>: null}
 {showLoginInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<Login setShowLoginInput={setShowLoginInput}/>
</div>: null}

                <div  className='grid grid-cols-3 lg:grid-cols-5'>

      {allPosts.map((p , i)=>{  
          return <div  key={i} className="group relative flex flex-col  items-center justify-center lg:p-4 p-2 border-r border-b border-[#4d4d4d] h-4 lg:h-90 min-h-[200px]">
              <div onClick={()=> handleProfileClick(p.userId)} className='flex cursor-pointer gap-1 lg:gap-2 items-center absolute top-2 left-1'>

         <img  className='h-5 lg:h-6 w-5 lg:w-6 rounded-full items-center object-cover' src='/image.png'/>
                <h3 className='opacity-[0.66]'>{p.userId}</h3>
            </div>

            <img className=' w-[70%]  mb-2 lg:mb-4 lg:w-[55%]'
            //  onClick={()=> { window.location.href = window.location.origin+'/'+ p.userId+'/Gallary'}}
              src={p.images[0]}/></div>
        })}
        </div>
    </div>
}