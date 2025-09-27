import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import FinancialPreferencesTab from './components/FinancialPreferencesTab';
import SecurityTab from './components/SecurityTab';
import DataManagementTab from './components/DataManagementTab';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      component: PersonalInfoTab
    },
    {
      id: 'financial',
      label: 'Financial Preferences',
      icon: 'Settings',
      component: FinancialPreferencesTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecurityTab
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      component: DataManagementTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component || PersonalInfoTab;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-card border border-border rounded-lg p-2 sticky top-24">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth text-left ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        color={activeTab === tab?.id ? 'currentColor' : 'var(--color-muted-foreground)'} 
                      />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden col-span-1">
              <div className="bg-card border border-border rounded-lg p-2 mb-6">
                <div className="flex overflow-x-auto space-x-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={16} 
                        color={activeTab === tab?.id ? 'currentColor' : 'var(--color-muted-foreground)'} 
                      />
                      <span className="whitespace-nowrap">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6">
                  <ActiveComponent />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Accordion Navigation (Alternative) */}
          <div className="lg:hidden mt-8">
            <div className="bg-card border border-border rounded-lg">
              {tabs?.map((tab) => {
                const TabComponent = tab?.component;
                const isActive = activeTab === tab?.id;
                
                return (
                  <div key={tab?.id} className="border-b border-border last:border-b-0">
                    <button
                      onClick={() => setActiveTab(isActive ? '' : tab?.id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted transition-smooth"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={tab?.icon} 
                          size={20} 
                          color={isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                        />
                        <span className={`font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {tab?.label}
                        </span>
                      </div>
                      <Icon 
                        name={isActive ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        color="var(--color-muted-foreground)" 
                      />
                    </button>
                    {isActive && (
                      <div className="px-6 pb-6 animate-slide-in">
                        <TabComponent />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Help Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-muted/50 border border-border rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have questions about your account settings or need assistance with any features, 
                our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-smooth">
                  <Icon name="MessageCircle" size={16} />
                  <span>Contact Support</span>
                </button>
                <button className="inline-flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-smooth">
                  <Icon name="Book" size={16} />
                  <span>Help Center</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;