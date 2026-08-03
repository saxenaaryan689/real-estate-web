import React, { useState } from 'react';
import { Sun, Moon, Layout, Bot, TrendingUp, ArrowRight, Home } from 'lucide-react';
import './Onboarding.css';

export default function Onboarding({ theme, setTheme, onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Experience Luxury Reimagined",
      desc: "Welcome to Aetheria Estates. Walk through our exclusive portfolio of properties using high-fidelity animations, real-time analytics, and visual depth dynamics. Let's configure your visual theme first.",
      element: (
        <div className="onboarding-theme-select">
          <button 
            className={`theme-opt ${theme === 'dark' ? 'selected' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={20} />
            <span>Dark Space</span>
          </button>
          <button 
            className={`theme-opt ${theme === 'light' ? 'selected' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={20} />
            <span>Light Crystal</span>
          </button>
        </div>
      )
    },
    {
      title: "Intelligent Market Dashboards",
      desc: "Explore advanced market metrics and projections directly. Our customizable filters and live-drawn custom SVG trend-lines make real estate investment decisions transparent and beautiful.",
      element: (
        <div className="onboarding-features">
          <div className="onboarding-feat-card">
            <TrendingUp size={24} />
            <span className="onboarding-feat-title">Price Velocity</span>
            <span className="onboarding-feat-desc">Track percentage changes</span>
          </div>
          <div className="onboarding-feat-card">
            <Layout size={24} />
            <span className="onboarding-feat-title">Dynamic Tiles</span>
            <span className="onboarding-feat-desc">Fluid 3D property cards</span>
          </div>
        </div>
      )
    },
    {
      title: "Interactive AI Concierge",
      desc: "Need immediate answers or want to book a tour? Chat with our integrated Aetheria AI assistant. It dynamically changes dashboard trends based on mock searches and answers location questions in real time.",
      element: (
        <div className="onboarding-features">
          <div className="onboarding-feat-card">
            <Bot size={24} />
            <span className="onboarding-feat-title">Instant Agent</span>
            <span className="onboarding-feat-desc">Simulated active responses</span>
          </div>
          <div className="onboarding-feat-card">
            <Home size={24} />
            <span className="onboarding-feat-title">Direct Booking</span>
            <span className="onboarding-feat-desc">Schedule open houses</span>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="onboarding-logo">
          <Home size={32} />
          <span>AETHERIA</span>
        </div>

        <div className="onboarding-step-indicator">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`step-dot ${index === step ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-content">
          <h2 className="onboarding-title">{steps[step].title}</h2>
          <p className="onboarding-desc">{steps[step].desc}</p>
          {steps[step].element}
        </div>

        <button className="onboarding-btn" onClick={handleNext}>
          <span>{step === steps.length - 1 ? "Launch Experience" : "Continue"}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
