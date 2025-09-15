export const ImageUploader = ({ answerFiles, setAnswerFiles, fileInputRef }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const max = 5;
    const combined = [...answerFiles, ...files].slice(0, max);
    setAnswerFiles(combined);
    e.target.value = null; // reset input
  };

  return (
    <div>
      {answerFiles.length > 0 && (
        <div className="flex gap-2 mt-3">
          {answerFiles.map((file, i) => (
            <div key={i} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                className="w-16 h-16 object-cover rounded"
              />
              <button
                className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 text-xs"
                onClick={() =>
                  setAnswerFiles((prev) =>
                    prev.filter((_, idx) => idx !== i)
                  )
                }
                aria-label="remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-white border rounded text-gray-700 hover:bg-gray-50"
          onClick={() =>
            fileInputRef.current && fileInputRef.current.click()
          }
          disabled={answerFiles.length >= 5}
        >
          Attach images ({answerFiles.length}/5)
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>
    </div>
  );
};