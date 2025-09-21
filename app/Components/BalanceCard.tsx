export default function BalanceCard({amount , acctId }){
    console.log(acctId)
    return <div className="w-full h-30 bg-white rounded-sm mt-8 mb-4 flex flex-col gap-3 items-center justify-center">
        <p style={{color : 'black'}}>Account Balance</p>
        <h1   style={{color : 'black', fontWeight : 300 ,}}>$ {amount}</h1>
        {/* <p   style={{color : 'black'}}>Account ID: {acctId}</p> */}

    </div>
}