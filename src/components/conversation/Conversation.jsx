import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import Avatar from '../Avatar';
import { useUtilityStore } from '../../store/useUtilityStore';

const Conversation = () => {
  const { onlineUsers } = useAuthStore();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { getMyFriends, myFriends, isFriendsLoading } = useUserStore();
  const { toggleSidebar } = useUtilityStore();

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter friends based on search term
  const filteredUsers = myFriends.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    toggleSidebar(false); // Hide sidebar on mobile
  };
  
  useEffect(() => {
    getMyFriends();
  }, [getMyFriends]);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-gray-800'>
      <div className="p-4 flex flex-col items-center justify-between">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Conversations</h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 h-1 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="h-[86%] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

        {isFriendsLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center p-4 space-x-3 animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div
            className="flex-1"
            key={filteredUsers._id}
          >
            {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => handleUserClick(user)}
                className="
            w-full p-4 flex items-center hover:bg-gray-200 cursor-pointer
            "

              >
                <div
                  className='relative w-10 h-10'
                >
                  <div className='border rounded-full'>
                  <Avatar
                    width={40}
                    height={40}
                    name={user?.fullName}
                    imageUrl={user?.profilePic}
                    userId={user?._id}
                  />
                  </div>
                  {onlineUsers.includes(user._id) && (
                    <span className='absolute bottom-0 right-0 size-2 bg-green-500 rounded-full ring-2 ring-zinc-200' />
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 dark:text-white">{user.fullName}</p>
                  <p className="text-sm text-gray-500">Start the conversation!</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No friends found.</p>
        )}
      </div>
      <div>
      </div>
    </div>
  )
}

export default Conversation