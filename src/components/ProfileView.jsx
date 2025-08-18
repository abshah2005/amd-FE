import React, { useState, useEffect, memo, useRef } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";
import useUpdateProfile from "../hooks/userhooks"; // Import the hook

// Move view components outside the main component
const DefaultView = memo(({ 
  formData, 
  handleInputChange, 
  editing, 
  setEditing, 
  user, 
  avatarInitial,
  handleSaveChanges,
  handleCancelEdit,
  handleFileChange,
  fileInputRef,
  isUpdating,
  selectedFile // <-- add this prop
}) => (
  <div className="w-full">
    <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
      {/* header title + edit icon */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">Personal Information</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Tell us a bit about yourself. This information helps askers better
            understand who you are and builds confidence in your expertise.
          </p>
        </div>

        <div className="text-right">
          {editing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleCancelEdit}
                aria-label="Cancel edit"
                className="inline-flex items-center justify-center px-3 py-1 rounded text-sm border border-gray-200"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                aria-label="Save changes"
                className="inline-flex items-center justify-center px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit profile"
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
            >
              <Edit />
            </button>
          )}
          <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
        </div>
      </div>

      {/* main content: picture centered and name fields */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* left column: label (keeps spacing like design) */}
        <div className="md:col-span-1">
          <div className="text-sm text-gray-700 font-medium mb-6">
            Profile Picture
          </div>
        </div>

        {/* middle: avatar */}
        <div className="flex flex-col items-center justify-center md:justify-center">
          {editing && selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
              {avatarInitial}
            </div>
          )}
          
          {editing && (
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 text-sm text-gray-700"
              onClick={() => fileInputRef.current.click()}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12M8 7l4-4 4 4M21 21H3" />
              </svg>
              Upload
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>

      <div>
        {/* right: inputs */}
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-700 font-medium mb-3">
            Full Name
          </label>

          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">First Name</div>
              <input
                name="firstName"
                className={`w-full text-sm rounded border p-2 ${
                  editing ? "bg-white" : "bg-gray-100 text-gray-600"
                } border-gray-200`}
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </div>

            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Last Name</div>
              <input
                name="lastName"
                className={`w-full text-sm rounded border p-2 ${
                  editing ? "bg-white" : "bg-gray-100 text-gray-600"
                } border-gray-200`}
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const ProfessionalView = memo(({ formData, handleInputChange, editing, setEditing, avatarInitial }) => (
  <div className="w-full">
    {/* Professional view remains unchanged for now */}
    <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
      {/* Existing professional view code */}
    </div>
  </div>
));

const ProfileView = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Setup the update profile mutation
  const updateProfile = useUpdateProfile({
    onSuccess: () => {
      setEditing(false);
      // You might want to refresh user data here
    }
  });

  // Initialize form from user when available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      });
    }
  }, [user]);

  // Handle input changes with a single handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSaveChanges = () => {
    // Only for askers and admins, not professionals
    if (user?.activeRole === "professional") return;
    
    const formDataToSend = new FormData();
    
    // Add text fields
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    
    // Add profile picture if selected
    if (selectedFile) {
      formDataToSend.append("profilePic", selectedFile);
    }
    
    // Call the update API
    updateProfile.mutate(formDataToSend);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      });
    }
    setSelectedFile(null);
    setEditing(false);
  };

  const avatarInitial = (formData.firstName?.trim()[0] || "U").toUpperCase();

  // Choose view based on activeRole
  const role = user?.activeRole || "asker";
  
  return role === "professional" ? (
    <ProfessionalView 
      formData={formData}
      handleInputChange={handleInputChange}
      editing={editing}
      setEditing={setEditing}
      avatarInitial={avatarInitial}
    />
  ) : (
    <DefaultView
      formData={formData}
      handleInputChange={handleInputChange}
      editing={editing}
      setEditing={setEditing}
      user={user}
      avatarInitial={avatarInitial}
      handleSaveChanges={handleSaveChanges}
      handleCancelEdit={handleCancelEdit}
      handleFileChange={handleFileChange}
      fileInputRef={fileInputRef}
      isUpdating={updateProfile.isPending}
      selectedFile={selectedFile} // <-- pass selectedFile
    />
  );
};

export default ProfileView;