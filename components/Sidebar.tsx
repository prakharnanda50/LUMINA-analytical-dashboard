import React from 'react';
import { LayoutDashboard, FileText, Lightbulb, Settings, LogOut, PieChart } from 'lucide-react';
import { AppSection } from '../types';

interface SidebarProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { label: AppSection.OVERVIEW, icon: LayoutDashboard },
    { label: AppSection.REPORTS, icon: FileText },
    { label: AppSection.INSIGHTS, icon: Lightbulb },
    { label: AppSection.SETTINGS, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20 shadow-sm">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <PieChart className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-primary tracking-tight">Lumina</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            JD
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700">Jane Doe</p>
            <p className="text-xs text-slate-400">Senior Analyst</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>
    </aside>
  );
};
