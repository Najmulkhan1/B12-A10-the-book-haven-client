import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';


const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const MyProfile = () => {

  // Assuming useAxios provides user object from an auth state (e.g., Firebase)
  const { user, updateUser } = useAuth()
  
  


  const initialData = {
    uid: user?.uid || 'N/A',
    name: user?.displayName || '',
    email: user?.email || 'N/A',
    imageUrl: user?.photoURL || 'https://i.pravatar.cc/150?img=60', // Default image
    createdAt: user?.metadata?.creationTime || 'N/A',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialData);
  const [formData, setFormData] = useState(initialData);

  // Sync profileData with the latest user object when it changes or when editing mode toggles
  useEffect(() => {
    if (user) {
      const currentAuthData = {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email,
        imageUrl: user.photoURL || 'https://i.pravatar.cc/150?img=60',
        createdAt: user.metadata?.creationTime,
      };
      setProfileData(currentAuthData);
      if (!isEditing) {
        setFormData(currentAuthData);
      }
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Assuming userProfileUpdate is an async function that updates auth profile
      await updateUser({
        displayName: formData.name,
        photoURL: formData.imageUrl,
      });
      toast.success('Profile updated successfully');

      // Update local state after successful API/Auth update
      setProfileData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Revert form data to the last saved profile data
    setFormData(profileData);
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Set form data to the current profile data before editing
    setFormData(profileData);
  };

  // Small helper component for displaying fields
  const LightDisplayField = ({ label, value }) => (
    // text-base-content will ensure visibility in both light/dark themes
    <div className="flex justify-between items-center text-sm py-2 border-b border-base-200 last:border-b-0">
      <span className="text-base-content opacity-70">{label}</span> 
      <span className="font-medium text-base-content">{value}</span>
    </div>
  );

  return (
    // bg-base-200 ensures the background respects the theme
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-8">


      {/* card bg-base-100 ensures the card background respects the theme */}
      <div className="w-full max-w-md card bg-base-100 shadow-xl border border-base-300">

        {/* Profile Header Section */}
        <div className="relative p-6 border-b border-base-200 flex flex-col items-center bg-primary/5">


          <div className="relative group mb-4">
            <img
              src={formData.imageUrl}
              alt="Profile Avatar"
              // DaisyUI classes: border-primary for accent, shadow-xl for elevation
              className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-xl shadow-primary/30 transition-all duration-300"
            />
          </div>

          <div className="w-full text-center">
            {isEditing ? (
              // DaisyUI focus classes for input, bg-base-100 for input background
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // text-base-content ensures name is visible in dark mode input
                className="w-full text-center text-2xl font-bold text-base-content bg-base-100 input input-bordered input-primary focus:outline-none transition-colors duration-200"
                placeholder="Your Name"
                required
              />
            ) : (

              // text-base-content ensures display name is visible
              <h2 className="text-2xl font-bold text-base-content">{profileData.name}</h2>
            )}
            {/* text-base-content with opacity for email */}
            <p className="text-sm text-base-content opacity-80 mt-1">{profileData.email}</p>
          </div>
        </div>

        {/* Image URL Input Field - Only shown when editing */}
        {isEditing && (
          <div className="px-6 py-4 bg-base-100 border-b border-base-200">
            {/* text-base-content for label */}
            <label htmlFor="imageUrl" className="block text-xs font-semibold text-base-content opacity-90 mb-1">
              Profile Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter a new image URL"
              // DaisyUI input class, bg-base-100 and text-base-content
              className="w-full text-sm p-3 bg-base-100 text-base-content border input input-bordered input-sm focus:input-primary transition"
            />
          </div>
        )}


        {/* Account Information Section */}
        <div className="p-6">
          {/* DaisyUI primary color for heading */}
          <h3 className="text-base font-semibold text-primary mb-3 pb-2 border-b border-base-200">
            Account Information
          </h3>
          <div className="space-y-1">
            <LightDisplayField label="User ID (UID)" value={profileData.uid} />
            <LightDisplayField label="Account Created" value={formatDate(profileData.createdAt)} />
          </div>
        </div>


        {/* Action Buttons Section */}
        <div className="bg-base-200 px-6 py-4 border-t border-base-300 flex justify-end space-x-3">
          {isEditing ? (
            <>
              {/* DaisyUI secondary button for Cancel */}
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>
              {/* DaisyUI primary button for Save */}
              <button
                type="submit"
                onClick={handleSave}
                className="btn btn-sm btn-primary"
              >
                Save Changes
              </button>
            </>
          ) : (
            // DaisyUI accent button for Edit
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-accent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;