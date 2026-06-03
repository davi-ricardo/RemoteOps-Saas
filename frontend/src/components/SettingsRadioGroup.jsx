const SettingsRadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              value === option.value
                ? 'bg-gradient-to-r from-primary to-info text-white shadow-lg'
                : 'bg-surface hover:bg-surface-hover text-text-secondary'
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
