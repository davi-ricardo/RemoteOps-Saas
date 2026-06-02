const ReportsTable = ({ reports, serviceCategories, onClassifyLog, exportMonth, setExportMonth, exportYear, setExportYear, onExportXLS }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Cuiaba',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (duration) => {
    if (!duration || duration <= 0) return '-';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
      <div className="p-6 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Histórico de Conexões</h3>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-400">Mês:</label>
          <select
            value={exportMonth}
            onChange={(e) => setExportMonth(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <label className="text-sm text-slate-400">Ano:</label>
          <select
            value={exportYear}
            onChange={(e) => setExportYear(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {[2024, 2025, 2026, 2027, 2028].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            onClick={onExportXLS}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white rounded-xl text-sm font-medium transition-all"
          >
            Exportar XLS
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Data/Hora
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Origem (Técnico)
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Destino (Cliente)
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Tipo de Serviço
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Ação
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Duração
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {reports.map(log => (
              <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{formatDate(log.timestamp)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{log.from_alias || log.from_device_id || 'Desconhecido'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{log.to_alias || log.to_device_id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${log.category_name ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                    {log.category_name || 'Não classificado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${log.action === 'start' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {log.action === 'start' ? 'Iniciada' : 'Finalizada'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{formatDuration(log.duration)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onClassifyLog(log)}
                      className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-all"
                    >
                      Classificar
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

export default ReportsTable;
