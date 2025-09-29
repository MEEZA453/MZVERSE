import React, { Suspense } from 'react'
import AllAssets from '../Components/AllAssets'

function page() {
  return (
    <div>{

      <Suspense>

        <AllAssets/>
      </Suspense>
    }</div>
  )
}

export default page