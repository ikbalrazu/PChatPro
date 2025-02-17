import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import Avatar from '../Avatar';
import { useUtilityStore } from '../../store/useUtilityStore';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const {toggleSidebar} = useUtilityStore();

    const navigate = useUtilityStore((state) => state.navigate);

    const handleBackClick = () => {
        setSelectedUser(null); // Clear the selected user to show the Conversation component
        toggleSidebar(true);
        navigate('conversation'); // Navigate to the Conversation view
    };

    return (
        <div className="p-2 bg-white border-b border-gray-300 flex items-center justify-between">
            <div className="flex items-center">

                <button
                    onClick={handleBackClick}
                    className="md:hidden lg:hidden xl:hidden 2xl:hidden p-2 mr-1 hover:bg-slate-100"
                >
                    <IoIosArrowBack size={20} />
                </button>

                <div className="w-10 h-10 text-white rounded-full flex items-center justify-center border">
                    <Avatar
                    width={40}
                    height={40}
                    name={selectedUser?.fullName}
                    imageUrl={selectedUser?.profilePic}
                    userId={selectedUser?._id}
                    />
                </div>
                <div className="ml-3 flex flex-col">
                    <h3 className="font-medium text-gray-800">{selectedUser.fullName}</h3>
                    <p className='text-xs text-base-content/70'>
                    {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
                
            </div>

            <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                    📞
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                    🎥
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                    ⚙️
                </button>
            </div>
        </div>
    )
}

export default ChatHeader