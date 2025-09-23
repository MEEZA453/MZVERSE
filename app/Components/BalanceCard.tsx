export default function BalanceCard({amount , acctId , isLightMode }){
    return <div className={`w-full h-30 ${isLightMode ? 'bg-[#1d1d1d]':'bg-white'} rounded-lg mt-8 mb-4 flex flex-col gap-3 items-center justify-center`}>
        <p >Account Balance</p>
        <h1   style={{color : isLightMode ? 'white':'black', fontWeight : 200 ,}}>${amount}</h1>
        {/* <p   style={{color : 'black'}}>Account ID: {acctId}</p> */}

    </div>
}