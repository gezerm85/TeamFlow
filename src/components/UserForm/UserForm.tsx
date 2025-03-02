import React, { useState, useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext';

interface UserFormProps {
  teamId: string;
}

const UserForm = ({ teamId }: UserFormProps) => {
  const [userName, setUserName] = useState('');
  const { addUserToTeam } = useContext(TeamContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      addUserToTeam(teamId, userName);
      setUserName('');
    }
  };

  return (
    <div  className="mt-2">
      <input
        type="text"
        placeholder="Kullanıcı adı"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 mr-4 rounded-md"
      />
      <button onClick={handleSubmit} className="bg-transparent border hover:bg-gray-700 cursor-pointer border-gray-500 text-white p-2 rounded-md">
        Kaydet
        </button>
    </div>
  );
};

export default UserForm;