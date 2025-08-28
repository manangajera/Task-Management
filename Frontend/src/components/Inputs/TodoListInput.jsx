import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        TODO Checklist
      </label>

      {/* Todo List */}
      <ul className="space-y-3 mb-4">
        {todoList.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-400 w-6">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-gray-800">{item}</span>
            </div>
            <button
              onClick={() => handleDeleteOption(index)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>

      {/* Input & Add button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          placeholder="Enter Task"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddOption}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <HiMiniPlus className="w-5 h-5" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
