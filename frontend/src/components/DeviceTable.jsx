import { useState } from 'react';

const DeviceTable = ({ devices, groups, onEditDevice, filterGroupId, setFilterGroupId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDevices = devices.filter(device => {
    const matchesGroup = !filterGroupId || (filterGroupId === 'none' ? !device.group_id : String(device.group_id) === String(filterGroupId));
    const matchesSearch = !searchTerm || 
      (device.alias || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (device.device_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.hostname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.username || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
      <div className="p-6 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Livro de Endereços</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Filtrar por Grupo:</label>
            <select
              value={filterGroupId}
              onChange={(e) => setFilterGroupId(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Todos os Grupos</option>
              <option value="none">Sem Grupo (Geral)</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Dispositivo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Grupo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredDevices.map(device => (
              <tr key={device.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${device.is_online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-slate-300">
                      {device.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">
                    {device.alias || 'Sem Apelido'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {device.username}@{device.hostname}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">
                    {device.group_name || 'Geral'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs text-pink-400 bg-slate-800 px-2 py-1 rounded-lg break-all">
                    {device.device_id}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEditDevice(device)}
                    className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceTable;
