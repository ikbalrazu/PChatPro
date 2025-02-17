import React, { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthStore } from '../store/useAuthStore';
import Modal from './Modal';
import { useUserStore } from '../store/useUserStore';
import ThemeToggle from './ThemeToggle';

const Side = () => {
    const {authUser} = useAuthStore();
    const {userProfileShow, setUserProfileShow} = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(userProfileShow);

  return (
    <aside 
    className="w-16 md:w-20 bg-white dark:bg-gray-900 dark:text-white border-r border-gray-300 flex flex-col items-center py-4">
        <NavLink 
        className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200`}
        onClick={() => setUserProfileShow(false)}
        title='Conversation'
        >
            <IoChatbubbleEllipses
            size={20}
            />
        </NavLink>

        <div title='Add Friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
            <FaUserPlus size={20}/>
            {/* <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Popup"
            >
            <p>This is a sample popup/modal using Tailwind CSS and React!</p>
            </Modal> */}
        </div>

        <div className="mt-auto mb-4">
          {/* <button className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
            <Avatar/>
          </button> */}
          <NavLink 
          className={({isActive})=>`w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center ${isActive && "bg-slate-200"}`} 
          // title={authUser?.name} 
          onClick={()=>setUserProfileShow(true)}
          >
                <Avatar
                    width={40}
                    height={40}
                    name={authUser?.fullName}
                    imageUrl={authUser?.profilePic}
                    userId={authUser?._id}
                />
            </NavLink>
        </div>

        <button title='Logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
        <span className='-ml-2'>
            <BiLogOut size={20}/>
        </span>
        </button>

        <ThemeToggle/>

    </aside>
  )
}

export default Side