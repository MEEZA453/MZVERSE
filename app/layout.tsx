import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReduxProvider } from "./store/Provider"; // ✅ still allowed to import .js
import { AuthProvider } from "./Context/AuthContext";
import { ShowInputProvider } from "./Context/ShowInputContext";
 import { NotificationProvider } from "./Context/Notification";
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

export const metadata = {
  title: "mzverse",
  description: "Frame your poster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        <ReduxProvider>

<GoogleOAuthProvider clientId="286568333858-u0lo291u1qchomf2dpgsdsnr7gpje11m.apps.googleusercontent.com">
          <ShowInputProvider>
          <NotificationProvider>

          <AuthProvider>
            

          {children}
          </AuthProvider>
          </NotificationProvider>
          </ShowInputProvider>
</GoogleOAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
