import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // update state
      setImage(file);
      // create object URL for preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-blue-700" />
          <button
            onClick={onChooseFile}
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload className="inline-block mr-1" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-32 h-32 object-cover rounded-full "
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full  absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash className="inline-block mr-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
