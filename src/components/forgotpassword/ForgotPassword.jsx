import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useAuthStore } from '../../store/useAuthStore';
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessMail from "../../assets/successmail.png"

const ForgotPassword = () => {
  const {forgotPassword, emailSent} = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required.")
  });

  const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema, // Attach Yup schema
      onSubmit: async(formData, {setSubmitting}) => {
        await forgotPassword(formData.email, navigate);
        setSubmitting(false);
        
      },
  });

  return (
    <div className='flex flex-col min-h-screen p-6'>
        <div className='flex justify-between'>
            <Link to='/login'><IoIosArrowBack size={20} /></Link>
            <a>Need Help?</a>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mt-10'>
            {emailSent ? (
              <>
              <img src={SuccessMail} className="w-40 h-40 mb-4"/>
              <p className="text-md text-gray-700 mt-2 text-center max-w-md">
              We have sent an email with instructions to reset your password. Please check your inbox.
              </p>
              {/* <button onClick={()=>}>Resent Email</button> */}
              </>
            ) :
            <>
            <h2 className='text-2xl font-bold'>Forgot Password?</h2>
            <p className='text-md text-[#002D74]'>Please enter your email and we will sent an email with instructions to reset your password!</p> 
            <form onSubmit={formik.handleSubmit} className='w-80'>
            <div className='flex flex-col p-2'>
                <label className='text-[#777778] font-bold text-sm'>Email Address</label>
                <input 
                className='rounded-xl border p-2 mt-2' 
                type='email'
                id='email' 
                name='email'
                placeholder='Enter your email'
                {...formik.getFieldProps("email")}
                aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
                />
                {formik.touched.email && formik.errors.email ? (
                <p className='text-red-700 text-sm' aria-live='polite'>{formik.errors.email}</p>
                ) : null}
                <button
                type='submit' 
                className='mt-5 bg-[#002D74] rounded-xl text-white py-2'
                disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Processing..." : "Continue"}
                </button>
            </div>
            </form>
            </>
            }
        </div>
    </div>
  )
}

export default ForgotPassword