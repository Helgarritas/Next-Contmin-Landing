import type { Metadata } from "next";
import localFont from "next/font/local";
import BgGrid from "@/components/BgGrid";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import "./globals.css";

const miFuente = localFont({
  src: [
    {
      path: "./fonts/BlenderPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BlenderPro-Medium.woff2",
      weight: "500", 
      style: "normal",
    },
    {
      path: "./fonts/BlenderPro-Thin.woff2", 
      weight: "300", 
      style: "normal",
    },
  ],
  variable: "--blenderpro",
});

export const metadata: Metadata = {
  title: "Contmin",
  description: "Contrata minera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${miFuente.variable} relative`}>
        <BgGrid/>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
