import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL);
      setAllUsers(response.data);
      console.log("Fetched users:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    if (tempSelectedUsers.includes(userId)) {
      setTempSelectedUsers(tempSelectedUsers.filter((id) => id !== userId));
    } else {
      setTempSelectedUsers([...tempSelectedUsers, userId]);
    }
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2 ">
      {selectedUserAvatars.length === 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <LuUsers />
          Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4">
          {/* Scrollable user list */}
          <div className="h-[55vh] overflow-y-auto space-y-4">
            {allUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 p-2 border-b border-gray-200"
              >
                <img
                  src={user.profileImageUrl}
                  alt={user.name}
                  className="h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <input
                  type="checkbox"
                  checked={tempSelectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                  className="w-4 h-4 text-primary"
                />
              </div>
            ))}
          </div>

          {/* Footer (fixed inside modal, not scrollable) */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              CANCEL
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
              onClick={handleAssign}
            >
              DONE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
