import React from 'react'
import { useAuthStore } from '../../store/useAuthStore';

const DeleteAccountModal  = ({ isOpen, onClose }) => {
    const {deleteAccount} = useAuthStore();
    if (!isOpen) return null;
    const handleDeleteAccount = async()=>{

        await deleteAccount();

    }
  return (
    <div className="fixed inset-0 flex items-center justify-center p-1 bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-red-600">Delete Account</h2>
        <p className="text-gray-700 mt-2">
          Are you sure you want to delete your account? This action is permanent and cannot be undone.
        </p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal 