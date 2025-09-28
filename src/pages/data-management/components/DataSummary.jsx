import React from 'react';
import Icon from '../../../components/AppIcon';

const DataSummary = ({ dataSummary, dataTypes }) => {
  const getDataTypeInfo = (typeId) => {
    return dataTypes.find(dt => dt.id === typeId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="BarChart3" size={20} className="mr-2" />
        Data Summary
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(dataSummary).map(([key, summary]) => {
          const dataType = getDataTypeInfo(key);
          return (
            <div key={key} className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={dataType?.icon || 'Database'} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{dataType?.name || key}</h4>
                  <p className="text-sm text-muted-foreground">{summary.count} records</p>
                  <p className="text-xs text-muted-foreground">Updated: {summary.lastUpdated}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSummary;
