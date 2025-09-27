import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      tooltip: 'Financial overview and insights'
    },
    { 
      label: 'Documents', 
      path: '/document-upload', 
      icon: 'Upload',
      tooltip: 'Upload and manage financial documents'
    },
    { 
      label: 'Tax Calculator', 
      path: '/tax-calculator', 
      icon: 'Calculator',
      tooltip: 'Calculate taxes and compare regimes'
    },
    { 
      label: 'Credit Analysis', 
      path: '/credit-score-analysis', 
      icon: 'TrendingUp',
      tooltip: 'CIBIL score insights and recommendations'
    },
    { 
      label: 'Reports', 
      path: '/financial-reports', 
      icon: 'FileText',
      tooltip: 'Generate and download financial reports'
    }
  ];

  const moreMenuItems = [
    { 
      label: 'Profile Settings', 
      path: '/profile-settings', 
      icon: 'Settings',
      tooltip: 'Manage account and preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Calculator" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">TaxWise</span>
    </div>
  );

  const NotificationBadge = ({ count }) => (
    count > 0 && (
      <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
        {count > 9 ? '9+' : count}
      </span>
    )
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle ${className}`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth focus-ring ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
                {item?.path === '/dashboard' && <NotificationBadge count={notifications} />}
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-ring">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                {moreMenuItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-muted transition-smooth ${
                      isActivePath(item?.path) ? 'bg-muted text-primary' : 'text-popover-foreground'
                    }`}
                    title={item?.tooltip}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-ring"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
            <div className="relative bg-card border-b border-border shadow-elevated animate-slide-in">
              <nav className="px-4 py-4 space-y-1">
                {[...navigationItems, ...moreMenuItems]?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                    {item?.path === '/dashboard' && <NotificationBadge count={notifications} />}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
      {/* Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <Button
          variant="default"
          size="lg"
          onClick={() => handleNavigation('/document-upload')}
          className="rounded-full shadow-elevated hover:shadow-lg transition-all duration-200 bg-primary hover:bg-primary/90"
          iconName="Plus"
          iconSize={20}
        >
          <span className="hidden sm:inline ml-2">Upload</span>
        </Button>
      </div>
      {/* Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 z-30">
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;