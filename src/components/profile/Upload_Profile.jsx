import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import Avatar from '../Avatar';

const Upload_Profile = () => {
  const [preview, setPreview] = useState(null);
  const { authUser, updateProfilePic, isUpdatingProfile } = useAuthStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Limit to 2MB
      toast.error("File size exceeds 2MB. Please choose a smaller file.");
      e.target.value = "";
      return;
    }

    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setPreview(base64Image);
        await updateProfilePic({ profilePic: base64Image });
      };

      e.target.value = "";

    }

  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 group p-1 mt-2 rounded-full">
        <div className='w-full h-full object-cover rounded-full border border-gray-300 overflow-hidden'>
        <Avatar
          width={128}
          height={128}
          fontSize={30}
          name={authUser?.fullName}
          imageUrl={authUser?.profilePic}
          userId={authUser?._id}
        />
        </div>

        {/* Edit Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <label
            htmlFor="upload"
            className={`text-white text-sm font-medium cursor-pointer ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
          >
            {/* Edit */}
            {isUpdatingProfile ? "Updating" : "Edit"}
          </label>
        </div>

        <input
          id="upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

      </div>
      <h2 className="text-xl font-bold text-center my-1">{authUser?.fullName}</h2>
    </div>
  )
}

export default Upload_Profile