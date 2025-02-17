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
            const response = await axiosInstance.get("/user/my-friends");
            set({myFriends: response.data});
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({ isUsersLoading: false });
        }
    },

    friendRequest: async(receiverId)=>{
        try {
            console.log(receiverId);
            const response = await axiosInstance.post("/user/friend-request",{receiverId});
            console.log(response);
        } catch (error) {
            toast.error(error.message);
        }
    },

    searchFriends: async(query)=>{
        try {
            console.log(query);
            const response = await axiosInstance.get(`/user/search-friends?query=${query}`);
            console.log(response);
            if (response.data.users) {
                set({searchQueryResults:response.data.users})
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    

}))
