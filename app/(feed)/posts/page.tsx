'use client'
import { Suspense } from "react";
import AllPosts from "../../Components/AllPosts"; 

export default function Posts(){
  return <div>
  <Suspense>
    
      <AllPosts/>
    </Suspense>
  </div>
}