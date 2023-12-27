import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { setChatOpen, useMaterialUIController } from '@/context';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@mui/material';

export default function DashboardLayout({children}) {
  const [controller, dispatch] = useMaterialUIController();
  const { scrollY, bookMarks, chatOpen } = controller;
  const pathname = usePathname();
  return (
    <>
    <div 
        className="h-[70px] px-8 flex items-center bg-white z-[999] sticky top-0 font-bold justify-end">
          <Link href="/" className={`flex ${(scrollY <= 350 && pathname === "/") ? "opacity-0" : "opacity-100" } transition-all justify-end items-center`}>
            <img src={`${pathname === "/" ? "./logo.jpg" : "../logo.jpg"}`} alt='main-logo' className='h-[60px] mx-4' />
          </Link>
          <SearchBar isForHeader={true} />

        <div className='flex justify-end items-center'>
          <AutoAwesomeIcon onClick={() => setChatOpen(dispatch, !chatOpen)} fontSize='large' className='mx-4 cursor-pointer hover:bg-gray-300 rounded-full p-1 text-gray-500' />
          <Tooltip title={`${bookMarks.length} interested products`}>
            <FavoriteBorderIcon fontSize='large' className='cursor-pointer hover:bg-gray-300 rounded-full p-1 text-gray-500' />
          </Tooltip>
          <ShoppingCartIcon fontSize='large' className='cursor-pointer mx-4 hover:bg-gray-300 rounded-full p-1 text-gray-500' />
          <div className='px-4 cursor-pointer py-2 hover:bg-gray-300 text-black opacity-80 bg-[#F2F4F5] rounded-[10px]'>Sign in</div>
        </div>
    </div>
    <div className="bg-[#F4F5F8] overflow-hidden" style={{ height: "calc(100vh-70px)" }}>
      {children}
    </div>
    </>
  )
}