import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReduxProvider } from "./store/Provider"; // ✅ still allowed to import .js
import { AuthProvider } from "./Context/AuthContext";
import { ShowInputProvider } from "./Context/ShowInputContext";
import { NotificationProvider } from "./Context/Notification";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalProvider from "./Context/PaypalContext";
import Notification from "./Components/Notification";
import { ThemeProvider } from "next-themes";
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
  title: "Grido",
  description: "A platform for digital creatives.",
  icons: {
    icon: "/favicon.ico",      // standard favicon
    shortcut: "/favicon.ico",  // browser shortcut
    apple: "/favicon.ico",     // iOS home screen
  },
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
                <ThemeProvider attribute="class">
        <ReduxProvider>
<PayPalProvider>


<GoogleOAuthProvider clientId="286568333858-u0lo291u1qchomf2dpgsdsnr7gpje11m.apps.googleusercontent.com">
          <ShowInputProvider>
          <NotificationProvider>

          <AuthProvider>
            
<Notification/>
          {children}
          </AuthProvider>
          </NotificationProvider>
          </ShowInputProvider>
</GoogleOAuthProvider>
       </PayPalProvider>
        </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
