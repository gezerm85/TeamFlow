import  { useState } from 'react';

import { motion } from 'framer-motion';

interface EditModalProps {
data: {
    type: 'team' | 'user';
    teamId: string;
    userId?: string;
    currentName: string;
};
  onClose: () => void;
  onSave: (newValue: string) => void;
}

const EditModal = ({ data, onClose, onSave }: EditModalProps) => {
  const [value, setValue] = useState(data.currentName);

  const handleSave = () => {
    if (value.trim()) {
        onSave(value)
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-center text-xl font-semibold text-white mb-4">
          Takım Adını Düzenle
        </h1>
        <input
          className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Yeni isim girin"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 rounded-md bg-transparent border-gray-500 border cursor-pointer hover:bg-gray-700 text-white font-semibold transition"
            onClick={onClose}
          >
            İptal
          </button>
          <button
            className="px-4 py-2 rounded-md bg-transparent border-gray-500 border cursor-pointer hover:bg-gray-700 text-white font-semibold transition"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditModal;
