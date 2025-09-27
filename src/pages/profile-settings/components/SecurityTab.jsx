import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecurityTab = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [activeSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Bangalore, Karnataka",
      lastActive: "Active now",
      current: true,
      ip: "192.168.1.100"
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Bangalore, Karnataka", 
      lastActive: "2 hours ago",
      current: false,
      ip: "192.168.1.101"
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "Mumbai, Maharashtra",
      lastActive: "1 day ago",
      current: false,
      ip: "203.192.12.45"
    }
  ]);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = async () => {
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const handleTerminateSession = (sessionId) => {
    // Handle session termination
    console.log('Terminating session:', sessionId);
  };

  const handleTerminateAllSessions = () => {
    // Handle terminating all other sessions
    console.log('Terminating all other sessions');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account security and privacy settings
        </p>
      </div>
      {/* Password Change */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Change Password</h4>
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords?.current ? "text" : "password"}
              value={passwordData?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              placeholder="Enter your current password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords?.new ? "text" : "password"}
              value={passwordData?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              placeholder="Enter your new password"
              description="Password must be at least 8 characters with uppercase, lowercase, and numbers"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords?.confirm ? "text" : "password"}
              value={passwordData?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              placeholder="Confirm your new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          <Button
            variant="default"
            onClick={handlePasswordSubmit}
            loading={isChangingPassword}
            iconName="Lock"
            iconPosition="left"
            disabled={!passwordData?.currentPassword || !passwordData?.newPassword || !passwordData?.confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Checkbox
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e?.target?.checked)}
            />
          </div>
        </div>
        
        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <div>
                  <p className="font-medium text-success">2FA is Active</p>
                  <p className="text-sm text-muted-foreground">
                    Your account is protected with SMS-based two-factor authentication
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Smartphone">
                Change Phone Number
              </Button>
              <Button variant="outline" size="sm" iconName="Key">
                View Backup Codes
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                <div>
                  <p className="font-medium text-warning">2FA is Disabled</p>
                  <p className="text-sm text-muted-foreground">
                    Enable two-factor authentication to secure your account
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="default" iconName="Shield">
              Enable 2FA
            </Button>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-foreground">Active Sessions</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Manage devices that are currently signed in to your account
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleTerminateAllSessions}
            iconName="LogOut"
            size="sm"
          >
            Sign Out All
          </Button>
        </div>
        
        <div className="space-y-3">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : 
                          session?.device?.includes('Android') ? 'Smartphone' : 'Monitor'} 
                    size={20} 
                    color="var(--color-muted-foreground)" 
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground flex items-center space-x-2">
                    <span>{session?.device}</span>
                    {session?.current && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session?.location} • {session?.lastActive}
                  </p>
                  <p className="text-xs text-muted-foreground">IP: {session?.ip}</p>
                </div>
              </div>
              
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session?.id)}
                  iconName="X"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Login Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Login Alerts</h4>
        <div className="space-y-4">
          <Checkbox
            label="Email notifications for new logins"
            description="Get notified when someone signs in from a new device"
            checked
            onChange={() => {}}
          />
          
          <Checkbox
            label="SMS alerts for suspicious activity"
            description="Receive SMS alerts for unusual account activity"
            checked
            onChange={() => {}}
          />
          
          <Checkbox
            label="Weekly security summary"
            description="Get a weekly summary of your account security activity"
           
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Account Recovery */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Account Recovery</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Set up recovery options in case you lose access to your account
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} color="var(--color-success)" />
              <div>
                <p className="font-medium text-foreground">Recovery Email</p>
                <p className="text-sm text-muted-foreground">rajesh.recovery@email.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} color="var(--color-success)" />
              <div>
                <p className="font-medium text-foreground">Recovery Phone</p>
                <p className="text-sm text-muted-foreground">+91 ****-***-210</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;