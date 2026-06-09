import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { usePreferences } from '../contexts/PreferencesContext';

const DashboardLayout = ({ activeTab, setActiveTab, currentUser, onLogout, title, children }) => {
  const { preferences } = usePreferences();
  const isSidebarCompact = preferences.sidebar === "compact";

  return (
    <div className="min-h-screen transition-all duration-200">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        isCompact={isSidebarCompact}
      />
      <Topbar title={title} onLogout={onLogout} isSidebarCompact={isSidebarCompact} />
      <main className={`pt-24 min-h-screen p-6 transition-all duration-200 ${isSidebarCompact ? "ml-20" : "ml-64"}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;