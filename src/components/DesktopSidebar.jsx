import React from 'react'
import DesktopItem from './DesktopItem'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { useUtilityStore } from '../store/useUtilityStore';
import { Sidebar } from 'lucide-react';
import Conversation from './conversation/Conversation';
import UserProfile from './profile/UserProfile';
import AddFriend from './findfriend/AddFriend';
import NotSelectedUser from './conversation/NotSelectedUser';
import Chat from './chat/Chat';

const DesktopSidebar = () => {
  const {checkAuth, authUser, onlineUsers} = useAuthStore();
  const {selectedUser} = useChatStore();
  const {currentPage} = useUtilityStore();
  return (
    // <div 
    // className="
    // hidden
    // lg:fixed
    // lg:inset-y-0
    // lg:left-0
    // lg:z-40
    // lg:w-20
    // xl:px-6
    // lg:overflow-y-auto
    // lg:bg-white
    // lg:border-r-[1px]
    // lg:pb-4
    // lg:flex
    // lg:flex-col
    // justify-between
    // "
    // >
    //     <ul 
    //     role='list'
    //     className='
    //     flex
    //     flex-col
    //     items-center
    //     space-y-1'
    //     >
    //         item1
    //     {/* {Routes.map((item)=>(
    //         <DesktopItem
    //          key={item.label}
    //          href={item.href}
    //          label={item.label}
    //          icon={item.icon}
    //          active={item.active}
    //          onClick = {item.onClick}
    //         />
    //     ))} */}
        
    //     </ul>

    // </div>
    <>
    <Sidebar/>

    <div className="
    hidden
    md:block 
    h-screen 
    w-80 
    bg-white
    dark:bg-gray-800  
    border-r 
    border-gray-300  
    flex-col
    ">
    {currentPage === 'conversation' && <Conversation />}
    {currentPage === 'profile' && <UserProfile />}
    {currentPage === 'addfriend' && <AddFriend />}
    </div>
    
    
    {!selectedUser ? <NotSelectedUser/> : <Chat/>}
    </>
  )
}

export default DesktopSidebar