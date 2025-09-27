import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PersonalInfoTab = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@email.com",
    mobile: "+91 9876543210",
    panNumber: "ABCDE1234F",
    dateOfBirth: "1985-06-15",
    gender: "male",
    address: {
      street: "123, MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setPersonalInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setPersonalInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    setPersonalInfo({
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@email.com",
      mobile: "+91 9876543210",
      panNumber: "ABCDE1234F",
      dateOfBirth: "1985-06-15",
      gender: "male",
      address: {
        street: "123, MG Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001"
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal details and contact information
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      {/* Profile Picture Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">Profile Picture</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a profile picture to personalize your account
            </p>
            <div className="flex space-x-2 mt-3">
              <Button variant="outline" size="sm" iconName="Upload">
                Upload Photo
              </Button>
              <Button variant="ghost" size="sm" iconName="Trash2">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Basic Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Basic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={personalInfo?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={personalInfo?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={personalInfo?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            description="Used for important notifications and login"
            required
          />
          <Input
            label="Mobile Number"
            type="tel"
            value={personalInfo?.mobile}
            onChange={(e) => handleInputChange('mobile', e?.target?.value)}
            disabled={!isEditing}
            description="Include country code (+91)"
            required
          />
          <Input
            label="PAN Number"
            type="text"
            value={personalInfo?.panNumber}
            onChange={(e) => handleInputChange('panNumber', e?.target?.value?.toUpperCase())}
            disabled={!isEditing}
            description="10-digit alphanumeric PAN card number"
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            maxLength={10}
            required
          />
          <Input
            label="Date of Birth"
            type="date"
            value={personalInfo?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <div className="md:col-span-1">
            <Select
              label="Gender"
              options={genderOptions}
              value={personalInfo?.gender}
              onChange={(value) => handleInputChange('gender', value)}
              disabled={!isEditing}
              required
            />
          </div>
        </div>
      </div>
      {/* Address Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Address Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Street Address"
              type="text"
              value={personalInfo?.address?.street}
              onChange={(e) => handleInputChange('address.street', e?.target?.value)}
              disabled={!isEditing}
              placeholder="House/Flat No., Street Name"
              required
            />
          </div>
          <Input
            label="City"
            type="text"
            value={personalInfo?.address?.city}
            onChange={(e) => handleInputChange('address.city', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <div>
            <Select
              label="State"
              options={stateOptions}
              value={personalInfo?.address?.state?.toLowerCase()?.replace(' ', '-')}
              onChange={(value) => {
                const stateName = stateOptions?.find(s => s?.value === value)?.label || value;
                handleInputChange('address.state', stateName);
              }}
              disabled={!isEditing}
              searchable
              required
            />
          </div>
          <Input
            label="PIN Code"
            type="text"
            value={personalInfo?.address?.pincode}
            onChange={(e) => handleInputChange('address.pincode', e?.target?.value)}
            disabled={!isEditing}
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="6-digit PIN code"
            required
          />
        </div>
      </div>
      {/* Verification Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Verification Status</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <div>
                <p className="font-medium text-success">Email Verified</p>
                <p className="text-sm text-muted-foreground">Verified on 15 Sep 2024</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <div>
                <p className="font-medium text-success">Mobile Verified</p>
                <p className="text-sm text-muted-foreground">Verified on 15 Sep 2024</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
              <div>
                <p className="font-medium text-warning">PAN Verification Pending</p>
                <p className="text-sm text-muted-foreground">Required for tax calculations</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Verify Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;