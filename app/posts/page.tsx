'use client'
import MasterNavber from '../Components/MasterNavber'
import {useRouter} from 'next/navigation'
import {users} from '../lib/DummyUser'
export default function Posts(){
    const router = useRouter()
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
        <MasterNavber/>
                <div  className='grid grid-cols-3 lg:grid-cols-5'>

      {allPosts.map((p , i)=>{
          return <div onClick={()=> router.push(`${p.userId}/Gallary`)} key={i} className="group relative flex flex-col  items-center justify-center lg:p-4 p-2 border-r border-b border-[#4d4d4d] h-4 lg:h-90 min-h-[200px]">
            <div onClick={()=>handleProfileClick(p.userId)} className='flex gap-2 absolute top-2 left-1'>
                <img className='h-6 w-6 rounded-full items-center object-cover' src={p.userProfile}/>
                <p>{p.userId}</p>
            </div>
            <img className=' w-[70%]  mb-2 lg:mb-4 lg:w-[55%]' src={p.images[0]}/></div>
        })}
        </div>
    </div>
}