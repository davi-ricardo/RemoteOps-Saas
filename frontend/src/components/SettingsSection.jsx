const SettingsSection = ({ icon, title, children }) => {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SettingsSection;
