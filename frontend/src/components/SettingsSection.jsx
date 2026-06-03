const SettingsSection = ({ icon, title, children }) => {
  return (
    <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SettingsSection;
