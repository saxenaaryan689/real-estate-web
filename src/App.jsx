import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Onboarding from './components/Onboarding';
import PropertyFilters from './components/PropertyFilters';
import { PropertyCard, SkeletonCard } from './components/PropertyCard';
import DashboardCharts from './components/DashboardCharts';
import ChatAssistant from './components/ChatAssistant';
import MortgageCalculator from './components/MortgageCalculator';
import ExclusiveServices from './components/ExclusiveServices';
import ContactSection from './components/ContactSection';
import { ToastContainer } from './components/Toast';
import './App.css';

const INITIAL_PROPERTIES = [
  { id: 1, name: "Aetheria Manor", location: "Los Angeles, CA", price: 8500000, type: "Villa", beds: 5, baths: 6, sqft: 8500, image: "/modern_mansion_la.png" },
  { id: 2, name: "Vortex Penthouse", location: "Miami, FL", price: 5200000, type: "Penthouse", beds: 3, baths: 4, sqft: 3400, image: "/modern_penthouse_luxury.png" },
  { id: 3, name: "Solaria Pavilion", location: "Malibu, CA", price: 9800000, type: "Villa", beds: 5, baths: 5, sqft: 7200, image: "/ultra_luxury_villa.png" },
  { id: 4, name: "Lumina Condominium", location: "New York, NY", price: 2800000, type: "Condo", beds: 2, baths: 2, sqft: 1800, image: "/luxury_condominium_ny.png" },
  { id: 5, name: "Aura Townhouses", location: "San Francisco, CA", price: 3500000, type: "Townhouse", beds: 4, baths: 3, sqft: 2900, image: "/modern_townhouse_sf.png" },
  { id: 6, name: "Nebula Heights", location: "Seattle, WA", price: 4100000, type: "Penthouse", beds: 3, baths: 3, sqft: 3100, image: "/modern_penthouse_luxury.png" }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(3);
  
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    beds: 'All',
    maxPrice: 10000000
  });

  // Apply theme to document element and track mouse movements for 3D parallax background
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 35; // depth factor
      const yPercent = (clientY / window.innerHeight - 0.5) * 35;
      
      const s1 = document.querySelector('.mesh-sphere-1');
      const s2 = document.querySelector('.mesh-sphere-2');
      const s3 = document.querySelector('.mesh-sphere-3');
      const cubes = document.querySelector('.grid-3d-wireframe');
      
      if (s1) s1.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
      if (s2) s2.style.transform = `translate(${-xPercent * 1.5}px, ${-yPercent * 1.5}px)`;
      if (s3) s3.style.transform = `translate(${xPercent * 0.8}px, ${-yPercent * 0.8}px)`;
      
      if (cubes) {
        cubes.style.transform = `rotateX(${-yPercent * 0.8}deg) rotateY(${xPercent * 0.8}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate skeleton screen loader on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filters, showFavoritesOnly]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    addToast({
      id: Date.now(),
      type: 'info',
      title: 'Theme Modified',
      message: `Theme set to ${theme === 'dark' ? 'Light Crystal' : 'Dark Space'}`
    });
  };

  const addToast = (toast) => {
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleFavoriteToggle = (id) => {
    let updated;
    const item = properties.find(p => p.id === id);
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
      addToast({
        id: Date.now(),
        type: 'info',
        title: 'Removed Favorite',
        message: `${item.name} removed from your saved list.`
      });
    } else {
      updated = [...favorites, id];
      addToast({
        id: Date.now(),
        type: 'success',
        title: 'Added to Favorites',
        message: `${item.name} is now saved.`
      });
    }
    setFavorites(updated);
  };

  const handleFilterUpdateFromChat = (type) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: 'All',
      beds: 'All',
      maxPrice: 10000000
    });
    setShowFavoritesOnly(false);
    addToast({
      id: Date.now(),
      type: 'info',
      title: 'Filters Reset',
      message: 'Restored default real estate portfolio view.'
    });
  };

  // Filter logic
  const filteredProperties = properties.filter(prop => {
    if (showFavoritesOnly && !favorites.includes(prop.id)) return false;
    if (filters.type !== 'All' && prop.type !== filters.type) return false;
    if (filters.beds !== 'All' && prop.beds !== parseInt(filters.beds) && !(filters.beds === '5' && prop.beds >= 5)) return false;
    if (prop.price > filters.maxPrice) return false;
    if (filters.search) {
      const query = filters.search.toLowerCase();
      return prop.name.toLowerCase().includes(query) || prop.location.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="app-layout">
      {/* 3D background sphere & architectural outline elements */}
      <div className="bg-mesh">
        <div className="mesh-sphere mesh-sphere-1"></div>
        <div className="mesh-sphere mesh-sphere-2"></div>
        <div className="mesh-sphere mesh-sphere-3"></div>
        
        {/* Interactive 3D Architectural grid structures */}
        <div className="grid-3d-wireframe">
          <div className="wireframe-cube cube-1">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
          <div className="wireframe-cube cube-2">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>

      {showOnboarding && (
        <Onboarding 
          theme={theme} 
          setTheme={setTheme} 
          onComplete={() => {
            setShowOnboarding(false);
            addToast({
              id: Date.now(),
              type: 'success',
              title: 'Access Granted',
              message: 'Connected to the luxury real estate network.'
            });
          }} 
        />
      )}

      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        favoritesCount={favorites.length}
        notificationCount={notifications}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      <main className="main-content">
        <div className="welcome-section">
          <h2 className="welcome-title">Aetheria Luxury Homes</h2>
          <p className="welcome-subtitle">Explore elite mansions, penthouses, and properties. Book a private tour today.</p>
        </div>

        {/* Custom SVG Data Visualization charts */}
        <DashboardCharts />

        {/* Real-time search filters */}
        <PropertyFilters 
          filters={filters} 
          setFilters={setFilters} 
          onReset={handleResetFilters} 
        />

        <div className="portfolio-header">
          <h3>Asset Portfolio</h3>
          <span className="portfolio-count">
            Showing {isLoading ? '...' : filteredProperties.length} of {properties.length} Estates
          </span>
        </div>

        {/* Card list with skeleton loader transition */}
        <div className="properties-grid">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map(prop => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                isFavorite={favorites.includes(prop.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onViewDetails={(p) => {
                  addToast({
                    id: Date.now(),
                    type: 'success',
                    title: 'Tour Requested',
                    message: `Private viewing requested for ${p.name}. A representative will call you shortly.`
                  });
                }}
              />
            ))
          ) : (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              No luxury estates match the current parameters. Try resetting filters.
            </div>
          )}
        </div>

        {/* Dynamic Mortgage Estimator tool */}
        <MortgageCalculator />

        {/* Signature VIP services */}
        <ExclusiveServices />

        {/* Contact Inquiry Section */}
        <ContactSection addToast={addToast} />
      </main>

      {/* Floating Chat widget and toast container */}
      <ChatAssistant addToast={addToast} onFilterUpdate={handleFilterUpdateFromChat} />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
