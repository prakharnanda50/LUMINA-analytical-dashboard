import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ReportsPage } from './components/ReportsPage';
import { DeepInsightsPage } from './components/DeepInsightsPage';
import { SettingsPage } from './components/SettingsPage';
import { AppSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.OVERVIEW:
        return <Dashboard />;
      case AppSection.REPORTS:
        return <ReportsPage />;
      case AppSection.INSIGHTS:
        return <DeepInsightsPage />;
      case AppSection.SETTINGS:
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans flex">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
