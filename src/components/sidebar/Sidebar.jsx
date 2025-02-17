import React, {useEffect, useState} from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Avatar from '../Avatar';
import { useAuthStore } from '../../store/useAuthStore';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import Conversation from '../conversation/Conversation';
import { useUserStore } from '../../store/useUserStore';
import { useUtilityStore } from '../../store/useUtilityStore';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const Navigate = useNavigate();
  const {authUser, logout} = useAuthStore();
  const [editUserOpen,setEditUserOpen] = useState(false)
  const [openSearchUser,setOpenSearchUser] = useState(false)
  const {setUserProfileShow} = useUserStore();
  const navigate = useUtilityStore((state) => state.navigate);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  
  return (
    <div 
    className="
    flex
    flex-col
    bg-white 
    dark:bg-gray-900 
    dark:text-white 
    border-r 
    border-gray-300
    md:w-20 
    md:flex
    lg:flex 
    md:flex-col
    lg:flex-col 
    items-center 
    py-4
    overflow-hidden
    h-screen
    ">
      <NavLink 
        className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200`}
        onClick={() => navigate('conversation')}
        title='Conversation'
        >
            <IoChatbubbleEllipses
            size={20}
            />
      </NavLink>

        <NavLink 
        title='Add Friend' 
        className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'
        onClick={()=>navigate("addfriend")}
        >
            <FaUserPlus size={20}/>
        </NavLink>
        
        <div className="mt-auto mb-4">
          <NavLink 
          className={({isActive})=>`w-10 h-10 border text-white rounded-full flex items-center justify-center`} 
          onClick={()=>navigate("profile")}
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

        <button
        onClick={()=>logout(Navigate)} 
        title='Logout' 
        className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
        <span className='-ml-2'>
            <BiLogOut size={20}/>
        </span>
        </button>
      <ThemeToggle/>
    </div>
  )
}

export default Sidebar