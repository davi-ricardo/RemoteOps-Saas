import { useState } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';

const DeviceTable = ({ devices, groups, onEditDevice, filterGroupId, setFilterGroupId }) => {
  const { preferences } = usePreferences();
  const [searchTerm, setSearchTerm] = useState("");

  // Verifica se o tema atual é claro
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  const light = isLightTheme();
  
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
    <div className={`rounded-2xl bg-background-secondary border border-border overflow-hidden transition-all duration-300 ${
      light ? 'shadow-light-box' : ''
    }`}>
      <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-text">Livro de Endereços</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-text-secondary">Filtrar por Grupo:</label>
            <select
              value={filterGroupId}
              onChange={(e) => setFilterGroupId(e.target.value)}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
          <thead className="bg-background">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Dispositivo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Grupo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDevices.map(device => (
              <tr key={device.id} className="bg-surface hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${device.is_online ? 'bg-success' : 'bg-danger'}`}></span>
                    <span className="text-sm text-text-secondary">
                      {device.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-text">
                    {device.alias || 'Sem Apelido'}
                  </div>
                  <div className="text-xs text-text-muted">
                    {device.username}@{device.hostname}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full bg-surface text-text-secondary text-xs ${light ? 'border border-border' : ''}`}>
                    {device.group_name || 'Geral'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <code className={`text-xs text-pink-500 bg-surface px-2 py-1 rounded-lg break-all ${light ? 'border border-border' : ''}`}>
                    {device.device_id}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEditDevice(device)}
                    className={`px-4 py-2 text-sm text-primary hover:text-primary-hover hover:bg-primary/10 rounded-xl transition-all ${light ? 'border border-primary/20' : ''}`}
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
