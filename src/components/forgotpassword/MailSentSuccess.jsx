import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const MailSentSuccess = () => {
  return (
    <div className='flex flex-col min-h-screen p-6'>
        <div className='flex justify-between'>
            <Link to='/login'><IoIosArrowBack size={20} /></Link>
            <a>Need Help?</a>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mt-5'>
        <p className="text-md text-gray-700 mt-2 text-center max-w-md">
        We have sent an email with instructions to reset your password. Please check your inbox.
        </p>
        </div>
    </div>
  )
}

export default MailSentSuccess