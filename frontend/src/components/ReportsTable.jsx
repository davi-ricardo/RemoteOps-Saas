import { useState, useMemo, useEffect } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';

const ReportsTable = ({ reports, serviceCategories, onClassifyLog, exportMonth, setExportMonth, exportYear, setExportYear, onExportXLS }) => {
  const { preferences } = usePreferences();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = parseInt(preferences.itemsPerPage);

  // Resetar para a página 1 quando a quantidade de itens por página ou a ordenação mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [preferences.itemsPerPage, preferences.defaultSort]);

  // Verifica se o tema atual é claro
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  const light = isLightTheme();

  // Ordenar relatórios (mais novos primeiro por padrão)
  const sortedReports = useMemo(() => {
    const sorted = [...reports].sort((a, b) => {
      if (preferences.defaultSort === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
    return sorted;
  }, [reports, preferences.defaultSort]);

  // Calcular página atual
  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const currentReports = sortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="space-y-6">
      <div className={`rounded-2xl bg-background-secondary border border-border overflow-hidden transition-all duration-300 ${
        light ? 'shadow-light-box' : ''
      }`}>
        <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-text">Histórico de Conexões</h3>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Mês:</label>
            <select
              value={exportMonth}
              onChange={(e) => setExportMonth(e.target.value)}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <label className="text-sm text-text-secondary">Ano:</label>
            <select
              value={exportYear}
              onChange={(e) => setExportYear(e.target.value)}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {[2024, 2025, 2026, 2027, 2028].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <button
              onClick={onExportXLS}
              className="px-4 py-2 bg-gradient-to-r from-success to-emerald-600 hover:opacity-90 text-white rounded-xl text-sm font-medium transition-all border border-success/20"
            >
              Exportar XLS
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Origem (Técnico)
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Destino (Cliente)
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Tipo de Serviço
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Duração
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentReports.map(log => (
                <tr key={log.id} className="bg-surface hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{formatDate(log.timestamp)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{log.from_alias || log.from_device_id || 'Desconhecido'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{log.to_alias || log.to_device_id}</span>
                  </td>
                  <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${log.category_name ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface text-text-muted border-border'}`}>
                    {log.category_name || 'Não classificado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${log.action === 'start' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'}`}>
                    {log.action === 'start' ? 'Iniciada' : 'Finalizada'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{formatDuration(log.duration)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onClassifyLog(log)}
                      className="px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all border border-border"
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
        {/* Paginação */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between bg-surface">
            <div className="text-sm text-text-secondary">
              Mostrando {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, sortedReports.length)} de {sortedReports.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary rounded-lg transition-all border border-border"
              >
                Anterior
              </button>
              {/* Números de página */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all border ${currentPage === page ? 'bg-primary text-white border-primary' : 'bg-surface hover:bg-surface-hover text-text-secondary border-border'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary rounded-lg transition-all border border-border"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTable;
