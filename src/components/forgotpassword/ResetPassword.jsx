import React, { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ResetPassword = () => {
  const {verifyJWTToken,tokenValidity} = useAuthStore();
  const { id, token } = useParams();
  console.log(id,token);

  useEffect(()=>{
    verifyJWTToken(token);
  },[]);

  return (
    <div className='flex flex-col min-h-screen p-6'>
        <div className='flex justify-between'>
            <Link to='/login'><IoIosArrowBack size={20} /></Link>
            <a>Need Help?</a>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mt-5'>
          {tokenValidity === null ? (
            <p className="text-md text-[#002D74]">Verifying token...</p>
          ): tokenValidity ? (
            <>
            <h2 className='text-2xl font-bold'>Create new password</h2>
            <p className='text-md text-[#002D74]'>Create your new password. If you forget it, then you have to do forgot password</p>
            <div className='flex flex-col p-2 w-80'>
                <label className='text-[#777778] font-bold text-sm'>New Password</label>
                <input className='rounded-xl border p-2 mt-2' type='password' placeholder='New Password'/>
                <label className='text-[#777778] font-bold text-sm'>Confirm New Password</label>
                <input className='rounded-xl border p-2 mt-2' type='password' placeholder='Confirm New Password'/>
                <button className='mt-5 bg-[#002D74] rounded-xl text-white py-2'>Continue</button>
            </div>
            </>
          ): (
            <p className="text-red-500 text-lg font-semibold">Invalid token</p>
          )}
            
        </div>
    </div>
  )
}

export default ResetPassword