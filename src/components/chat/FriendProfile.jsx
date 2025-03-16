import React from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const FriendProfile = ({ isOpen, closeModal, friend }) => {

    if (!friend) return null; 
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>

              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img
                  src={friend.profilePic || "/default-avatar.png"}
                  alt={friend.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
                <h2 className="text-xl font-semibold mt-2">{friend.fullName}</h2>
                {/* <p className="text-gray-500">@{friend.username}</p> */}
                <p className="text-gray-500">{friend.email}</p>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2">
                <p><strong>Joined:</strong> {new Date(friend.createdAt).toDateString()}</p>
                <p><strong>Status:</strong> {friend.status || "Hey there! I am using P-Chat-Pro"}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
                {/* <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Message
                </button> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FriendProfile