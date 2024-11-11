import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Report.css';

interface Report {
  report_id: number;
  report_file: string;
  report_file_path: string;
  creation_time: string;
}

interface FolderNode {
  key: string;
  label: string;
  children?: FolderNode[];
}

export default function SupersetStyleTable() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<Date[] | null>(null);
  const [activeTab, setActiveTab] = useState('table');
  const [treeData, setTreeData] = useState<FolderNode[]>([]);

  // Fetch reports and directories
  useEffect(() => {
    // Fetch reports data
    fetch('http://localhost:7000/file')
      .then(response => response.json())
      .then(data => {
        setReports(data);
        setFilteredReports(data);
      })
      .catch(error => console.error('Error fetching reports:', error));

    // Fetch directory data
    fetch('http://localhost:7000/dir')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((folder: any) => ({
          key: folder.report_id.toString(),
          label: folder.report_folder,
          children: [],
        }));
        setTreeData(formattedData);
      })
      .catch(error => console.error('Error fetching directories:', error));
  }, []);

  // Update tree data with files based on report_id
  useEffect(() => {
    if (treeData.length > 0 && reports.length > 0) {
      const updatedTreeData = treeData.map(folder => {
        const filesForFolder = reports
          .filter(report => report.report_id.toString() === folder.key)
          .map(report => ({
            key: report.report_file,
            label: report.report_file,
          }));

        return { ...folder, children: filesForFolder };
      });
      setTreeData(updatedTreeData);
    }
  }, [reports, treeData.length]); // Only run this effect when reports change and treeData has been initially set

  const filterReports = () => {
    let filtered = reports;
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.report_file.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.creation_time);
        return reportDate >= startDate && reportDate <= endDate;
      });
    }
    setFilteredReports(filtered);
  };

  useEffect(() => {
    filterReports();
  }, [searchTerm, reports, dateRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(null);
  };

  const creationTimeBodyTemplate = (rowData: Report) => {
    const date = new Date(rowData.creation_time);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const handleReportClick = (report: Report) => {
    const fileExtension = report.report_file.split('.').pop()?.toLowerCase();
    const apiUrl =
      fileExtension === 'png'
        ? 'http://localhost:7000/image'
        : 'http://localhost:7000/pdf';

    const payload = { path: report.report_file_path };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.blob();
        }
      })
      .then(data => {
        if (data instanceof Blob) {
          const url = URL.createObjectURL(data);
          window.open(url, '_blank');
        } else {
          console.log('API JSON response:', data);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const reportFileBodyTemplate = (rowData: Report) => (
    <a
      href="#"
      onClick={() => handleReportClick(rowData)}
      style={{ color: '#1a73e8', cursor: 'pointer' }}
    >
      {rowData.report_file}
    </a>
  );

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="card superset-table">
      <header className="header-container">
        <h4 className="header-title">Reports Viewer</h4>
      </header>
      <div className="controls-container">
        <div className="tab-icons">
          <span
            className={`tab-icon ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            Table View
          </span>
          <span
            className={`tab-icon ${activeTab === 'tree' ? 'active' : ''}`}
            onClick={() => setActiveTab('tree')}
          >
            Tree View
          </span>
        </div>
        <div className="filter-controls">
          <span className="p-float-label">
            <InputText
              id="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <label htmlFor="search">Search by Report Name</label>
          </span>
          <span className="p-float-label date-filter">
            <Calendar
              id="dateRange"
              value={dateRange}
              onChange={e => setDateRange(e.value as Date[])}
              selectionMode="range"
              dateFormat="yy-mm-dd"
              placeholder="Filter by Date Range"
            />
            <label htmlFor="dateRange">Date Range</label>
          </span>

          <Button
            icon="pi pi-times"
            label="Clear Filters"
            onClick={clearFilters}
            className="p-button-text p-button-secondary clear-filters-button"
          />
        </div>
      </div>

      {activeTab === 'table' ? (
        <DataTable
          value={filteredReports}
          paginator
          first={first}
          rows={rows}
          onPage={e => onPageChange(e)}
          sortMode="single"
          tableStyle={{ minWidth: '50rem' }}
          className="superset-data-table"
        >
          <Column
            field="report_file"
            header="Report Name"
            body={reportFileBodyTemplate}
            sortable
          />
          <Column
            field="creation_time"
            header="CreatedAt"
            body={creationTimeBodyTemplate}
            sortable
          />
        </DataTable>
      ) : (
        <Tree value={treeData} />
      )}
    </div>
  );
}
