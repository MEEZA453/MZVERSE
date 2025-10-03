import React, { Suspense } from 'react'
import AllAssets from '../../Components/Supply'
import Supply from '../../Components/Supply'

function page() {
  return (
    <div>{

      <Suspense>

        <Supply/>
      </Suspense>
    }</div>
  )
}

export default page