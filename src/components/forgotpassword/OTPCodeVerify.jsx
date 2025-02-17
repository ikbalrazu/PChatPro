import React, {useState, useRef} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const otpCodeVerify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-6'>
        <div className='flex justify-between'>
            <Link to='/login'><IoIosArrowBack size={20} /></Link>
            <a>Need Help?</a>
        </div>
        {/* <div className='flex flex-col justify-center items-center gap-4 mt-5'>
            <h2 className='text-2xl font-bold'>OTP code verification</h2>
            <p className='text-md text-[#002D74]'>We have an OTP code to your email and example@gmail.com Enter the OTP code below to verify</p>
            <div className='flex flex-col p-2 w-80'>
                <label className='text-[#777778] font-bold text-sm'>Email Address</label>
                <input className='rounded-xl border p-2 mt-2' type='email' placeholder='Enter your email'/>
                <button className='mt-5 bg-[#002D74] rounded-xl text-white py-2'>Continue</button>
            </div>
        </div> */}
        <div className='flex flex-col justify-center items-center gap-4 mt-5'>
        <h2 className='text-2xl font-bold'>OTP Code Verification</h2>
        <p className='text-md text-[#002D74] text-center'>
          We have sent an OTP code to your email example@gmail.com.
          Enter the OTP code below to verify.
        </p>
        
        <div className='flex gap-2'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type='text'
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className='w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          ))}
        </div>
        
        <button className='mt-5 bg-[#002D74] rounded-xl text-white py-2 px-6'>Verify</button>
      </div>
    </div>
  )
}

export default otpCodeVerify;