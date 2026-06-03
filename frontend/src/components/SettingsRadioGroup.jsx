const SettingsRadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              value === option.value
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsRadioGroup;
