import { AiFillGithub} from 'react-icons/ai';
import React from 'react';

const Footer = () => {
  return (
    <footer className=" w-full p-4 sm:p-6 sm:px-4 bg-orange-600 dark:bg-gray-800">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-50 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="" className="hover:underline">Chain</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="https://github.com/rkmonarch/chain" className="text-gray-50 hover:text-gray-900 dark:hover:text-white">
              <AiFillGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer