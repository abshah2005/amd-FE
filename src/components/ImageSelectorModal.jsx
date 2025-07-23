import React, { useState, useRef } from "react";

const MAX_IMAGES = 5;

const ImageSelectorModal = ({
  open,
  onClose,
  onSelectImages,
  initialImages = [],
}) => {
  const [selectedImages, setSelectedImages] = useState(initialImages);

  const fileInputRef = useRef();

  // Handle image upload (add new images, max 5, no duplicates)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Filter out duplicates by name and type
    const existingKeys = new Set(
      selectedImages.map((f) => f.name + f.type + f.size)
    );
    const newFiles = files.filter(
      (f) => !existingKeys.has(f.name + f.type + f.size)
    );
    // Only add up to MAX_IMAGES
    const allowedFiles = newFiles.slice(0, MAX_IMAGES - selectedImages.length);
    setSelectedImages((prev) => [...prev, ...allowedFiles]);
    e.target.value = "";
  };

  // Remove image by index
  const handleRemoveImage = (idx) => {
    setSelectedImages((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      onSelectImages(updated); // <-- update parent instantly
      return updated;
    });
  };

  // Confirm selection and pass images to parent
  const handleConfirmSelection = () => {
    onSelectImages(selectedImages);
    onClose();
  };

  // Reset images when modal closes
  React.useEffect(() => {
    if (open) setSelectedImages(initialImages);
  }, [open, initialImages]);

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-xl shadow-lg w-[90^] md:w-full max-w-md p-6 relative">
          <div className="flex items-center justify-between  mb-4">
            <span className="flex-shrink-0 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_402_3254)">
                  <path
                    d="M7.99992 14.6668C11.6818 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6818 1.3335 7.99992 1.3335C4.31802 1.3335 1.33325 4.31826 1.33325 8.00016C1.33325 11.6821 4.31802 14.6668 7.99992 14.6668Z"
                    stroke="#2F2E41"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 10.6667V8"
                    stroke="#2F2E41"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 5.3335H8.00667"
                    stroke="#2F2E41"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_402_3254">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            {/* Center: Attach */}
            <h2 className="text-base font-semibold text-gray-800 flex-1 text-center">
              Attach
            </h2>
            {/* Right: Close Button */}
            <button
              className="flex-shrink-0 text-gray-400 hover:text-gray-700 text-xl ml-2"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-800 block mb-1">
              Attach an image from your library
            </span>
            <span className="text-gray-500 text-sm">
              You can also drag and drop files to upload them.
            </span>
          </div>
          <button
            className="w-full border border-blue-600 rounded-lg py-2 text-blue-600 font-semibold mb-4 mt-4 hover:bg-blue-50 transition"
            onClick={() => fileInputRef.current.click()}
            type="button"
            disabled={selectedImages.length >= MAX_IMAGES}
          >
            {selectedImages.length >= MAX_IMAGES
              ? "Maximum 5 images"
              : "Upload an image"}
          </button>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
            disabled={selectedImages.length >= MAX_IMAGES}
          />
          <hr className="my-4 border-gray-200" />
          <div className="mb-4">
            <span className="font-semibold text-gray-800 block mb-2">
              Images Uploaded
            </span>
            <div className="flex flex-col gap-3">
              {selectedImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Image ${idx + 1}`}
                    className="w-10 h-10 rounded object-cover bg-gray-100"
                  />
                  <span className="text-gray-800 text-sm truncate max-w-[120px]">
                    {img.name}
                  </span>
                  <button
                    className="ml-auto text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveImage(idx)}
                    title="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2 4H14"
                        stroke="#EF2D07"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.6666 4V13.3333C12.6666 14 11.9999 14.6667 11.3333 14.6667H4.66659C3.99992 14.6667 3.33325 14 3.33325 13.3333V4"
                        stroke="#EF2D07"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.33325 4.00016V2.66683C5.33325 2.00016 5.99992 1.3335 6.66659 1.3335H9.33325C9.99992 1.3335 10.6666 2.00016 10.6666 2.66683V4.00016"
                        stroke="#EF2D07"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66675 7.3335V11.3335"
                        stroke="#EF2D07"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.33325 7.3335V11.3335"
                        stroke="#EF2D07"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {selectedImages.length === 0 && (
                <span className="text-gray-400 text-sm">
                  No images uploaded.
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-white text-gray-700 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 border border-transparent"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-700"
              onClick={handleConfirmSelection}
              disabled={selectedImages.length === 0}
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageSelectorModal;
