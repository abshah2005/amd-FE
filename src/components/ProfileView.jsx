// import React, { useState } from "react";
// import { useAuth } from "../contextProvider/AuthContextProvider";
// import Edit from "../icons/Edit";

// const ProfileView = () => {
//   const { user } = useAuth();
//   const [editing, setEditing] = useState(false);

//   const firstNameInitial = (user?.firstName || "").trim();
//   const lastNameInitial = (user?.lastName || "").trim();
//   const avatarInitial = (firstNameInitial[0] || "U").toUpperCase();

//   return (
//     <div className="w-full">
//       <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
//         {/* header title + edit icon */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-base font-semibold">Personal Information</h3>
//             <p className="text-xs text-gray-500 mt-1 max-w-xl">
//               Tell us a bit about yourself. This information helps askers better
//               understand who you are and builds confidence in your expertise.
//             </p>
//           </div>

//           <div className="text-right">
//             <button
//               onClick={() => setEditing((s) => !s)}
//               aria-label={editing ? "Cancel edit" : "Edit profile"}
//               className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
//             >
//               {/* pencil icon */}
//               <Edit />
//             </button>
//             <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
//           </div>
//         </div>

//         {/* main content: picture centered and name fields */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//           {/* left column: label (keeps spacing like design) */}
//           <div className="md:col-span-1">
//             <div className="text-sm text-gray-700 font-medium mb-6">
//               Profile Picture
//             </div>
//           </div>

//           {/* middle: avatar */}
//           <div className="flex justify-center md:justify-center">
//             {user.profilePic ? (
//                 <img
//                     src={user.profilePic}
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full object-cover"
//                 />
//                 ) : (
//                 <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
//                     {avatarInitial}
//                 </div>
//                 )
//             }
            
//           </div>
//         </div>
//         <div>
//           {" "}
//           {/* right: name inputs */}
//           <div className="md:col-span-1">
//             <label className="block text-sm text-gray-700 font-medium mb-3">
//               Full Name
//             </label>

//             <div className="flex gap-3 items-center">
//               <div className="flex-1">
//                 <div className="text-xs text-gray-500 mb-1">First Name</div>
//                 <input
//                   className={`w-full text-sm rounded border p-2 ${
//                     editing ? "bg-white" : "bg-gray-100 text-gray-600"
//                   } border-gray-200`}
//                   value={firstNameInitial}
//                   onChange={() => {}}
//                   disabled={!editing}
//                 />
//               </div>

//               <div className="flex-1">
//                 <div className="text-xs text-gray-500 mb-1">Last Name</div>
//                 <input
//                   className={`w-full text-sm rounded border p-2 ${
//                     editing ? "bg-white" : "bg-gray-100 text-gray-600"
//                   } border-gray-200`}
//                   value={lastNameInitial}
//                   onChange={() => {}}
//                   disabled={!editing}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;














import React, { useState } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";

const ProfileView = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const firstNameInitial = (user?.firstName || "").trim();
  const lastNameInitial = (user?.lastName || "").trim();
  const avatarInitial = (firstNameInitial[0] || "U").toUpperCase();

  // Default (asker/admin) view (keeps your existing layout)
  const DefaultView = () => (
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
            <button
              onClick={() => setEditing((s) => !s)}
              aria-label={editing ? "Cancel edit" : "Edit profile"}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
            >
              <Edit />
            </button>
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
          <div className="flex justify-center md:justify-center">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                {avatarInitial}
              </div>
            )}
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
                  className={`w-full text-sm rounded border p-2 ${
                    editing ? "bg-white" : "bg-gray-100 text-gray-600"
                  } border-gray-200`}
                  value={firstNameInitial}
                  onChange={() => {}}
                  disabled={!editing}
                />
              </div>

              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Last Name</div>
                <input
                  className={`w-full text-sm rounded border p-2 ${
                    editing ? "bg-white" : "bg-gray-100 text-gray-600"
                  } border-gray-200`}
                  value={lastNameInitial}
                  onChange={() => {}}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Professional view (matches provided professional design, static placeholders)
  const ProfessionalView = () => (
    <div className="w-full">
      <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold">Personal Information</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Tell us a bit about yourself. This information helps askers better
              understand who you are and builds confidence in your expertise.
            </p>
          </div>

          <div className="text-right">
            <button
              onClick={() => setEditing((s) => !s)}
              aria-label={editing ? "Cancel edit" : "Edit profile"}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
            >
              <Edit />
            </button>
            <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
          </div>
        </div>

        {/* inner rounded panel */}
        <div className="mt-6 rounded-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* labels column */}
            <div className="space-y-6">
              <div className="text-sm text-gray-700 font-medium">Profile Picture *</div>
              <div className="text-sm text-gray-700 font-medium pt-2">Full Name *</div>
              <div className="text-sm text-gray-700 font-medium pt-2">Description *</div>
              <div className="text-sm text-gray-700 font-medium pt-2">Languages *</div>
              <div className="text-sm text-gray-700 font-medium pt-2">Location</div>
            </div>

            {/* avatar + upload */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                {avatarInitial}
              </div>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 text-sm text-gray-700"
              >
                {/* upload icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12M8 7l4-4 4 4M21 21H3" />
                </svg>
                Upload
              </button>
            </div>

            {/* form fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">First Name</div>
                  <input
                    className={`w-full text-sm rounded border p-2 ${
                      editing ? "bg-white" : "bg-gray-100 text-gray-600"
                    } border-gray-200`}
                    value={firstNameInitial || user?.email || ""}
                    disabled={!editing}
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Last Name</div>
                  <input
                    className={`w-full text-sm rounded border p-2 ${
                      editing ? "bg-white" : "bg-gray-100 text-gray-600"
                    } border-gray-200`}
                    value={lastNameInitial || user?.email || ""}
                    disabled={!editing}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <textarea
                  rows={4}
                  className={`w-full text-sm rounded border p-2 ${
                    editing ? "bg-white" : "bg-gray-100 text-gray-600"
                  } border-gray-200`}
                  placeholder="Share a bit about your work experience — including your background, areas of expertise, and any notable roles you've held."
                  disabled={!editing}
                />
                <div className="text-xs text-gray-400 mt-2">min. 150 characters</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Languages</div>
                  <div className="flex gap-2">
                    <select className="w-full text-sm rounded border p-2 border-gray-200 bg-white" disabled={!editing}>
                      <option>Language</option>
                    </select>
                    <button className="px-3 rounded bg-gray-100 text-sm" disabled={!editing}>Add</button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="flex gap-2">
                    <select className="w-full text-sm rounded border p-2 border-gray-200 bg-white" disabled={!editing}>
                      <option>Country</option>
                    </select>
                    <button className="px-3 rounded bg-gray-100 text-sm" disabled={!editing}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* professional-only extras: tags, price range, toggle, example questions (static) */}
        <div className="mt-6 rounded-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-sm text-gray-700 font-medium">Tags *</div>
            <div className="md:col-span-2">
              <div className="border border-gray-200 rounded p-2 flex flex-wrap gap-2 min-h-[44px] items-center">
                <div className="px-3 py-1 bg-gray-100 rounded text-sm">Logo design <span className="ml-2 text-gray-400">×</span></div>
                <div className="px-3 py-1 bg-gray-100 rounded text-sm">Brochure design <span className="ml-2 text-gray-400">×</span></div>
                <input className="flex-1 text-sm outline-none" placeholder="Add tags" disabled={!editing} />
              </div>
              <div className="text-xs text-gray-400 mt-2">5 tags maximum.</div>
            </div>

            <div className="text-sm text-gray-700 font-medium pt-4">Indicative Price Range *</div>
            <div className="md:col-span-2 flex items-center gap-3 pt-4">
              <input className="text-sm rounded border p-2 w-28 bg-gray-100 border-gray-200" placeholder="$20" disabled />
              <span className="text-sm text-gray-400">—</span>
              <input className="text-sm rounded border p-2 w-28 bg-gray-100 border-gray-200" placeholder="$100" disabled />
            </div>

            <div className="text-sm text-gray-700 font-medium pt-4">Individual / Firm</div>
            <div className="md:col-span-2 flex items-center gap-4 pt-4">
              <div className="relative">
                <input type="checkbox" className="sr-only" disabled />
                <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <input className="text-sm rounded border p-2 w-full bg-gray-100 border-gray-200" placeholder="Firm, College name" disabled />
            </div>

            <div className="text-sm text-gray-700 font-medium pt-4">Example Question - max 5</div>
            <div className="md:col-span-2 pt-4">
              <div className="flex gap-2">
                <input className="flex-1 text-sm rounded border p-2 border-gray-200 bg-white" placeholder="Start typing...!" disabled={!editing} />
                <button className="px-3 rounded bg-gray-100 text-sm" disabled={!editing}>Add</button>
              </div>

              <ol className="mt-3 text-sm text-gray-700 space-y-2">
                <li className="flex justify-between items-start gap-3">
                  <span>How should I structure my consulting agreement to protect my IP?</span>
                  <button className="text-gray-400">✕</button>
                </li>
                <li className="flex justify-between items-start gap-3">
                  <span>How should I structure my consulting agreement to protect my IP?</span>
                  <button className="text-gray-400">✕</button>
                </li>
                <li className="flex justify-between items-start gap-3">
                  <span>How should I structure my consulting agreement to protect my IP?</span>
                  <button className="text-gray-400">✕</button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // choose view based on activeRole
  const role = user?.activeRole || "asker";
  return role === "professional" ? <ProfessionalView /> : <DefaultView />;
};

export default ProfileView;