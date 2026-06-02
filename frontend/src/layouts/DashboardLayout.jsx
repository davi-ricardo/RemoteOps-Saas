import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = ({ activeTab, setActiveTab, currentUser, onLogout, title, children }) => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      <Topbar title={title} onLogout={onLogout} />
      <main className="ml-64 pt-16 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
