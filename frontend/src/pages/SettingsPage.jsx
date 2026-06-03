import { useState, useEffect } from "react";
import api from "../services/api";
import SettingsSection from "../components/SettingsSection";
import SettingsRadioGroup from "../components/SettingsRadioGroup";
import SettingsToggle from "../components/SettingsToggle";
import Modal from "../components/Modal";
import { usePreferences } from "../contexts/PreferencesContext";

const SettingsPage = ({ currentUser, setCurrentUser }) => {
  // App info state
  const [appInfo, setAppInfo] = useState(null);
  const { preferences, savePreferences } = usePreferences();

  // User profile state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    cargo: currentUser?.cargo || "",
    avatar_url: currentUser?.avatar_url || "",
  });

  // Change password state
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load app info
  useEffect(() => {
    const loadAppInfo = async () => {
      try {
        const response = await api.get("/api/app-info");
        setAppInfo(response.data);
      } catch (err) {
        console.error("Failed to load app info:", err);
      }
    };
    loadAppInfo();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/users/me", profileForm);
      setCurrentUser(response.data.user);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      setEditingProfile(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Erro ao atualizar perfil");
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      await api.put("/api/users/me/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Senha alterada com sucesso!");
    } catch (err) {
      console.error("Failed to change password:", err);
      alert("Erro ao alterar senha: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <SettingsSection icon="👤" title="Perfil">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-2xl font-bold text-white">
            {currentUser?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-text">
              {currentUser?.username || "Usuário"}
            </h4>
            <p className="text-sm text-text-secondary">{currentUser?.email}</p>
            {currentUser?.cargo && (
              <p className="text-sm text-text-secondary">{currentUser.cargo}</p>
            )}
            <p className="text-xs text-text-muted capitalize mt-1">
              {currentUser?.role}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditingProfile(true)}
            className="px-4 py-2 bg-surface hover:bg-surface-hover text-text-secondary rounded-xl font-medium transition-all"
          >
            Editar Perfil
          </button>
        </div>
      </SettingsSection>



      {/* Security Section */}
      <SettingsSection icon="🔐" title="Segurança">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setChangingPassword(true)}
            className="w-full text-left px-4 py-3 bg-surface hover:bg-surface-hover rounded-xl text-text-secondary font-medium transition-all"
          >
            Alterar Senha
          </button>

          {currentUser?.last_login && (
            <div className="text-sm text-text-secondary">
              <p>
                Último login:{" "}
                <span className="text-text-secondary">
                  {new Date(currentUser.last_login).toLocaleString("pt-BR")}
                </span>
              </p>
            </div>
          )}
        </div>
      </SettingsSection>

      {/* Notifications Section */}
      <SettingsSection icon="🔔" title="Notificações">
        <SettingsToggle
          label="Novo relatório criado"
          checked={preferences.notifNewReport}
          onChange={(checked) =>
            savePreferences({ notifNewReport: checked })
          }
        />
        <SettingsToggle
          label="Atualizações do sistema"
          checked={preferences.notifSystemUpdates}
          onChange={(checked) =>
            savePreferences({ notifSystemUpdates: checked })
          }
        />
        <SettingsToggle
          label="Avisos administrativos"
          checked={preferences.notifAdminAlerts}
          onChange={(checked) =>
            savePreferences({ notifAdminAlerts: checked })
          }
        />
        <SettingsToggle
          label="Alterações de permissões"
          checked={preferences.notifPermissionChanges}
          onChange={(checked) =>
            savePreferences({ notifPermissionChanges: checked })
          }
        />
      </SettingsSection>

      {/* Preferences Section */}
      <SettingsSection icon="🖥️" title="Preferências">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Página Inicial
            </label>
            <select
              value={preferences.homePage}
              onChange={(e) =>
                savePreferences({ homePage: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="home">Dashboard</option>
              <option value="devices">Dispositivos</option>
              <option value="reports">Relatórios</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Itens por Página
            </label>
            <select
              value={preferences.itemsPerPage}
              onChange={(e) =>
                savePreferences({ itemsPerPage: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Ordenação Padrão
            </label>
            <select
              value={preferences.defaultSort}
              onChange={(e) =>
                savePreferences({ defaultSort: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="newest">Mais recentes primeiro</option>
              <option value="oldest">Mais antigos primeiro</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      {/* About Section */}
      {appInfo && (
        <SettingsSection icon="ℹ️" title="Sobre">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-text-secondary">
              <p className="text-text-secondary font-semibold">
                {appInfo.name}
              </p>
              <p className="text-text-muted">Versão {appInfo.version}</p>
            </div>
            <div className="text-sm text-text-secondary">
              <p>Frontend: <span className="text-text-secondary">{appInfo.frontend}</span></p>
              <p>Backend: <span className="text-text-secondary">{appInfo.backend}</span></p>
              <p>Banco de Dados: <span className="text-text-secondary">{appInfo.database}</span></p>
              <p>Última Atualização: <span className="text-text-secondary">{appInfo.lastUpdated}</span></p>
            </div>
          </div>
        </SettingsSection>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editingProfile}
        onClose={() => setEditingProfile(false)}
        title="Editar Perfil"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Nome de Usuário</label>
            <input
              type="text"
              value={profileForm.username}
              onChange={(e) =>
                setProfileForm({ ...profileForm, username: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">E-mail</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Cargo</label>
            <input
              type="text"
              value={profileForm.cargo}
              onChange={(e) =>
                setProfileForm({ ...profileForm, cargo: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">URL do Avatar (opcional)</label>
            <input
              type="text"
              value={profileForm.avatar_url}
              onChange={(e) =>
                setProfileForm({ ...profileForm, avatar_url: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingProfile(false)}
              className="flex-1 py-2 bg-surface hover:bg-surface-hover text-text-secondary rounded-xl font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-gradient-to-r from-primary to-info text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={changingPassword}
        onClose={() => setChangingPassword(false)}
        title="Alterar Senha"
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Senha Atual</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Nova Senha</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Confirmar Nova Senha</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setChangingPassword(false)}
              className="flex-1 py-2 bg-surface hover:bg-surface-hover text-text-secondary rounded-xl font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-gradient-to-r from-primary to-info text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Alterar Senha
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SettingsPage;