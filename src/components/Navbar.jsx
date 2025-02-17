import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import SettingsPage from '../pages/SettingsPage';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
  return (
    // <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    // backdrop-blur-lg bg-base-100/80">
    // <div className="flex items-center justify-between h-full">
    //     <div className="flex items-center gap-8">
    //         <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
    //           <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
    //             {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
    //           </div>
    //           <h1 className="text-lg font-bold">Chatty</h1>
    //         </Link>
    //     </div>

    //     <div className="flex items-center gap-2">
    //     {/* <Link
    //         to={"/settings"}
    //           className={`
    //           btn btn-sm gap-2 transition-colors
              
    //           `}
    //         >
    //           <SettingsPage className="w-4 h-4" />
    //           <span className="hidden w-4 h-4 sm:inline mr-10">Settings</span>
    //     </Link> */}

    //     {authUser && (
    //         <>
    //         <Link to={"/profile"} className='mr-5'>
    //         {/* <User className="size-5" /> */}
    //         <span className="hidden sm:inline">Profile</span>
    //         </Link>

    //         <button className="flex gap-2 items-center mr-5" onClick={logout}>
    //             {/* <LogOut className="size-5" /> */}
    //             <span className="hidden sm:inline">Logout</span>
    //         </button>

    //         </>
    //     )}

    //     </div>

        

    // </div>
    // </header>

    <div className="h-screen bg-gray-100">
        <nav className="p-4 bg-white border-b border-gray-300 flex justify-between">
          <Link to="/" className="font-semibold text-lg text-purple-600">
            ChatApp
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/find-friends"
              className="text-gray-600 hover:text-purple-600"
            >
              Find Friends
            </Link>
            <Link
              to="/create-group"
              className="text-gray-600 hover:text-purple-600"
            >
              Create Group
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-purple-600"
            >
              Profile
            </Link>
          </div>
        </nav>
        </div>
  )
}

export default Navbar