const GroupsTable = ({ groups, onEditGroup, onDeleteGroup, onViewDevices }) => {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">Lista de Departamentos</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/30">
            <tr>
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
              <tr key={group.id} className="hover:bg-surface/30 transition-colors">
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
                      className="px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-all"
                    >
                      Ver IDs
                    </button>
                    <button
                      onClick={() => onEditGroup(group)}
                      className="px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteGroup(group.id)}
                      className="px-3 py-1.5 text-sm text-danger hover:bg-danger/10 rounded-lg transition-all"
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
