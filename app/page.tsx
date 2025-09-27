'use client'
import { useRouter } from "next/navigation";
import MasterNavber from "./Components/MasterNavber";
import PhotographyOfTheDay from "./Components/PhotographyOfTheDay";
import PosterOfTheDay from "./Components/PosterOfTheDay"
import PromotionOfTheDay from './Components/PromotionOfTheDay';
// import AllPosts from "./Components/AllPosts";
import { Suspense, useEffect, useState } from "react";
import AllAssets from "./Components/AllAssets";
import { useAuth } from "./Context/AuthContext";
import Notification from "./notification/page";
import { useNotification } from "./Context/Notification";
import { AnimatePresence ,motion} from "framer-motion";
import Cart from "./Components/Cart";
import ConnectRazorpayButton from "./Components/ConnectWithRazorpay";
import { useTheme } from "next-themes";
import { useThemeContext } from "./Context/ThemeContext";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { getHighlight } from "./store/actions/Highlight";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import AllPosts from "./Components/AllPosts";

export default function Feed() {
  const router = useRouter();
  const [postId, setPostId] = useState('');
  const { isNotification, setIsNotification , setNotification} = useNotification();
  const [isCart , setIsCart] = useState(false )
  const { user, loading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
  const {isLightMode} = useThemeContext() 

  const { highlight } = useSelector((state: any) => state.highlight);

 
  useEffect(() => {
    if (loading) return; // wait until user is loaded
    if (!user) {
      router.replace("/welcome"); // not logged in
    } else if (!user.handle) {
      router.replace("/handle"); // logged in but no handle
    }
  }, [user, loading, router]);

  // --- Tab persistence with localStorage ---


// --- Tab persistence with localStorage ---
const [activeIndex, setActiveIndex] = useState(() => {
  if (typeof window !== "undefined") {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab !== null ? Number(savedTab) : 0;
  }
  return 0; // SSR fallback
});

useEffect(() => {
  localStorage.setItem("activeTab", String(activeIndex));
}, [activeIndex]);
// ----------------------------------------
  useEffect(() => {
    // Clear saved tab when user reloads/opens site
    localStorage.removeItem("activeTab");
  }, []);
  // ----------------------------------------

  const tabs = [
    { name: 'Explore' },
    { name: 'Posts' },
    { name: 'Store' }
  ];

  const photo = [
    { name: 'Surrealism collection', profile: '/image.png', handle: 'suchguy', images: ['/sur1.jpg'] },
    { name: 'Surrealism collection', profile: '/image.png', handle: 'suchguy', images: ['/sur2.jpg'] },
    { name: 'Surrealism collection', profile: '/image.png', handle: 'suchguy', images: ['/sur3.jpg'] },
    { name: 'Surrealism collection', profile: '/image.png', handle: 'suchguy', images: ['/sur4.jpg'] },
  ];

  return (
    <div className={`hide-scrollbar ${isLightMode ? 'bg-white':'bg-black'} h-full w-screen`}>
      <MasterNavber setIsCart={setIsCart} />

      <motion.div
        onClick={() => {setIsNotification(false) , setIsCart(false)}}
        className={`fixed top-0 h-screen w-screen duration-500 bg-black/60 z-[900] ${isNotification || isCart ? 'opacity-100 pointer-events-auto' : 'opacity-0  pointer-events-none'}`}
      ></motion.div>

      <AnimatePresence>
        {isNotification && <Notification />}
      </AnimatePresence>
 <AnimatePresence>
        {isCart && <Cart   setIsCart = {setIsCart} />}
      </AnimatePresence>

      <div className="sticky top-13  z-[300]">
        <div className="left-1/2 w-screen justify-center items-center flex px-2 mt-3 gap-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {setActiveIndex(index) }}
              className={`rounded-full  ${activeIndex === index ?  isLightMode ? 'tab-onOfLight':'tab-onOfDark':isLightMode ? 'tab-offOfLight':'tab-offOfDark'} items-center justify-center px-3 text-[14px] py-0.5`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {activeIndex === 0 && (
        <div>
          {/* <PhotographyOfTheDay p={photo[2]} /> */}
    <Suspense>

          <PosterOfTheDay />
    </Suspense>
   
          <Suspense fallback={<p>Loading...</p>}>
      <PromotionOfTheDay />
    </Suspense>
          <ConnectRazorpayButton/>
<Suspense fallback={<p>Loading...</p>}>
          <AllPosts />
</Suspense>

        </div>
      )}

      {activeIndex === 1 &&
          <AllPosts />
}
      {activeIndex === 2 && <AllAssets />}

      <div className={`fixed pointer-events-none w-screen h-80 bg-gradient-to-b   z-[50] top-0 ${isLightMode ? 'from-[#ffffff50] to-[#ffffff00]':'from-[#000000] to-[#00000000]'} `}></div>
    </div>
  );
}
