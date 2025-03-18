import React, {useState} from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import DeleteAccountModal from './DeleteAccountModal ';

const DeleteAccount = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    

  return (
    <>
    <div className="flex justify-start mb-10 ml-5">
        <button className="text-sm text-red-800 corsor-pointer hover:text-red-900"
        onClick={()=>setIsModalOpen(true)}
        >
            Delete Account
        </button>
        
    </div>
    <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    />
    </>
  )
}

export default DeleteAccount