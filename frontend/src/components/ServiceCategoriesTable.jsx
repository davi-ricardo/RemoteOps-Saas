import { usePreferences } from '../contexts/PreferencesContext';

const ServiceCategoriesTable = ({ serviceCategories, onEditCategory, onDeleteCategory }) => {
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
        <h3 className="text-lg font-semibold text-text">Tipos de Serviço</h3>
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
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {serviceCategories.map(category => (
              <tr key={category.id} className="bg-surface hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text">{category.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{category.description || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditCategory(category)}
                      className="px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all border border-border"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="px-3 py-1.5 text-sm text-danger hover:bg-danger/10 rounded-lg transition-all border border-border"
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

export default ServiceCategoriesTable;
