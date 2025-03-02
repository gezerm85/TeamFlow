import { useContext, useMemo, useState, useEffect } from 'react';
import ReactFlow, {  Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { TeamContext } from '../../contexts/TeamContext';
import EditModal from '../../components/Modal/EditModal';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import { FaInfoCircle } from 'react-icons/fa';

const DiagramChartPage = () => {
  const { teams, removeTeam, removeUserFromTeam, updateTeam, updateUser } = useContext(TeamContext);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    type: 'team' | 'user';
    teamId: string;
    userId?: string;
  } | null>(null);
  const [editModalData, setEditModalData] = useState<{
    type: 'team' | 'user';
    teamId: string;
    userId?: string;
    currentName: string;
  } | null>(null);

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu?.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [contextMenu]);

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const teamX = 50;
    const userX = 300;
    let yOffset = 50;
    const userSpacing = 70;
    teams.forEach((team) => {
      const teamNode: Node = {
        id: team.id,
        type: 'default',
        data: {
          label: (
            <div
              className="p-2 border rounded bg-blue-700 text-white cursor-pointer select-none"
              onClick={() => console.log(`Takım tıklandı: ${team.name}`)}
              onContextMenu={(e) => handleTeamRightClick(e, team.id)}
            >
              Takım: {team.name}
            </div>
          )
        },
        position: { x: teamX, y: yOffset }
      };
      nodes.push(teamNode);
      team.users.forEach((user, index) => {
        const userNode: Node = {
          id: `user-${user.id}`,
          type: 'default',
          data: {
            label: (
              <div
                className="p-2 border rounded bg-green-700 text-white cursor-pointer select-none"
                onClick={() => console.log(`Kullanıcı tıklandı: ${user.name}`)}
                onContextMenu={(e) => handleUserRightClick(e, team.id, user.id)}
              >
                Kullanıcı: {user.name}
              </div>
            )
          },
          position: { x: userX, y: yOffset + index * userSpacing }
        };
        nodes.push(userNode);
        edges.push({
          id: `edge-${team.id}-${user.id}`,
          source: team.id,
          target: `user-${user.id}`,
          animated: true
        });
      });
      yOffset += Math.max(100, team.users.length * userSpacing) + 50;
    });
    return { nodes, edges };
  }, [teams]);

  const chartData = teams.map((team) => ({
    name: team.name,
    Kullanıcı: team.users.length
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const handleTeamRightClick = (e: React.MouseEvent, teamId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type: 'team',
      teamId
    });
  };

  const handleUserRightClick = (e: React.MouseEvent, teamId: string, userId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type: 'user',
      teamId,
      userId
    });
  };

  const handleEdit = () => {
    if (contextMenu) {
      if (contextMenu.type === 'team') {
        const team = teams.find((t) => t.id === contextMenu.teamId);
        if (team) {
          setEditModalData({
            type: 'team',
            teamId: team.id,
            currentName: team.name
          });
        }
      } else if (contextMenu.type === 'user' && contextMenu.userId) {
        const team = teams.find((t) => t.id === contextMenu.teamId);
        const user = team?.users.find((u) => u.id === contextMenu.userId);
        if (user) {
          setEditModalData({
            type: 'user',
            teamId: team?.id || '',
            userId: user.id,
            currentName: user.name
          });
        }
      }
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  return (
    <div className="p-4 bg-transparent min-h-screen text-white relative">
      {teams.length === 0 ? (
        <div className="p-4 flex flex-col justify-center items-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
            <FaInfoCircle className="text-6xl text-gray-400 mb-4" />
            <p className="text-xl text-white mb-2">Veri bulunamadı</p>
            <p className="text-gray-400 text-center">
              Lütfen takım ekleyin ve kullanıcılarınızı oluşturun.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Diyagram (React Flow)</h3>
            <div className="border border-gray-700 rounded w-full h-[300px] md:h-[400px]">
              <ReactFlow className="bg-gray-800" nodes={nodes} edges={edges} fitView>
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="Kullanıcı"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#fff', border: 'none', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" allowDecimals={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Bar dataKey="Kullanıcı" fill="#82ca9d">
                    <LabelList dataKey="name" position="top" fill="#fff" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      {contextMenu && contextMenu.visible && (
        <div
          className="absolute bg-gray-800 text-white rounded shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="p-4 flex flex-col gap-4 rounded-full">
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md border border-gray-500"
              onClick={handleEdit}
            >
              Düzenle
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md border border-gray-500"
              onClick={() => {
                if (contextMenu.type === 'team') {
                  removeTeam(contextMenu.teamId);
                } else if (contextMenu.type === 'user' && contextMenu.userId) {
                  removeUserFromTeam(contextMenu.teamId, contextMenu.userId);
                }
                setContextMenu({ ...contextMenu, visible: false });
              }}
            >
              Sil
            </li>
          </ul>
        </div>
      )}
      {editModalData && (
        <EditModal
          data={editModalData}
          onClose={() => setEditModalData(null)}
          onSave={(newName: string) => {
            if (editModalData.type === 'team') {
              updateTeam(editModalData.teamId, newName);
            } else if (editModalData.type === 'user' && editModalData.userId) {
              updateUser(editModalData.teamId, editModalData.userId, newName);
            }
            setEditModalData(null);
          }}
        />
      )}
    </div>
  );
};

export default DiagramChartPage;
