import React, { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ResetPassword from './components/forgotpassword/ResetPassword';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth(); 
  },[checkAuth]);

  if (isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
    

  return (
    <div>

      <Routes>
      <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
      <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to="/" />}/>
      <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />}/>
      <Route path='/forgot-password' element={!authUser ? <ForgotPassword/> : <Navigate to="/" />}/>
      <Route path='/forgot-password/reset-password/:id/:token' element={!authUser ? <ResetPassword/> : <Navigate to="/" />}/>
      </Routes>

      <Toaster
      position="top-center"
      reverseOrder={false} 
      />
      
    </div>
  )
}

export default App;