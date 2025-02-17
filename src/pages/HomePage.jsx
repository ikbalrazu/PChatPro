import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/Chat';
import Conversation from '../components/conversation/Conversation';
import UserProfile from '../components/profile/UserProfile';
import { useChatStore } from '../store/useChatStore';
import NotSelectedUser from '../components/conversation/NotSelectedUser';
import { useUtilityStore } from '../store/useUtilityStore';
import AddFriend from '../components/findfriend/AddFriend';

const HomePage = () => {
  const {checkAuth, authUser, onlineUsers} = useAuthStore();
  const {selectedUser} = useChatStore();
  const {currentPage, sidebarVisible} = useUtilityStore();

  return (
    <div className="flex h-screen bg-gray-100">

    <div className={`${sidebarVisible || 'hidden'} md:flex`}>
      <Sidebar/>
    </div>
    

    <div 
    className={`
      ${selectedUser ? "hidden md:flex" : "flex"}
      flex-col h-full md:w-80 w-full bg-white dark:bg-gray-800 border-r border-gray-300`}
    >
    {currentPage === 'conversation' && <Conversation />}
    {currentPage === 'profile' && <UserProfile />}
    {currentPage === 'addfriend' && <AddFriend />}
    {/* {currentPage === 'chat' && <Chat/>} */}
    </div>
    
    <div className="flex-1">
    {selectedUser ? <Chat /> : <NotSelectedUser />}
    </div>

    {/* {!selectedUser ? <NotSelectedUser/> : <Chat/>} */}
    
      
    </div>
  )
}

export default HomePage