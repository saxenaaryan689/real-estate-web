import React, { useState } from 'react';
import { MapPin, BedDouble, Bath, Maximize2, Heart } from 'lucide-react';
import './PropertyCard.css';

export function PropertyCard({ property, onFavoriteToggle, isFavorite, onViewDetails, addToast, setProperties }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Tilt limit to max 12 degrees
    const tiltX = ((centerY - y) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 12;

    setRotate({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="card-perspective">
      <div 
        className="property-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          '--rotate-x': `${rotate.x}deg`,
          '--rotate-y': `${rotate.y}deg`
        }}
      >
        <div className="card-img-area">
          <img 
            src={property.image} 
            alt={property.name} 
            className="property-img" 
          />
          <div className="card-img-overlay">
            <span className="property-badge">{property.type}</span>
            <button 
              className={`property-fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(property.id);
              }}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="card-details">
          <div className="property-location">
            <MapPin size={12} />
            <span>{property.location}</span>
          </div>
          <h4 className="property-name">{property.name}</h4>

          <div className="property-stats">
            <div className="stat-item">
              <BedDouble size={14} />
              <span>{property.beds} Bed</span>
            </div>
            <div className="stat-item">
              <Bath size={14} />
              <span>{property.baths} Bath</span>
            </div>
            <div className="stat-item">
              <Maximize2 size={14} />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          <div className="card-footer">
            <div className="property-price">{formatPrice(property.price)}</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="property-view-btn" onClick={() => onViewDetails(property)}>
                Tour
              </button>
              <button 
                className="property-view-btn" 
                style={{ background: 'var(--accent-gradient)', color: '#fff', borderColor: 'transparent' }}
                onClick={(e) => {
                  e.stopPropagation();
                  const bidAmount = 100000;
                  setProperties(prev => prev.map(p => {
                    if (p.id === property.id) {
                      return { ...p, price: p.price + bidAmount };
                    }
                    return p;
                  }));
                  addToast({
                    id: Date.now(),
                    type: 'success',
                    title: 'Live Bid Placed',
                    message: `Successfully offered ${formatPrice(property.price + bidAmount)} on ${property.name}!`
                  });
                }}
              >
                Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-img"></div>
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text" style={{ width: '70%' }}></div>
        <div className="skeleton-line skeleton-price"></div>
      </div>
    </div>
  );
}
