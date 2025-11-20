import React from "react";
import CustomButton from "../components/CustomButton.jsx";

const ReusableCard = ({
  title = "Modal Title",
  onClose,
  onCancel,
  onSave,
  children,
  isOpen = true,
  showButtons = true,
  cancelText = "Cancel",
  saveText = "Save",
  width = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#979797CC] bg-opacity-50 flex items-center justify-center z-40">
      <div className={`bg-white rounded-3xl shadow-xl ${width} w-full mx-4`}>
        {/* Header */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
            {title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-6 text-red-600 hover:text-gray-600 text-xl font-bold w-6 h-6 cursor-pointer flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Buttons */}
        {showButtons && (
          <div className="flex justify-end gap-3 p-6 pt-0">
            <CustomButton
              variant="secondary"
              onClick={onCancel || onClose}
              shine={true}
              customStyles=" w-[180px]"
            >
              {cancelText}
            </CustomButton>
            <CustomButton
              variant="primary"
              onClick={onSave}
              shine={true}
              customStyles=" w-[180px]"
            >
              {saveText}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableCard;
