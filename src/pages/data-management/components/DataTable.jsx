import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataTable = ({ currentData, dataTypes, onDataUpdate, onFileSelect, selectedFile }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleCellEdit = (dataType, rowIndex, column, value) => {
    setEditingCell({ dataType, rowIndex, column });
    setEditValue(value);
  };

  const handleCellSave = (dataType, rowIndex, column) => {
    if (editingCell) {
      const newData = [...currentData[dataType]];
      newData[rowIndex][column] = editValue;
      onDataUpdate(dataType, newData);
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleAddRow = (dataType) => {
    const data = currentData[dataType] || [];
    if (data.length === 0) return;

    const newRow = {};
    Object.keys(data[0]).forEach(key => {
      newRow[key] = '';
    });

    const newData = [...data, newRow];
    onDataUpdate(dataType, newData);
  };

  const handleDeleteRow = (dataType, rowIndex) => {
    const newData = currentData[dataType].filter((_, index) => index !== rowIndex);
    onDataUpdate(dataType, newData);
  };

  const getDataTypeInfo = (typeId) => {
    return dataTypes.find(dt => dt.id === typeId);
  };

  const formatValue = (value, column) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    if (column.toLowerCase().includes('date')) {
      return new Date(value).toLocaleDateString();
    }
    if (column.toLowerCase().includes('amount') || column.toLowerCase().includes('₹')) {
      return `₹${value}`;
    }
    return value;
  };

  const renderCell = (dataType, rowIndex, column, value) => {
    const isEditing = editingCell?.dataType === dataType && 
                     editingCell?.rowIndex === rowIndex && 
                     editingCell?.column === column;

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCellSave(dataType, rowIndex, column);
              } else if (e.key === 'Escape') {
                handleCellCancel();
              }
            }}
            onBlur={() => handleCellSave(dataType, rowIndex, column)}
          />
          <Button
            variant="ghost"
            size="xs"
            onClick={() => handleCellSave(dataType, rowIndex, column)}
            iconName="Check"
          />
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCellCancel}
            iconName="X"
          />
        </div>
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded"
        onClick={() => handleCellEdit(dataType, rowIndex, column, value)}
      >
        {formatValue(value, column)}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Data Type Selector */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Table" size={20} className="mr-2" />
          Data Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataTypes.map((dataType) => {
            const data = currentData[dataType.id] || [];
            const isSelected = selectedFile === dataType.id;
            
            return (
              <div
                key={dataType.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/20'
                }`}
                onClick={() => onFileSelect(dataType.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    data.length > 0 ? 'bg-primary/10' : 'bg-muted/50'
                  }`}>
                    <Icon 
                      name={dataType.icon} 
                      size={20} 
                      className={data.length > 0 ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">{dataType.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {data.length} records
                    </p>
                    {dataType.required && (
                      <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Table */}
      {selectedFile && currentData[selectedFile] && currentData[selectedFile].length > 0 && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Table" size={20} className="text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {getDataTypeInfo(selectedFile)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentData[selectedFile].length} records
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddRow(selectedFile)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Row
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {Object.keys(currentData[selectedFile][0]).map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border"
                    >
                      {column}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData[selectedFile].map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-muted/20">
                    {Object.entries(row).map(([column, value]) => (
                      <td
                        key={column}
                        className="px-4 py-3 text-sm text-foreground border-b border-border"
                      >
                        {renderCell(selectedFile, rowIndex, column, value)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-sm text-foreground border-b border-border">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleDeleteRow(selectedFile, rowIndex)}
                          iconName="Trash2"
                          className="text-error hover:text-error hover:bg-error/10"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedFile && (!currentData[selectedFile] || currentData[selectedFile].length === 0) && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="Database" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Data Available</h3>
          <p className="text-muted-foreground mb-4">
            Upload a CSV file to start managing your {getDataTypeInfo(selectedFile)?.name.toLowerCase()} data.
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
          >
            Upload Data
          </Button>
        </div>
      )}

      {/* No Selection State */}
      {!selectedFile && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="MousePointer" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select a Data Type</h3>
          <p className="text-muted-foreground">
            Choose a data type from the grid above to view and edit its data.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
