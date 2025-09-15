'use client'
import { useRouter } from "next/navigation";
import MasterNavber from "./Components/MasterNavber";
import PhotographyOfTheDay from "./Components/PhotographyOfTheDay";
import PosterOfTheDay from "./Components/PosterOfTheDay"
import PromotionOfTheDay from './Components/PromotionOfTheDay';
import AllPosts from "./posts/page";
import { useEffect, useState } from "react";
import AllAssets from "./AllAssets/page";
import { useAuth } from "./Context/AuthContext";
import Notification from "./notification/page";
import { useNotification } from "./Context/Notification";
import { AnimatePresence ,motion} from "framer-motion";

export default function Feed() {
  const router = useRouter();
  const [postId, setPostId] = useState('');
  const { isNotification, setIsNotification } = useNotification();
  const { user, loading } = useAuth();

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
    <div className="hide-scrollbar h-full w-screen">
      <MasterNavber />

      <motion.div
        onClick={() => setIsNotification(false)}
        className={`fixed top-0 h-screen w-screen duration-500 bg-black/60 z-[900] ${isNotification ? 'opacity-100 pointer-events-auto' : 'opacity-0  pointer-events-none'}`}
      ></motion.div>

      <AnimatePresence>
        {isNotification && <Notification />}
      </AnimatePresence>

      <div className="sticky top-13 z-[300]">
        <div className="left-1/2 w-screen justify-center items-center flex px-2 mt-3 gap-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full ${activeIndex === index ? 'bg-white text-black' : 'bg-[#1d1d1d] text-white'} items-center justify-center px-3 text-[14px] py-0.5`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {activeIndex === 0 && (
        <div>
          {/* <PhotographyOfTheDay p={photo[2]} /> */}
          <PosterOfTheDay />
          <PromotionOfTheDay />
          <AllPosts />
        </div>
      )}

      {activeIndex === 1 && <AllPosts />}
      {activeIndex === 2 && <AllAssets />}

      <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-[#000000] to-[#00000000] z-[50] top-0"></div>
    </div>
  );
}
