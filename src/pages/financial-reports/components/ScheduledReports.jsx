import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduledReports = ({ schedules, onAddSchedule, onToggleSchedule, onDeleteSchedule }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    reportType: 'tax-summary',
    frequency: 'monthly',
    email: '',
    includeCharts: true,
    format: 'pdf'
  });

  const reportTypeOptions = [
    { value: 'tax-summary', label: 'Tax Summary' },
    { value: 'spending-analysis', label: 'Spending Analysis' },
    { value: 'credit-insights', label: 'Credit Insights' },
    { value: 'financial-comparison', label: 'Multi-Year Comparison' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Format' },
    { value: 'excel', label: 'Excel Format' }
  ];

  const handleAddSchedule = () => {
    if (newSchedule?.email && newSchedule?.reportType && newSchedule?.frequency) {
      onAddSchedule({
        ...newSchedule,
        id: Date.now(),
        isActive: true,
        nextRun: getNextRunDate(newSchedule?.frequency)
      });
      setNewSchedule({
        reportType: 'tax-summary',
        frequency: 'monthly',
        email: '',
        includeCharts: true,
        format: 'pdf'
      });
      setShowAddForm(false);
    }
  };

  const getNextRunDate = (frequency) => {
    const now = new Date();
    switch (frequency) {
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, 1);
      case 'quarterly':
        return new Date(now.getFullYear(), now.getMonth() + 3, 1);
      case 'yearly':
        return new Date(now.getFullYear() + 1, 3, 1); // April 1st for FY
      default:
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getReportTypeLabel = (type) => {
    return reportTypeOptions?.find(option => option?.value === type)?.label || type;
  };

  const getFrequencyLabel = (frequency) => {
    return frequencyOptions?.find(option => option?.value === frequency)?.label || frequency;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground">Automatically generate and email reports</p>
          </div>
          <Button
            variant="default"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconSize={16}
          >
            Add Schedule
          </Button>
        </div>
      </div>
      {showAddForm && (
        <div className="p-6 border-b border-border bg-muted/30">
          <h4 className="font-medium text-foreground mb-4">Create New Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Report Type"
              options={reportTypeOptions}
              value={newSchedule?.reportType}
              onChange={(value) => setNewSchedule({ ...newSchedule, reportType: value })}
            />
            <Select
              label="Frequency"
              options={frequencyOptions}
              value={newSchedule?.frequency}
              onChange={(value) => setNewSchedule({ ...newSchedule, frequency: value })}
            />
            <Input
              label="Email Address"
              type="email"
              value={newSchedule?.email}
              onChange={(e) => setNewSchedule({ ...newSchedule, email: e?.target?.value })}
              placeholder="your.email@example.com"
              required
            />
            <Select
              label="Format"
              options={formatOptions}
              value={newSchedule?.format}
              onChange={(value) => setNewSchedule({ ...newSchedule, format: value })}
            />
          </div>
          <div className="mb-4">
            <Checkbox
              label="Include charts and visualizations"
              checked={newSchedule?.includeCharts}
              onChange={(e) => setNewSchedule({ ...newSchedule, includeCharts: e?.target?.checked })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="default" onClick={handleAddSchedule}>
              Create Schedule
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="divide-y divide-border">
        {schedules?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">No Scheduled Reports</h4>
            <p className="text-muted-foreground">
              Set up automatic report generation to receive regular financial updates via email.
            </p>
          </div>
        ) : (
          schedules?.map((schedule) => (
            <div key={schedule?.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    schedule?.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name="Calendar" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {getReportTypeLabel(schedule?.reportType)} - {getFrequencyLabel(schedule?.frequency)}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Email: {schedule?.email}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Next run: {formatDate(schedule?.nextRun)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        schedule?.isActive 
                          ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                      }`}>
                        {schedule?.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleSchedule(schedule?.id)}
                    iconName={schedule?.isActive ? "Pause" : "Play"}
                    iconSize={14}
                  >
                    {schedule?.isActive ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSchedule(schedule?.id)}
                    iconName="Trash2"
                    iconSize={14}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduledReports;