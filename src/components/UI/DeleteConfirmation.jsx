// components/DeleteConfirmation.jsx
import React from 'react';
import { Trash2, X, Check } from 'lucide-react';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-4">
          <Trash2 className="w-5 h-5 mr-2 text-red-600" />
          Confirm Deletion
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4 inline mr-1" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            <Check className="w-4 h-4 inline mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
