import { useState, useEffect } from 'react';
import api from './services/api';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './layouts/DashboardLayout';
import DeviceTable from './components/DeviceTable';
import GroupsTable from './components/GroupsTable';
import ReportsTable from './components/ReportsTable';
import UsersTable from './components/UsersTable';
import ServiceCategoriesTable from './components/ServiceCategoriesTable';
import Modal from './components/Modal';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  const [activeTab, setActiveTab] = useState('home');
  const [devices, setDevices] = useState([]);
  const [groups, setGroups] = useState([]);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [filterGroupId, setFilterGroupId] = useState('');
  
  // Modal states
  const [editingDevice, setEditingDevice] = useState(null);
  const [newAlias, setNewAlias] = useState('');
  const [newGroupId, setNewGroupId] = useState('');
  
  const [editingGroup, setEditingGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  
  const [editingLog, setEditingLog] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [exportMonth, setExportMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [exportYear, setExportYear] = useState(String(new Date().getFullYear()));
  
  const [editingUser, setEditingUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPass, setEditUserPass] = useState('');
  const [editUserRole, setEditUserRole] = useState('user');
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  
  const [serverInfo, setServerInfo] = useState(null);
  const [editingServerInfo, setEditingServerInfo] = useState(false);
  const [editIdServer, setEditIdServer] = useState('');
  const [editRelayServer, setEditRelayServer] = useState('');
  const [editRustdeskKey, setEditRustdeskKey] = useState('');
  const [todayConnections, setTodayConnections] = useState(0);

  // Fetch functions
  const fetchServerInfo = async () => {
    try {
      const response = await api.get('/api/server-info');
      setServerInfo(response.data);
      if (!editingServerInfo) {
        setEditIdServer(response.data?.idServer || '');
        setEditRelayServer(response.data?.relayServer || '');
        setEditRustdeskKey(response.data?.key || '');
      }
    } catch (err) { console.error('Erro ao buscar info do servidor'); }
  };

  const fetchTodayConnections = async () => {
    try {
      const response = await api.get('/api/today-connections');
      setTodayConnections(response.data.count);
    } catch (err) { console.error('Erro ao buscar conexões de hoje'); }
  };

  const fetchDevices = async () => {
    try {
      const response = await api.get('/api/devices');
      setDevices(response.data);
    } catch (err) { console.error('Erro ao buscar dispositivos'); }
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get('/api/groups');
      setGroups(response.data);
    } catch (err) { console.error('Erro ao buscar grupos'); }
  };

  const fetchReports = async () => {
    try {
      const response = await api.get('/api/reports');
      console.log('[DEBUG] fetchReports:', response.data);
      setReports(response.data);
    } catch (err) { console.error('Erro ao buscar relatórios'); }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (err) { console.error('Erro ao buscar usuários'); }
  };

  const fetchServiceCategories = async () => {
    try {
      const response = await api.get('/api/service-categories');
      setServiceCategories(response.data);
    } catch (err) { console.error('Erro ao buscar categorias'); }
  };

  // Handlers
  const handleLogin = async (email, password, setError, setLoading) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken, user } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setToken(newToken);
      setCurrentUser(user);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro de conexão com o servidor';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setToken(null);
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleSaveAlias = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/alias', {
        device_id: editingDevice.device_id,
        alias: newAlias,
        group_id: newGroupId || null
      });
      setEditingDevice(null);
      fetchDevices();
    } catch (err) { alert('Erro ao salvar apelido'); }
  };

  const handleSaveServerInfo = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/server-info', {
        idServer: editIdServer,
        relayServer: editRelayServer,
        key: editRustdeskKey
      });
      setEditingServerInfo(false);
      fetchServerInfo();
      alert('Configurações atualizadas!');
    } catch (err) { alert('Erro ao atualizar configurações'); }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        await api.put(`/api/groups/${editingGroup.id}`, { name: newGroupName, description: newGroupDesc });
      } else {
        await api.post('/api/groups', { name: newGroupName, description: newGroupDesc });
      }
      setNewGroupName('');
      setNewGroupDesc('');
      setEditingGroup(null);
      fetchGroups();
    } catch (err) { alert('Erro ao gerenciar grupo'); }
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm('Excluir este grupo? Dispositivos vinculados ficarão sem grupo.')) return;
    try {
      await api.delete(`/api/groups/${id}`);
      fetchGroups();
      fetchDevices();
    } catch (err) { alert('Erro ao excluir grupo'); }
  };

  const handleSaveLogCategory = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/reports/${editingLog.id}/category`, { 
        category_id: selectedCategoryId ? parseInt(selectedCategoryId) : null 
      });
      setEditingLog(null);
      setSelectedCategoryId('');
      fetchReports();
    } catch (err) { alert('Erro ao salvar categoria do log'); }
  };

  const handleSwapFromTo = async (logId) => {
    try {
      await api.put(`/api/reports/${logId}/swap`);
      fetchReports();
    } catch (err) { alert('Erro ao inverter origem/destino'); }
  };

  const handleExportXLS = async () => {
    try {
      const response = await api.get(`/api/reports/export/xls?month=${exportMonth}&year=${exportYear}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio_rustdesk_${exportMonth}_${exportYear}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) { alert('Erro ao exportar relatório'); }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users', { 
        username: newUserName, 
        email: newUserEmail, 
        password: newUserPass, 
        role: newUserRole 
      });
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPass('');
      fetchUsers();
      alert('Usuário criado!');
    } catch (err) { 
      alert('Erro ao criar usuário: ' + (err.response?.data?.error || err.message)); 
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: editUserName,
        email: editUserEmail,
        role: editUserRole
      };
      if (editUserPass) {
        userData.password = editUserPass;
      }
      await api.put(`/api/users/${editingUser.id}`, userData);
      setEditingUser(null);
      setEditUserName('');
      setEditUserEmail('');
      setEditUserPass('');
      fetchUsers();
      alert('Usuário atualizado!');
    } catch (err) { alert('Erro ao atualizar usuário'); }
  };

  const handleToggleUserStatus = async (id, isActive) => {
    const confirmMsg = isActive ? 'Desativar este usuário?' : 'Ativar este usuário?';
    if (!window.confirm(confirmMsg)) return;
    try {
      await api.put(`/api/users/${id}/toggle`);
      fetchUsers();
    } catch (err) { alert('Erro ao atualizar status do usuário'); }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/api/service-categories/${editingCategory.id}`, { name: newCategoryName, description: newCategoryDesc });
      } else {
        await api.post('/api/service-categories', { name: newCategoryName, description: newCategoryDesc });
      }
      setNewCategoryName('');
      setNewCategoryDesc('');
      setEditingCategory(null);
      fetchServiceCategories();
    } catch (err) { 
      alert('Erro ao gerenciar categoria: ' + (err.response?.data?.error || err.message)); 
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Excluir esta categoria? Logs vinculados ficarão sem categoria.')) return;
    try {
      await api.delete(`/api/service-categories/${id}`);
      fetchServiceCategories();
    } catch (err) { 
      alert('Erro ao excluir categoria: ' + (err.response?.data?.error || err.message)); 
    }
  };

  useEffect(() => {
    if (token) {
      fetchServerInfo();
      fetchTodayConnections();
      fetchDevices();
      fetchGroups();
      if (currentUser?.role === 'admin') {
        fetchServiceCategories();
      }
      if (activeTab === 'reports') fetchReports();
      if (activeTab === 'users' && currentUser?.role === 'admin') fetchUsers();

      const interval = setInterval(() => {
        fetchDevices();
        fetchGroups();
        if (currentUser?.role === 'admin') {
          fetchServiceCategories();
        }
        if (activeTab === 'reports') fetchReports();
        if (activeTab === 'users' && currentUser?.role === 'admin') fetchUsers();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [token, activeTab, currentUser]);

  const getTabTitle = () => {
    const titles = {
      home: 'Dashboard',
      devices: 'Dispositivos',
      groups: 'Grupos',
      reports: 'Relatórios',
      'service-categories': 'Tipos de Serviço',
      users: 'Usuários',
      settings: 'Configurações'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardPage devices={devices} users={users} todayConnections={todayConnections} />;
      
      case 'devices':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Configurações VPS</h3>
                    {currentUser?.role === 'admin' && (
                      <button
                        onClick={() => setEditingServerInfo(!editingServerInfo)}
                        className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                      >
                        {editingServerInfo ? 'Cancelar' : 'Editar'}
                      </button>
                    )}
                  </div>
                  
                  {!editingServerInfo ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-500 uppercase">ID Server</label>
                        <code className="block mt-1 p-3 bg-slate-800 rounded-lg text-pink-400 text-sm break-all">
                          {serverInfo?.idServer || '-'}
                        </code>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 uppercase">Relay Server</label>
                        <code className="block mt-1 p-3 bg-slate-800 rounded-lg text-pink-400 text-sm break-all">
                          {serverInfo?.relayServer || '-'}
                        </code>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 uppercase">Key</label>
                        <code className="block mt-1 p-3 bg-slate-800 rounded-lg text-pink-400 text-sm break-all">
                          {serverInfo?.key || '-'}
                        </code>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveServerInfo} className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-400">ID Server</label>
                        <input
                          type="text"
                          value={editIdServer}
                          onChange={(e) => setEditIdServer(e.target.value)}
                          className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Relay Server</label>
                        <input
                          type="text"
                          value={editRelayServer}
                          onChange={(e) => setEditRelayServer(e.target.value)}
                          className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Key</label>
                        <textarea
                          value={editRustdeskKey}
                          onChange={(e) => setEditRustdeskKey(e.target.value)}
                          rows={3}
                          className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      >
                        Salvar
                      </button>
                    </form>
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <DeviceTable
                  devices={devices}
                  groups={groups}
                  filterGroupId={filterGroupId}
                  setFilterGroupId={setFilterGroupId}
                  onEditDevice={(device) => {
                    setEditingDevice(device);
                    setNewAlias(device.alias || '');
                    setNewGroupId(device.group_id || '');
                  }}
                />
              </div>
            </div>
          </div>
        );
      
      case 'groups':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {editingGroup ? 'Editar Grupo' : 'Novo Grupo'}
                  </h3>
                  <form onSubmit={handleCreateGroup} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Nome do Departamento</label>
                      <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Ex: RH"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Descrição</label>
                      <textarea
                        value={newGroupDesc}
                        onChange={(e) => setNewGroupDesc(e.target.value)}
                        placeholder="Descrição do grupo"
                        rows={3}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      {editingGroup && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGroup(null);
                            setNewGroupName('');
                            setNewGroupDesc('');
                          }}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-all ${editingGroup ? 'flex-1' : 'w-full'}`}
                      >
                        {editingGroup ? 'Atualizar' : 'Criar Grupo'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <GroupsTable
                  groups={groups}
                  onEditGroup={(group) => {
                    setEditingGroup(group);
                    setNewGroupName(group.name);
                    setNewGroupDesc(group.description || '');
                  }}
                  onDeleteGroup={handleDeleteGroup}
                  onViewDevices={(groupId) => {
                    setFilterGroupId(String(groupId));
                    setActiveTab('devices');
                  }}
                />
              </div>
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <ReportsTable
            reports={reports}
            serviceCategories={serviceCategories}
            onClassifyLog={(log) => {
              setEditingLog(log);
              setSelectedCategoryId(log.category_id || '');
            }}
            onSwapFromTo={handleSwapFromTo}
            exportMonth={exportMonth}
            setExportMonth={setExportMonth}
            exportYear={exportYear}
            setExportYear={setExportYear}
            onExportXLS={handleExportXLS}
          />
        );
      
      case 'service-categories':
        if (currentUser?.role !== 'admin') return null;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {editingCategory ? 'Editar Tipo' : 'Novo Tipo de Serviço'}
                  </h3>
                  <form onSubmit={handleCreateCategory} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Nome</label>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Ex: Problema na impressora"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Descrição</label>
                      <textarea
                        value={newCategoryDesc}
                        onChange={(e) => setNewCategoryDesc(e.target.value)}
                        placeholder="Descrição da categoria"
                        rows={3}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      {editingCategory && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(null);
                            setNewCategoryName('');
                            setNewCategoryDesc('');
                          }}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-all ${editingCategory ? 'flex-1' : 'w-full'}`}
                      >
                        {editingCategory ? 'Atualizar' : 'Criar Tipo'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <ServiceCategoriesTable
                  serviceCategories={serviceCategories}
                  onEditCategory={(category) => {
                    setEditingCategory(category);
                    setNewCategoryName(category.name);
                    setNewCategoryDesc(category.description || '');
                  }}
                  onDeleteCategory={handleDeleteCategory}
                />
              </div>
            </div>
          </div>
        );
      
      case 'users':
        if (currentUser?.role !== 'admin') return null;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Novo Usuário</h3>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Nome de Usuário</label>
                      <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Nome de usuário (opcional)"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">E-mail</label>
                      <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="email@exemplo.com"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Senha</label>
                      <input
                        type="password"
                        value={newUserPass}
                        onChange={(e) => setNewUserPass(e.target.value)}
                        placeholder="********"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Nível</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="user">Usuário (Técnico)</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-all"
                    >
                      Criar
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <UsersTable
                  users={users}
                  onEditUser={(user) => {
                    setEditingUser(user);
                    setEditUserName(user.username || '');
                    setEditUserEmail(user.email);
                    setEditUserRole(user.role);
                  }}
                  onToggleUserStatus={handleToggleUserStatus}
                />
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Configurações</h3>
            <p className="text-slate-400">Página de configurações em desenvolvimento...</p>
          </div>
        );
      
      default:
        return (
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-6">
            <p className="text-slate-400">Página em desenvolvimento...</p>
          </div>
        );
    }
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentUser={currentUser}
      onLogout={handleLogout}
      title={getTabTitle()}
    >
      {renderTabContent()}

      {/* Edit Device Modal */}
      <Modal
        isOpen={!!editingDevice}
        onClose={() => setEditingDevice(null)}
        title="Editar Dispositivo"
      >
        <form onSubmit={handleSaveAlias} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Apelido (Nome amigável)</label>
            <input
              type="text"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              placeholder="Ex: PC do Suporte"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Departamento / Grupo</label>
            <select
              value={newGroupId}
              onChange={(e) => setNewGroupId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Nenhum (Geral)</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingDevice(null)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </Modal>

      {/* Classify Log Modal */}
      <Modal
        isOpen={!!editingLog}
        onClose={() => setEditingLog(null)}
        title="Classificar Log"
      >
        <form onSubmit={handleSaveLogCategory} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Tipo de Serviço</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Não classificado</option>
              {serviceCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingLog(null)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Editar Usuário"
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Nome de Usuário</label>
            <input
              type="text"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">E-mail</label>
            <input
              type="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Nova Senha (opcional)</label>
            <input
              type="password"
              value={editUserPass}
              onChange={(e) => setEditUserPass(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Nível</label>
            <select
              value={editUserRole}
              onChange={(e) => setEditUserRole(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="user">Usuário (Técnico)</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default App;
