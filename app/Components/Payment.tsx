'use client'
import PayButton from "./PaypalButton";

export default  function Payment({productId , token}){
    return <div className="h-screen w-screen bg-black">
        Payment
        <PayButton productId={productId} token = {token} />
    </div>
}