import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineLink, HiMiniPlus } from "react-icons/hi2";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [link, setLink] = useState("");

  const handleAddLink = () => {
    if (link.trim()) {
      setAttachments([...attachments, link]);
      setLink("");
    }
  };

  const handleRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Attachments (Links)
      </label>

      {/* Attachments List */}
      <ul className="space-y-2">
        {attachments.map((url, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border"
          >
            <div
              className="flex items-center gap-2 text-black hover:underline truncate max-w-[80%]"
            >
              <HiOutlineLink className="w-4 h-4 text-slate-900" />
              {url}
            </div>

            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>

      {/* Link Input */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="url"
          placeholder="Enter a link (https://...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddLink}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <HiMiniPlus className="w-5 h-5" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
