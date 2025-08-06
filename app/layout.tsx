import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
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

          <ShowInputProvider>
          <NotificationProvider>

          <AuthProvider>
            

          {children}
          </AuthProvider>
          </NotificationProvider>
          </ShowInputProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
