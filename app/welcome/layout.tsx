import MasterNavber from "../Components/MasterNavber";
import "../globals.css"
import { Geist, Geist_Mono, Inter } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
  <>
        {/* No navbar here */}
        <MasterNavber/>
        {children}
  </>
  
  );
}
