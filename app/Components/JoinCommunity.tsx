import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { register } from "../store/actions/auth";
import {motion} from 'framer-motion'
import { useShowInput } from "../Context/ShowInputContext";
import ButtonLoader from "./ButtonLoader";
import { useNotification } from "../Context/Notification";
import { useThemeContext } from "../Context/ThemeContext";
interface MasterNavberProps {
  setShowSignupInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JoinCommunityInput({ setShowSignupInput, }: MasterNavberProps) {
  const [errorMessage , setErrorMessage] = useState("")
  const {setShowLoginInput} = useShowInput()
  const {isLightMode} = useThemeContext()
  const [loading , setLoading] =  useState(false)
  const {setNotification} = useNotification()
  const [user, setUser] = useState({
    name: "",
    id: "",
    handle: "",
    password: "",
  });
const dispatch = useDispatch()
  const [error, setError] = useState({
    name: false,
    id: false,
    password: false,
  });
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate each field
    const newError = {
      name: user.name.trim() === "",
      id: user.id.trim() === "",
      password: user.password.trim().length < 6,
    };

    setError(newError);

    // If there's any error, stop submission
    if (Object.values(newError).some((e) => e)) return;

    try {
      setLoading  (true)
     const response =  await dispatch(
        register({
          name: user.name,
          id: user.id,
          password: user.password,
        }) as any 
      );
console.log(response)
setLoading(false)
setShowSignupInput(false)
setNotification('accountCreated')
// setShowLoginInput(true)
    } catch (err) {
      setErrorMessage(err)
      setTimeout(()=>{
setErrorMessage('')
      },2000)
      setLoading(false)
      console.error("Registration error:", err);
    }
  };


  return (
    <motion.div initial ={{y : 50 , opacity : 0}} animate = {{y : 0 , opacity : 1}} transition={{duration : 0.2 , ease   : 'easeInOut'}} exit={{y : -50  , opacity : 0}} className="lg:w-100 w-80 flex-col flex justify-between px-2 py-1 pb-2 rounded h-54 bg-[#252525]">
      <div className="flex justify-between items-center w-full">
        <h6 className="ml-18">Be a part of the community.</h6>
        <RxCross2 onClick={() => setShowSignupInput(false)} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="w-20">Name:</p>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Meezan"
            onChange={handleChange}
            className={`flex-1 bg-[#131313] ${error.name ? 'border border-red-600/50' : ''} px-2 py-0.5 outline-none`}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="w-20">Id:</p>
          <input
            type="text"
            name="id"
            value={user.id}
            placeholder="meeza_34"
            onChange={handleChange}
            className={`flex-1 bg-[#131313] ${error.id ? 'border border-red-600/50' : ''} px-2 py-0.5 outline-none`}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="w-20">Handle:</p>
          <input
            type="text"
            name="handle"
            value={user.handle}
            placeholder="@mzco.creative"
            onChange={handleChange}
            className={`flex-1  bg-[#131313] px-2 py-0.5 outline-none`}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="w-20">Password:</p>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Wv123@deR2"
            onChange={handleChange}
            className={`flex-1 bg-[#131313] ${error.password ? 'border border-red-600/50' : ''} px-2 py-0.5 outline-none`}
          />
        </div>

        <div className="flex justify-between pl-22">
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button type="submit" className="px-2 w-18 flex items-center justify-center  h-5.5 text-center bg-white text-black text-[14px] rounded-[2px]">
            {loading ? <ButtonLoader color={isLightMode ? "rgba(255, 255, 255, 0.6)":'rgba(0, 0, 0, 0.6)'} /> : 'Register' }
          </button>
        </div>
      </form>
    </motion.div>
  );
}
