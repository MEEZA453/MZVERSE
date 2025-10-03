'use client'
import { useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import MasterNavber from "./Components/MasterNavber";
import PosterOfTheDay from "./Components/PosterOfTheDay";
import PromotionOfTheDay from "./Components/PromotionOfTheDay";
import AllPosts from "./Components/AllPosts";
import { AnimatePresence } from "framer-motion";
import { useThemeContext } from "./Context/ThemeContext";
import Supply from "./Components/Supply";

export default function Feed() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLightMode } = useThemeContext();

  const tabs = [
    { name: "Explore", route: "/" },
    { name: "Posts", route: "/posts" },
    { name: "Supply", route: "/supply" },
  ];

  const currentIndex = tabs.findIndex(tab => pathname === tab.route);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  return (
    <div className={`h-full w-screen ${isLightMode ? "bg-white" : "bg-black"}`}>
      <MasterNavber />

      {/* Tabs */}
      <div className="sticky top-13 z-[300]">
        <div className="flex justify-center gap-1 mt-3">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => router.push(tab.route)}
              className={`rounded-full px-3 py-0.5 text-[14px] ${
                activeIndex === i
                  ? isLightMode ? "tab-onOfLight" : "tab-onOfDark"
                  : isLightMode ? "tab-offOfLight" : "tab-offOfDark"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Explore tab */}
      {activeIndex === 0 && (
        <div>
          <Suspense>
            <PosterOfTheDay />
          </Suspense>
          <Suspense>
            <PromotionOfTheDay />
          </Suspense>
          <Suspense>

          <AllPosts />
          </Suspense>
        </div>
      )}

      {/* Posts tab */}
      {activeIndex === 1 && (
        <div>
          <Suspense>

          <AllPosts />
          </Suspense>
        </div>
      )}
       {activeIndex === 2 && (
        <div>
          <Suspense>

          <Supply />
          </Suspense>
        </div>
      )}

    </div>
  );
}
