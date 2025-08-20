import React, { useState, useEffect, memo, useRef } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";
import useUpdateProfile from "../hooks/userhooks"; 

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


const PersonalInfoBox = ({ user, avatarInitial }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
    <h3 className="text-base font-semibold mb-2">Personal Information</h3>
    <p className="text-xs text-gray-500 mb-4">
      Tell us a bit about yourself. This information helps askers better understand who you are and builds confidence in your expertise.
    </p>
    <div className="flex flex-col items-center mb-6">
      {user?.profilePic ? (
        <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
          {avatarInitial}
        </div>
      )}
      <button type="button" className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 text-sm text-gray-700">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12M8 7l4-4 4 4M21 21H3" />
        </svg>
        Upload
      </button>
    </div>
    <div className="mb-4">
      <label className="block text-sm text-gray-700 font-medium mb-1">Full Name</label>
      <div className="flex gap-3">
        <input type="text" className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={user?.firstName || ""} disabled />
        <input type="text" className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={user?.lastName || ""} disabled />
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-sm text-gray-700 font-medium mb-1">Description</label>
      <textarea
        className="border border-gray-300 rounded-md p-2 w-full text-sm bg-gray-100 text-gray-600"
        value={user?.about?.[0] || ""}
        rows={3}
        disabled
      />
      <div className="text-xs text-gray-400 mt-1">min. 50 characters</div>
    </div>
    <div className="mb-4">
      <label className="block text-sm text-gray-700 font-medium mb-1">Languages</label>
      <div className="flex flex-wrap gap-2">
        {(user?.languages || []).map((lang) => (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{lang}</span>
        ))}
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-sm text-gray-700 font-medium mb-1">Location</label>
      <div className="flex flex-wrap gap-2">
        {(user?.country ? [user.country] : []).map((loc, idx) => (
          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{loc}</span>
        ))}
      </div>
    </div>
  </div>
);

const ProfessionalInfoBox = ({ user, avatarInitial }) => {
  const prof = user?.professional || {};
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
      <h3 className="text-base font-semibold mb-2">Professional Details</h3>
      <p className="text-xs text-gray-500 mb-4">
        Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you’re the right fit.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Category and Sub-Category</label>
        <div>
          {(prof.selectedSpecializations || []).map((spec, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{spec.specialization}</span>
              {spec.subCategories && spec.subCategories.length > 0 && (
                <span className="ml-2 text-xs text-gray-500">
                  ({spec.subCategories.join(", ")})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {(prof.tags || []).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{tag}</span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Indicative Price Range</label>
        <div className="flex gap-2">
          <input type="number" className="w-1/3 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={prof.priceRangeLow || ""} disabled />
          <span className="mx-2 text-gray-500">—</span>
          <input type="number" className="w-1/3 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={prof.priceRangeHigh || ""} disabled />
          <span className="ml-2 text-gray-500">{prof.currency || "$"}</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Individual / Firm</label>
        <input type="text" className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={prof.entityType === "firm" ? prof.firmName || "" : "Individual"} disabled />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Example Questions</label>
        <ul className="list-decimal ml-6">
          {(prof.exampleQuestions || []).map((q, idx) => (
            <li key={idx} className="text-sm text-gray-700 mb-1">{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};



const ProfessionalView = memo(({ formData, handleInputChange, editing, setEditing, avatarInitial,user }) => {
const prof = user?.professional || {};
  return (
    <div className="">
<div className="flex flex-col gap-8">
      <div className="w-full">
        <PersonalInfoBox user={user} avatarInitial={avatarInitial} />
      </div>
      <div className="w-full">
        <ProfessionalInfoBox user={user} avatarInitial={avatarInitial} />
      </div>
    </div>
    </div>
    
  );
});



// const ProfessionalView = memo(({ formData, handleInputChange, editing, setEditing, avatarInitial,user }) => {
// const prof = user?.professional || {};
//   return (
//     <div className="w-full">
//       <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
//         <h3 className="text-base font-semibold mb-2">Professional Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//           {/* Profile Picture */}
//           <div className="flex flex-col items-center justify-center md:justify-center">
//             {prof.profilePicture ? (
//               <img
//                 src={prof.profilePicture}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
//                 {avatarInitial}
//               </div>
//             )}
//           </div>
//           {/* Name and Title */}
//           <div className="md:col-span-2">
//             <div className="mb-4">
//               <label className="block text-sm text-gray-700 font-medium mb-1">Full Name</label>
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//                   value={user?.firstName || ""}
//                   disabled
//                 />
//                 <input
//                   type="text"
//                   className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//                   value={user?.lastName || ""}
//                   disabled
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm text-gray-700 font-medium mb-1">Title</label>
//               <input
//                 type="text"
//                 className="w-full text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//                 value={prof.title || ""}
//                 disabled
//               />
//             </div>
//           </div>
//         </div>
//         {/* About */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Description</label>
//           <textarea
//             className="border border-gray-300 rounded-md p-2 w-full text-sm bg-gray-100 text-gray-600"
//             value={Array.isArray(prof.about) ? prof.about.join("\n") : ""}
//             rows={3}
//             disabled
//           />
//         </div>
//         {/* Languages & Country */}
//         <div className="mb-4 flex gap-6">
//           <div className="flex-1">
//             <label className="block text-sm text-gray-700 font-medium mb-1">Languages</label>
//             <div className="flex flex-wrap gap-2">
//               {(prof.languages || []).map((lang, idx) => (
//                 <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
//                   {lang}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm text-gray-700 font-medium mb-1">Location</label>
//             <div className="flex flex-wrap gap-2">
//               {(prof.country || []).map((loc, idx) => (
//                 <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
//                   {loc}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Price Range */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Indicative Price Range</label>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               className="w-1/3 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//               value={prof.priceRangeLow || ""}
//               disabled
//             />
//             <span className="mx-2 text-gray-500">—</span>
//             <input
//               type="number"
//               className="w-1/3 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//               value={prof.priceRangeHigh || ""}
//               disabled
//             />
//             <span className="ml-2 text-gray-500">{prof.currency || "$"}</span>
//           </div>
//         </div>
//         {/* Individual / Firm */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Individual / Firm</label>
//           <input
//             type="text"
//             className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
//             value={prof.entityType === "firm" ? prof.firmName || "" : "Individual"}
//             disabled
//           />
//         </div>
//         {/* Example Questions */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Example Questions</label>
//           <ul className="list-decimal ml-6">
//             {(prof.exampleQuestions || []).map((q, idx) => (
//               <li key={idx} className="text-sm text-gray-700 mb-1">{q}</li>
//             ))}
//           </ul>
//         </div>
//         {/* Tags */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Tags</label>
//           <div className="flex flex-wrap gap-2">
//             {(prof.tags || []).map((tag, idx) => (
//               <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//         {/* Selected Specializations */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700 font-medium mb-1">Specializations</label>
//           <ul className="list-disc ml-6">
//             {(prof.selectedSpecializations || []).map((spec, idx) => (
//               <li key={idx} className="text-sm text-gray-700 mb-1">
//                 <span className="font-semibold">{spec.specialization}</span>
//                 {spec.subCategories && spec.subCategories.length > 0 && (
//                   <span className="ml-2 text-xs text-gray-500">
//                     ({spec.subCategories.join(", ")})
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// });

  

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
      user={user}
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