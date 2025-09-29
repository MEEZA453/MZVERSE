import React, { Suspense } from 'react'
import ProductPage from '../../Components/ProductPage'

function Product() {
  return (
    <div>
      <Suspense>
        <ProductPage/>
        
        </Suspense>
    </div>
  )
}

export default Product