import React, { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  const {verifyJWTToken,tokenValidity, resetPassword } = useAuthStore();
  const { id, token } = useParams();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
      validationSchema, // Attach Yup schema
      onSubmit: async(values, {setSubmitting}) => {
        await resetPassword(id, token, values.password);
        setSubmitting(false);
        
      },
  });

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
            
            <form onSubmit={formik.handleSubmit} className='flex flex-col p-2 w-80'>
                <label className='text-[#777778] font-bold text-sm'>New Password</label>
                <input 
                  className='rounded-xl border p-2 mt-2' 
                  type='password'
                  name='password' 
                  placeholder='New Password'
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                <p className="text-red-700 text-sm">{formik.errors.password}</p>
                )}
                <label className='text-[#777778] font-bold text-sm'>Confirm New Password</label>
                <input 
                className='rounded-xl border p-2 mt-2' 
                type='password'
                name='confirmPassword' 
                placeholder='Confirm New Password'
                {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-700 text-sm">{formik.errors.confirmPassword}</p>
                )}
                <button
                type='submit' 
                className='mt-5 bg-[#002D74] rounded-xl text-white py-2'
                disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Processing..." : "Continue"}
                </button>
            </form>
           
            </>
          ): (
            <p className="text-red-500 text-lg font-semibold">Invalid token</p>
          )}
            
        </div>
    </div>
  )
}

export default ResetPassword