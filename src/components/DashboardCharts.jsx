import React, { useState, useRef } from 'react';
import './DashboardCharts.css';

// Line chart coordinates mapping (relative to 400x180 canvas coordinate space)
const lineData = [
  { label: 'Jan', value: 1200000, x: 20, y: 150 },
  { label: 'Feb', value: 1450000, x: 80, y: 130 },
  { label: 'Mar', value: 1300000, x: 140, y: 140 },
  { label: 'Apr', value: 1750000, x: 200, y: 90 },
  { label: 'May', value: 1980000, x: 260, y: 65 },
  { label: 'Jun', value: 2400000, x: 320, y: 25 },
  { label: 'Jul', value: 2550000, x: 380, y: 15 }
];

export function PriceVelocityChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, value: 0 });

  // Generate cubic bezier curve connection command
  const getCurvePath = () => {
    let path = `M ${lineData[0].x} ${lineData[0].y}`;
    for (let i = 0; i < lineData.length - 1; i++) {
      const curr = lineData[i];
      const next = lineData[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp1y = curr.y;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      const cp2y = next.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const getAreaPath = () => {
    const curve = getCurvePath();
    const first = lineData[0];
    const last = lineData[lineData.length - 1];
    return `${curve} L ${last.x} 170 L ${first.x} 170 Z`;
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-area">
          <h3>Market Valuation Trend</h3>
          <span className="chart-subtitle">Average luxury home values (last 7 months)</span>
          <span className="chart-metric">{formatPrice(2550000)}</span>
        </div>
        <span className="chart-badge">+12.4% Growth</span>
      </div>

      <div className="svg-chart-container">
        {hoveredIndex !== null && (
          <div 
            className="chart-tooltip"
            style={{ 
              left: `${(tooltipPos.x / 400) * 100}%`, 
              top: `${(tooltipPos.y / 180) * 100}%` 
            }}
          >
            <div className="tooltip-lbl">{lineData[hoveredIndex].label}</div>
            <div className="tooltip-val">{formatPrice(tooltipPos.value)}</div>
          </div>
        )}

        <svg viewBox="0 0 400 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="30" x2="380" y2="30" className="chart-grid-line" />
          <line x1="20" y1="75" x2="380" y2="75" className="chart-grid-line" />
          <line x1="20" y1="120" x2="380" y2="120" className="chart-grid-line" />
          <line x1="20" y1="165" x2="380" y2="165" className="chart-grid-line" />

          {/* Area under curve */}
          <path d={getAreaPath()} className="chart-area-path" />

          {/* Glowing Bezier Path */}
          <path d={getCurvePath()} className="chart-line-path" />

          {/* Interactive dots */}
          {lineData.map((d, index) => (
            <circle
              key={index}
              cx={d.x}
              cy={d.y}
              r={index === hoveredIndex ? 7 : 4}
              className="chart-dot"
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                setTooltipPos({ x: d.x, y: d.y, value: d.value });
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}

          {/* X axis labels */}
          {lineData.map((d, index) => (
            <text
              key={index}
              x={d.x}
              y="178"
              className="chart-axis-text"
              textAnchor="middle"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// Donut segments data
const donutSegments = [
  { label: 'Condominiums', count: 18, color: '#6366f1', percent: 36, offset: 0 },
  { label: 'Luxury Villas', count: 14, color: '#a855f7', percent: 28, offset: 36 },
  { label: 'Penthouses', count: 10, color: '#ec4899', percent: 20, offset: 64 },
  { label: 'Townhouses', count: 8, color: '#10b981', percent: 16, offset: 84 }
];

export function AssetDistributionChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Circle circumference properties for standard radius 50: C = 2 * PI * r = 2 * 3.14159 * 50 = 314.16
  const c = 314.16;

  const totalProperties = donutSegments.reduce((sum, s) => sum + s.count, 0);
  const activeSegment = hoveredIndex !== null ? donutSegments[hoveredIndex] : null;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-area">
          <h3>Properties Available</h3>
          <span className="chart-subtitle">Active premium listings by category</span>
        </div>
      </div>

      <div className="donut-chart-container">
        <div className="donut-svg-wrapper">
          <svg viewBox="0 0 120 120">
            {donutSegments.map((segment, index) => {
              const strokeDash = (segment.percent / 100) * c;
              const strokeOffset = c - (segment.offset / 100) * c;

              return (
                <circle
                  key={index}
                  cx="60"
                  cy="60"
                  r="50"
                  className="donut-segment"
                  stroke={segment.color}
                  strokeDasharray={`${strokeDash} ${c - strokeDash}`}
                  strokeDashoffset={strokeOffset}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
          <div className="donut-center-text">
            <div className="donut-center-num">
              {activeSegment ? activeSegment.count : totalProperties}
            </div>
            <div className="donut-center-lbl">
              {activeSegment ? activeSegment.label.split(' ')[0] : 'Assets'}
            </div>
          </div>
        </div>

        <div className="chart-legends">
          {donutSegments.map((segment, index) => (
            <div 
              key={index} 
              className="legend-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1, cursor: 'pointer' }}
            >
              <div className="legend-color" style={{ backgroundColor: segment.color }} />
              <span>{segment.label} ({segment.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardCharts() {
  return (
    <div className="charts-grid">
      <PriceVelocityChart />
      <AssetDistributionChart />
    </div>
  );
}
