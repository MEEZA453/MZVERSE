import { RxCross2 } from "react-icons/rx";
interface MasterNavberProps {
  setShowSignupInput: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function JoinCommunityInput ({setShowSignupInput}:MasterNavberProps){
    return <div className="lg:w-100  w-80 flex-col flex justify-between  px-2 py-1 pb-2 rounded h-60 bg-[#252525]">
<div className="flex justify-between items-center w-full">
    <h6 className="ml-18">Be a part of the community.</h6>
<RxCross2 onClick={()=> setShowSignupInput(false)}/>
</div>
<form className="space-y-2">
  <div className="flex items-center gap-2">
    <p className="w-20">Email:</p>
    <input
      type="text"
      placeholder="youremail@gmail.com"
      className="flex-1 bg-[#131313] px-2 py-0.5 outline-none"
    />
  </div>

  <div className="flex items-center gap-2">
    <p className="w-20">Handle:</p>
    <input
      type="text"
      placeholder="@mzco.creative"
      className="flex-1  bg-[#131313] px-2 py-0.5 outline-none"
    />
  </div>

  <div className="flex items-center gap-2">
    <p className="w-20">Password:</p>
    <input
      type="password"
      placeholder="Wv123@deR2"
      className="flex-1 bg-[#131313] px-2 py-0.5  outline-none"
    />
  </div>

  <div className="text-right">
    <button type="submit" className="px-2 bg-white text-black text-[15px] rounded-[2px]">
      Register
    </button>
  </div>
</form>

</div>
}