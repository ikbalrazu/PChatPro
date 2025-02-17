import React, { useState } from "react";
import Upload_Profile from "./Upload_Profile";
import { useAuthStore } from "../../store/useAuthStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
  const {authUser, updateProfileInfo, isUpdatingProfileInfo} = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: authUser.fullName || "",
      bio: authUser.bio || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Full name must be at least 3 characters")
        .max(32, "Full name cannot exceed 32 characters"),
      bio: Yup.string()
        .max(100, "Bio cannot exceed 100 characters"),
    }),
    onSubmit: async (values) => {
      console.log("Updated Profile:", values);
      await updateProfileInfo(values); // Call the API
      setIsEditing(false); // Disable editing after save
    },
  });

  const handleEditClick = async () => {
    if (isEditing) {
      // Auto-save when switching from edit mode
      await formik.handleSubmit();
    } else {
      setIsEditing(true); // Enable editing
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-800  border-r border-gray-300">
        {/* Profile Picture */}
        <Upload_Profile/>
        <p className="text-center text-sm mb-3">{authUser.email}</p>

        {/* User Details */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 text-sm px-6">
        <div 
        
        >
          <div>
            <label className="block text-gray-700">FullName</label>
            {isEditing ? (
              <>
              <input
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-2 w-full"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
              )}
              </>
            ) : (
              <p className="p-2 bg-gray-100 rounded">{formik.values.fullName}</p>
            )}
          </div>

          <div className="h-sm">
            <label className="block text-gray-700">Bio</label>
            {isEditing ? (
              <>
              <textarea
                type="text"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-2 w-full"
              />
              {formik.touched.bio && formik.errors.bio && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
              )}
              </>
            ) : (
              <p className="p-2 bg-gray-100 rounded">{formik.values.bio}</p>
            )}
          </div>

<div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleEditClick}
            disabled={isUpdatingProfileInfo}
            className={`${
              isEditing ? "bg-green-500" : "bg-blue-500"
            } text-white px-3 py-1 rounded hover:bg-opacity-90 ${
              isUpdatingProfileInfo ? "cursor-not-allowed" : ""
            }`}
          >
            {isEditing ? (isUpdatingProfileInfo ? "Saving..." : "Save") : "Edit Profile"}
          </button>
        </div>

        </div>
        </form>
        
    </div>
  );
};

export default UserProfile;
