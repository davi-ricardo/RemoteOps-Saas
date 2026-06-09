import { usePreferences } from '../contexts/PreferencesContext';

const GroupsTable = ({ groups, onEditGroup, onDeleteGroup, onViewDevices }) => {
  const { preferences } = usePreferences();

  // Verifica se o tema atual é claro
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  const light = isLightTheme();

  return (
    <div className={`rounded-2xl bg-background-secondary border border-border overflow-hidden transition-all duration-300 ${
      light ? 'shadow-light-box' : ''
    }`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">Lista de Departamentos</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Dispositivos
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {groups.map(group => (
              <tr key={group.id} className="bg-surface hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text">{group.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{group.description || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{group.device_count || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDevices(group.id)}
                      className="px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-all border border-primary/20"
                    >
                      Ver IDs
                    </button>
                    <button
                      onClick={() => onEditGroup(group)}
                      className="px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all border border-border"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteGroup(group.id)}
                      className="px-3 py-1.5 text-sm text-danger hover:bg-danger/10 rounded-lg transition-all border border-danger/20"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupsTable;
