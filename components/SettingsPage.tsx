import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Save, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-800">Profile Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input type="text" defaultValue="Jane Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" defaultValue="jane.doe@lumina.ai" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <input type="text" defaultValue="Senior Analyst" disabled className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-500 cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-sm">Weekly Report Summary</p>
                <p className="text-xs text-slate-500">Receive a PDF summary every Monday morning.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-sm">Anomaly Alerts</p>
                <p className="text-xs text-slate-500">Immediate notification when critical anomalies are detected.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-800">System Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
               <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                 <option>English (US)</option>
                 <option>Spanish</option>
                 <option>French</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
               <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                 <option>Pacific Time (PT)</option>
                 <option>Eastern Time (ET)</option>
                 <option>UTC</option>
               </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm ${saved ? 'bg-success' : 'bg-primary hover:bg-primary/90'}`}
          >
            {saved ? <Check className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saved ? 'Changes Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
