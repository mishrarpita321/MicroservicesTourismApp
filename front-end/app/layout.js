
"use client";
import { Inter } from 'next/font/google'
import './globals.css'
// import Navbar from '../app/components/Navbar'
import { AuthContextProvider } from "../app/context/AuthContext";


const inter = Inter({ subsets: ['latin'] })



export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {/* <Navbar /> */}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
