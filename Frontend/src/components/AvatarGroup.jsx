import React from "react";

const AvatarGroup = ({ avatars, maxVisible }) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const hiddenCount = avatars.length - maxVisible;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visibleAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`User Avatar ${index + 1}`}
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
        />
      ))}
      {hiddenCount > 0 && (
        <span className="inline-block h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
