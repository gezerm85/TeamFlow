import { useContext, useState } from 'react';
import { TeamContext, Team } from '../../contexts/TeamContext';
import UserForm from '../UserForm/UserForm';
import { FaUserPlus, FaCheck, FaTimes, FaEllipsisV } from 'react-icons/fa';

const TeamEditor = () => {
  const { teams, removeUserFromTeam, updateTeam, removeTeam, updateUser } = useContext(TeamContext);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [editingUser, setEditingUser] = useState<{ teamId: string, userId: string } | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [showUserFormFor, setShowUserFormFor] = useState<string | null>(null);
  const [openTeamMenu, setOpenTeamMenu] = useState<string | null>(null);
  const [openUserMenu, setOpenUserMenu] = useState<{ teamId: string, userId: string } | null>(null);

  const handleEditTeamClick = (team: Team) => {
    setEditingTeamId(team.id);
    setNewTeamName(team.name);
  };

  const handleSaveTeamClick = (teamId: string) => {
    if (newTeamName.trim()) {
      updateTeam(teamId, newTeamName);
    }
    setEditingTeamId(null);
    setNewTeamName('');
  };

  const handleCancelTeamEdit = () => {
    setEditingTeamId(null);
    setNewTeamName('');
  };

  const handleDeleteTeam = (teamId: string) => {
    if (window.confirm("Takımı silmek istediğinize emin misiniz?")) {
      removeTeam(teamId);
    }
  };

  const handleEditUserClick = (teamId: string, userId: string, currentName: string) => {
    setEditingUser({ teamId, userId });
    setNewUserName(currentName);
  };

  const handleSaveUserClick = (teamId: string, userId: string) => {
    if (newUserName.trim()) {
      updateUser(teamId, userId, newUserName);
    }
    setEditingUser(null);
    setNewUserName('');
  };

  const handleCancelUserEdit = () => {
    setEditingUser(null);
    setNewUserName('');
  };

  const handleDeleteUser = (teamId: string, userId: string) => {
    if (window.confirm("Kullanıcıyı silmek istediğinize emin misiniz?")) {
      removeUserFromTeam(teamId, userId);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-[#1a1a1a]">Oluşturulan Takımlar</h3>
      {teams.map(team => (
        <div
          key={team.id}
          className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 transition-all duration-300 hover:shadow-xl"
        >
          {editingTeamId === team.id ? (
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-3 space-y-3 md:space-y-0">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="flex-grow border border-gray-600 p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Takım adını düzenle"
              />
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => handleSaveTeamClick(team.id)}
                  className="flex items-center space-x-1 bg-transparent border border-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded transition-colors"
                >
                  <FaCheck />
                  <span className="hidden md:inline">Kaydet</span>
                </button>
                <button
                  onClick={handleCancelTeamEdit}
                  className="flex items-center space-x-1 bg-transparent border border-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded transition-colors"
                >
                  <FaTimes />
                  <span className="hidden md:inline">İptal</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
              <h4 className="text-xl font-bold capitalize mb-2 md:mb-0">{team.name}</h4>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setShowUserFormFor(showUserFormFor === team.id ? null : team.id)
                  }
                  className="flex items-center border border-gray-500 rounded-full bg-transparent hover:bg-gray-500 text-white px-3 py-3 cursor-pointer transition-colors"
                >
                  <FaUserPlus />
                </button>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenTeamMenu(openTeamMenu === team.id ? null : team.id)
                    }
                    className="flex items-center p-2 border border-gray-500 hover:bg-gray-700 rounded-md cursor-pointer"
                  >
                    <FaEllipsisV className="text-white" />
                  </button>
                  {openTeamMenu === team.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                      <div
                        onClick={() => {
                          handleDeleteTeam(team.id);
                          setOpenTeamMenu(null);
                        }}
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                      >
                        Takımı Sil
                      </div>
                      <div
                        onClick={() => {
                          handleEditTeamClick(team);
                          setOpenTeamMenu(null);
                        }}
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                      >
                        Düzenle
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {showUserFormFor === team.id && (
            <div className="mt-4">
              <UserForm teamId={team.id} />
              {team.users.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {team.users.map(user => (
                    <li
                      key={user.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-2"
                    >
                      {editingUser &&
                      editingUser.teamId === team.id &&
                      editingUser.userId === user.id ? (
                        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 w-full space-y-2 md:space-y-0">
                          <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            className="flex-grow border border-gray-600 p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Kullanıcı adını düzenle"
                          />
                          <div className="flex flex-col md:flex-row gap-2">
                            <button
                              onClick={() => handleSaveUserClick(team.id, user.id)}
                              className="flex items-center space-x-1 bg-transparent border border-gray-700 rounded-md hover:bg-gray-700 text-white px-3 py-2  transition-colors"
                            >
                              <FaCheck />
                              <span className="hidden md:inline">Kaydet</span>
                            </button>
                            <button
                              onClick={handleCancelUserEdit}
                              className="flex items-center space-x-1 bg-transparent border border-gray-700 rounded-md hover:bg-gray-700 text-white px-3 py-2  transition-colors"
                            >
                              <FaTimes />
                              <span className="hidden md:inline">İptal</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                          <span className="text-lg">{user.name}</span>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setOpenUserMenu(
                                  openUserMenu &&
                                  openUserMenu.teamId === team.id &&
                                  openUserMenu.userId === user.id
                                    ? null
                                    : { teamId: team.id, userId: user.id }
                                )
                              }
                              className="flex items-center p-2 hover:bg-gray-700 rounded"
                            >
                              <FaEllipsisV className="text-white" />
                            </button>
                            {openUserMenu &&
                              openUserMenu.teamId === team.id &&
                              openUserMenu.userId === user.id && (
                                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                                  <div
                                    onClick={() => {
                                      handleEditUserClick(team.id, user.id, user.name);
                                      setOpenUserMenu(null);
                                    }}
                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                                  >
                                    Düzenle
                                  </div>
                                  <div
                                    onClick={() => {
                                      handleDeleteUser(team.id, user.id);
                                      setOpenUserMenu(null);
                                    }}
                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                                  >
                                    Sil
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamEditor;
