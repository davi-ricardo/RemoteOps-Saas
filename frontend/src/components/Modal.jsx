const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background-secondary rounded-2xl border border-border p-6 w-full max-w-lg mx-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text">{title}</h3>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover text-text-secondary hover:text-text transition-all"
        >
          ✕
        </button>
      </div>
      {children}
    </div>
    </div>
  );
};

export default Modal;
