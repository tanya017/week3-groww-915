import { IndexItem } from '@/shared/types';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

interface StockIndexProps {
  data: IndexItem[];
  loading: boolean;
  selectedExchange: string;
  setSelectedExchange: Dispatch<SetStateAction<string>>;
}

const StockIndices: React.FC<StockIndexProps> = ({data, loading, selectedExchange, setSelectedExchange}) => {

        const exchangeOptions = useMemo(() => {
          const options = new Set(data.map(item => item.exchange));
          return ['ALL', ...Array.from(options)];
        }, [data]);
      
        const filteredData = useMemo(() => {
          if (selectedExchange === 'ALL') return data;
          return data.filter(item => item.exchange === selectedExchange);
        }, [data, selectedExchange]);
      
        const headers = filteredData.length > 0 
          ? (Object.keys(filteredData[0]) as Array<keyof IndexItem>) 
          : [];
  return (
     <div style={containerStyle}>
      {/* FILTER SECTION */}
      <div style={filterBarStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            SELECT EXCHANGE
          </label>
          <select 
            value={selectedExchange} 
            onChange={(e) => setSelectedExchange(e.target.value)}
            style={dropdownStyle}
          >
            <option value="NSE">NSE (National Stock Exchange)</option>
            <option value="BSE">BSE (Bombay Stock Exchange)</option>
            <option value="MCX">MCX (Multi Commodity Exchange)</option>
            <option value="NCDEX">NCDEX (Agri Derivatives)</option>
            <option value="">ALL INDICES</option>
          </select>
        </div>
        
        {loading && <span style={loadingTextStyle}>Updating data...</span>}
      </div>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead style={stickyHeaderStyle}>
            <tr>
              {headers.map((header) => (
                <th key={header} style={headerStyle}>
                  {header.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className="table-row" style={rowStyle}>
                {headers.map((header) => (
                  <td key={`${idx}-${header}`} style={cellStyle}>
                    {header === 'exchange' ? (
                      <span style={badgeStyle}>{item[header]}</span>
                    ) : (
                      String(item[header])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockIndices;


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  height: '100%',
  padding: '16px'
};

const filterBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 0',
  borderBottom: '1px solid var(--border)'
};

const dropdownStyle: React.CSSProperties = {
  background: 'var(--bg-void, #1a1a1a)',
  color: 'var(--text-main, #fff)',
  border: '1px solid var(--border, #333)',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '12px',
  outline: 'none',
  cursor: 'pointer'
};

const tableWrapperStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'auto',
  border: '1px solid var(--border)',
  borderRadius: '4px'
};

const stickyHeaderStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  backgroundColor: 'var(--bg-panel, #121212)',
  zIndex: 10,
  boxShadow: '0 1px 0 var(--border)'
};

const rowStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--border-subtle, #2a2a2a)'
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '12px',
  fontFamily: 'monospace',
  textAlign: 'left'
};
const cellStyle: React.CSSProperties = {
  padding: "10px 16px",
  whiteSpace: "nowrap",
};

const badgeStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "2px 6px",
  borderRadius: "2px",
  fontSize: "10px",
};
const headerStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "10px",
  color: "var(--text-muted)",
  letterSpacing: "1px",
  fontWeight: "bold",
};
const loadingTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--accent, #00d09c)',
  fontStyle: 'italic'
};