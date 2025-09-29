import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function HighlightInfoOfPost({isLightMode, postName, validVotes}) {
const router = useRouter()
  return (
    <div className='flex h-9    mb-2 items-center justify-between px-2 w-full'>
        <h5   className="px-0 " style={{color : isLightMode ?'black': 'white'}}>{postName} </h5>
       <div className="flex items-center">
{ validVotes.length > 0 && <div className="flex items-center">
  <h3>Voted by</h3>
  { validVotes.length > 0 && validVotes.slice(0, 3).map((vote, i) => (
    <div key={i} className={i !== 0 ? "-ml-2" : ""}>
      <Image
        onClick={() => router.push(`/${vote?.user?.handle}`)}
        height={100}
        width={100}
        alt="profile pic"
        src={vote?.user?.profile || "/image.png"}
        className={`h-6 w-6 rounded-full object-cover border-2 ${isLightMode?'border-white':'border-black'}`}
      />
    </div>
  ))}
  <div  className={`h-6 w-6 rounded-full  flex items-center justify-center border-2 -ml-2 font-[inter-light] ${isLightMode?'border-white bg-black text-white':'border-black bg-white text-black'}`}>+</div>
</div>}
</div>
</div>
  )
}

export default HighlightInfoOfPost