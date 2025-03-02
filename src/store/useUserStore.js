import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set)=>({
    myFriends: [],
    searchQueryResults: [],
    isFriendsLoading: false,
    
    // setFriendsList: async(ids)=>{
    //     console.log(ids);
    // },

    getMyFriends: async() => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/user/my-friends",{ withCredentials: true });
            set({myFriends: response.data});
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({ isUsersLoading: false });
        }
    },

    friendRequest: async(receiverId)=>{
        try {
            const response = await axiosInstance.post("/user/friend-request",{receiverId});
        } catch (error) {
            toast.error(error.message);
        }
    },

    searchFriends: async(query)=>{
        try {
            const response = await axiosInstance.get(`/user/search-friends?query=${query}`);
            if (response.data.users) {
                set({searchQueryResults:response.data.users})
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    

}))
