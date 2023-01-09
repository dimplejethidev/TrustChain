import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  const { pathname } = useRouter()

  return (
    <>
      <nav className="fixed z-10 w-full mx-auto bg-orange-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-[#D27D2D] hover:text-[#F28C28]">Chain</span>
          </Link>
          <div className="flex md:order-2">
            <button type="button" className="text-white bg-[#D27D2D] hover:bg-[#F28C28] focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ml-5">Connect</button>
            <button data-collapse-toggle="mobile-menu-4" type="button" className="inline-flex items-center py-2 px-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <span className="sr-only">Open main menu</span>
              <AiOutlineMenu size="20" />
            </button>
          </div>
          <div className={`${isOpenMenu ? 'block' : 'hidden' } justify-between items-center w-full md:flex md:w-auto md:order-1`}>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
            </li>
            <li>
              <Link href="/" className={`${pathname === '/' ? 'text-[#D27D2D]' : 'text-gray-700'} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#D27D2D] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/register" className={`${pathname === '/register' ? 'text-[#D27D2D]' : 'text-gray-700'} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#D27D2D] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Register</Link>
            </li>
            <li>
              <Link href="/addproduct" className={`${pathname === '/addproduct' ? 'text-[#D27D2D]' : 'text-gray-700'} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#D27D2D] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Add Product</Link>
            </li>
            <li>
              <Link href="/updateproduct" className={`${pathname === '/updateproduct' ? 'text-[#D27D2D]' : 'text-gray-700'} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#D27D2D] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Update Status</Link>
            </li>
            <li>
              <Link href="/producthistory"  className={`${pathname === '/producthistory' ? 'text-[#D27D2D]' : 'text-gray-700'} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#D27D2D] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Product History</Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-orange-200 w-8 h-8 fixed bottom-[15px] right-[50px] flex justify-center items-center rounded-full">
      {
        theme === 'light' ? 
          <BiSun size="25" onClick={switchTheme} className="text-gray-500 hover:cursor-pointer" /> :
          <BiMoon size="20" onClick={switchTheme} className="text-gray-500 hover:cursor-pointer" />
      }
      </div>
    </>
  )
}

export default Header
