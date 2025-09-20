import {motion}  from 'framer-motion';
export default  function Alart ({setAlart , func , nameOfFunc}){
    return <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="bg-black/50 fixed flex items-center justify-center z-[999]  h-screen w-screen">
        <motion.div  initial = {{y : 50, opacity : 0 }} transition = {{duration : 0.2 , ease : "easeInOut"} } exit={{y : 50, opacity : 0}} animate = {{y : 0 , opacity :1}} className="w-64   pt-2 h-40 rounded-sm bg-[#151515] flex flex-col items-center justify-between gap-3" >
        <div  className="flex flex-col items-center justify-center gap-2">
            <h5>You are not connected yet</h5>
            <p className="text-center">Connect you razorpay account to withdraw your balance securely.</p>
        </div>
        <div className="w-full flex items-center bg-[#0d0d0d]  h-9 px-3  justify-between">
            <button onClick={()=>setAlart(false)}  style={{fontWeight : 200}}  className="text-[15px] opacity-60">Cancel</button>
            <button style={{fontWeight : 200}} onClick={func} className="text-[15px]">{nameOfFunc}</button>

        </div>
    </motion.div>
        </motion.div>
}