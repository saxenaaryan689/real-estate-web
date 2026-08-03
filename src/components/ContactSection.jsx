import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareCheck } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection({ addToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      if (addToast) {
        addToast({
          id: Date.now(),
          type: 'success',
          title: 'Message Transmitted',
          message: 'Your inquiry has been secured. A VIP agent will respond within 1 hour.'
        });
      }
    }, 1200);
  };

  return (
    <div className="contact-section">
      <div className="contact-grid">
        <div className="contact-info-panel">
          <h3>Connect With Aetheria</h3>
          <p className="contact-desc">
            Inquire about private off-market viewings, contract terms, or asset valuations.
          </p>

          <div className="info-items">
            <div className="info-item">
              <Phone size={18} />
              <div>
                <span className="info-lbl">Private Line</span>
                <span className="info-val">+1 (800) 555-VIP-HOME</span>
              </div>
            </div>

            <div className="info-item">
              <Mail size={18} />
              <div>
                <span className="info-lbl">Secure Email</span>
                <span className="info-val">concierge@aetherialuxury.com</span>
              </div>
            </div>

            <div className="info-item">
              <MapPin size={18} />
              <div>
                <span className="info-lbl">Global Headquarters</span>
                <span className="info-val">8492 Sunset Blvd, Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h4>Inquire About Listings</h4>
          
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Secure Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <textarea 
              placeholder="Specify properties or relocation requirements..."
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>

          <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Transmitting...</span>
            ) : (
              <>
                <span>Send Secure Inquiry</span>
                <Send size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
