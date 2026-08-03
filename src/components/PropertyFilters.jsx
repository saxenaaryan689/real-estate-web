import React from 'react';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import './PropertyFilters.css';

export default function PropertyFilters({ filters, setFilters, onReset }) {
  const handleTextChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setFilters(prev => ({ ...prev, type: e.target.value }));
  };

  const handleBedsChange = (e) => {
    setFilters(prev => ({ ...prev, beds: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="filters-panel">
      <div className="filters-header">
        <div className="filters-title">
          <SlidersHorizontal size={18} />
          <span>Refine Portfolio</span>
        </div>
        <button className="clear-btn" onClick={onReset}>
          <RefreshCw size={12} />
          <span>Reset View</span>
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Search Location or Name</label>
          <div className="filter-input-wrapper">
            <Search size={16} className="filter-input-icon" />
            <input 
              type="text" 
              className="filter-text-input" 
              placeholder="e.g. Los Angeles, Aetheria Manor..."
              value={filters.search}
              onChange={handleTextChange}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Property Tier</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={filters.type}
              onChange={handleTypeChange}
            >
              <option value="All">All Properties</option>
              <option value="Villa">Luxury Villas</option>
              <option value="Penthouse">Penthouses</option>
              <option value="Condo">Condominiums</option>
              <option value="Townhouse">Townhouses</option>
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Bedrooms</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={filters.beds}
              onChange={handleBedsChange}
            >
              <option value="All">Any Size</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>
        </div>

        <div className="filter-group">
          <div className="price-range-info">
            <span className="filter-label">Max Budget</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
          <input 
            type="range" 
            className="filter-slider" 
            min="1000000" 
            max="10000000" 
            step="500000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
}
