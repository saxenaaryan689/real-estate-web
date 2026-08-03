import React, { useState } from 'react';
import { ShieldCheck, Award, Key, Sparkles, Building2, Flame } from 'lucide-react';
import './ExclusiveServices.css';

export default function ExclusiveServices() {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      icon: <Award size={28} />,
      title: "VIP Acquisitions",
      desc: "Access off-market estates and private penthouses before they reach public listing boards."
    },
    {
      id: 2,
      icon: <ShieldCheck size={28} />,
      title: "Legal & Escrow",
      desc: "Complete documentation and premium transaction processing securement through legal experts."
    },
    {
      id: 3,
      icon: <Key size={28} />,
      title: "Turnkey Relocation",
      desc: "Private jets, secure transport, and immediate designer interior staging for smooth transitions."
    }
  ];

  return (
    <div className="services-section">
      <div className="services-header">
        <Sparkles size={20} className="header-sparkle" />
        <h3>VIP Signature Services</h3>
        <p className="services-subtitle">Bespoke assistance for elite homebuyers and high-net-worth investors</p>
      </div>

      <div className="services-cards-grid">
        {services.map((svc) => (
          <div 
            key={svc.id}
            className={`service-card ${activeCard === svc.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard(svc.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="service-icon-wrapper">
              {svc.icon}
            </div>
            <h4 className="service-card-title">{svc.title}</h4>
            <p className="service-card-desc">{svc.desc}</p>
            <div className="service-hover-indicator" />
          </div>
        ))}
      </div>
    </div>
  );
}
