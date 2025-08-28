import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // close when clicking background
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
