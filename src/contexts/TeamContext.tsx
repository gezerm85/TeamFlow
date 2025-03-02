/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  users: User[];
}

interface TeamContextProps {
  teams: Team[];
  addTeam: (teamName: string) => void;
  addUserToTeam: (teamId: string, userName: string) => void;
  removeUserFromTeam: (teamId: string, userId: string) => void;
  updateTeam: (teamId: string, newName: string) => void;
  removeTeam: (teamId: string) => void;
  updateUser: (teamId: string, userId: string, newName: string) => void;
}

export const TeamContext = createContext<TeamContextProps>({
  teams: [],
  addTeam: () => {},
  addUserToTeam: () => {},
  removeUserFromTeam: () => {},
  updateTeam: () => {},
  removeTeam: () => {},
  updateUser: () => {},
});

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const addTeam = (teamName: string) => {
    const newTeam: Team = { id: Date.now().toString(), name: teamName, users: [] };
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  const addUserToTeam = (teamId: string, userName: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === teamId) {
          const newUser = { id: Date.now().toString(), name: userName };
          return { ...team, users: [...team.users, newUser] };
        }
        return team;
      })
    );
  };

  const removeUserFromTeam = (teamId: string, userId: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === teamId) {
          return { ...team, users: team.users.filter(user => user.id !== userId) };
        }
        return team;
      })
    );
  };

  const updateTeam = (teamId: string, newName: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  const removeTeam = (teamId: string) => {
    setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
  };

  const updateUser = (teamId: string, userId: string, newName: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === teamId) {
          const updatedUsers = team.users.map(user =>
            user.id === userId ? { ...user, name: newName } : user
          );
          return { ...team, users: updatedUsers };
        }
        return team;
      })
    );
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        addTeam,
        addUserToTeam,
        removeUserFromTeam,
        updateTeam,
        removeTeam,
        updateUser,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};