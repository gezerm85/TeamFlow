import React, { useState, useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext';

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const { addTeam } = useContext(TeamContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName('');
    }
  };

  return (
    <div className="mb-4 flex flex-col md:flex-row items-stretch">
      <input
        type="text"
        placeholder="Takım adı"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="border p-2 mr-0 mb-2 md:mr-4 md:mb-0 bg-gray-800 text-white rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="bg-transparent rounded-md border border-gray-500 cursor-pointer hover:bg-gray-700 text-[#1a1a1a] hover:text-[#fff] p-2"
      >
        Takımı Oluştur
      </button>
    </div>
  );
};

export default TeamForm;
