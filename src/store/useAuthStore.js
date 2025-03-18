import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
const BASE_URL = "https://p-chat-pro.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    friendList: [],
    friendRequestList: [],
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingProfileInfo: false,
    isCheckingAuth: true,
    userProfileShow: false,

    tokenValidity: null,
    passUpdated: false,

    socket: null,
    onlineUsers: [],
    notifications: [],

    emailSent: false,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check",{ withCredentials: true });
            set({authUser: res?.data});
            set({friendList: res?.data?.friends});
            set({friendRequestList: res?.data?.friendRequests});
            // get().connectSocket();
            if(res.data){
                setTimeout(() => {
                    get().connectSocket();
                }, 100);
            }
        } catch (error) {
            set({ authUser: null });
            // toast.error(error.message);
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        }finally{
            set({ isSigningUp: false });
        }
    },

    login: async(data)=>{
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data, {withCredentials: true});
            set({ authUser: res.data });
            toast.success("Login Successful!");
            get().connectSocket()
        } catch (error) {
            // toast.dismiss();
            toast.error(error?.response?.data?.message)
        }finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async(navigate)=>{
        try {
            const {disconnectSocket} = get();
            const res = await axiosInstance.post("/auth/logout",{},{withCredentials:true});
            if(res.data.message === "Logged out successfully"){
                disconnectSocket();
                set({authUser: null});
                toast.success("Logged out successfully");
                
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    },

    forgotPassword: async(email,navigate)=>{
        try {
            const res = await axiosInstance.post("/auth/forgot-password",{email});
            if(res.data.message === "Password reset email sent successfully"){
                toast.success("Email Send Successfully!");
                set({emailSent: true});
            }
        } catch (error) {
            set({emailSent: false});
            const errorMessage = error?.response?.data?.error || "Something went wrong!";
            toast.error(errorMessage);
        }
    },

    verifyJWTToken: async(token)=>{
        try {
            
            const res = await axiosInstance.post("/auth/verify-jwt-token",{token});
        
            if(res.data.message === "Valid Link"){
                set({ tokenValidity: true });
            }else{
                set({ tokenValidity: false });
            }
        } catch (error) {
            set({ tokenValidity: false });
        }
    },

    resetPassword: async(id,password)=>{
        try {
            const res = await axiosInstance.put("/auth/reset-password",{id,password});
            
            if(res.data.message === "Password Updated"){
                toast.success("Successfully Password Updated!");
                set({passUpdated:true})
            }
            
        } catch (error) {
            set({passUpdated:false})
            const errorMessage = error?.response?.data?.message || "Something went wrong.";
            toast.error(errorMessage);
        }
    },

    updateProfilePic: async(imagedata)=>{
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", imagedata);
            set({ authUser: res.data });
            toast.success("Profile Picture Updated!");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfile: false });
        }
    },

    updateProfileInfo: async(data)=>{
        try {
            set({ isUpdatingProfileInfo: true});
            const res = await axiosInstance.put("/auth/update-profileinfo", data );
            set({ authUser: res.data });
            toast.success("Updated profile info!");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfileInfo: false});
        }
    },

    deleteAccount: async()=>{
        try {
            const res = await axiosInstance.get("/auth/delete-account");
            if(res.data.message === "Account deleted successfully"){
                toast.success("Account deleted successfully!");
                set({authUser:null});
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    connectSocket: () => {
        const {authUser,socket} = get();
        if(!authUser || (socket && socket.connected)) return;
        const socketInstance  = io(
            // "http://localhost:5000",
            BASE_URL,
            // { withCredentials: true },
            {   
                transports: ["websocket","polling"],
                withCredentials: true,
                query: {userId: authUser._id}
            }
        );
        socketInstance.connect();
        // socketInstance.on("connect", () => {
        //     console.log("Socket connected:", socketInstance.id);
        // });
        
        set({ socket: socketInstance });

        socketInstance.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers: userIds});
        });

        // Listen for notifications
        socketInstance.on("notification", (notification) => {
            set((prev) => [...prev, notification]);
        });
    },

    disconnectSocket: () => {
        const {socket} = get();
        if(socket.connected) socket.disconnect();
    }

}))