import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import './ChatAssistant.css';

export default function ChatAssistant({ addToast, onFilterUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! Welcome to Aetheria Estates. I'm your digital concierge. How can I assist you with luxury properties today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestions = [
    "Show Penthouses",
    "Book a tour of Aetheria Manor",
    "View pricing metrics",
    "High-end Villas"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // User message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Bot response simulation
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I have noted your request and our premium concierge team is processing it. Would you like to schedule a private call?";
      
      const lower = text.toLowerCase();
      if (lower.includes('penthouse')) {
        replyText = "I have updated the dashboard view to display our exclusive Penthouse suites.";
        onFilterUpdate('Penthouse');
        addToast({
          id: Date.now(),
          type: 'success',
          title: 'Dashboard Updated',
          message: 'Filtered by property type: Penthouses'
        });
      } else if (lower.includes('tour') || lower.includes('book')) {
        replyText = "Excellent selection. I've initiated a priority booking for a private viewing of Aetheria Manor. A dedicated agent will contact you shortly.";
        addToast({
          id: Date.now(),
          type: 'success',
          title: 'Booking Confirmed',
          message: 'Private tour requested for Aetheria Manor'
        });
      } else if (lower.includes('metric') || lower.includes('pricing') || lower.includes('chart')) {
        replyText = "The analytics window shows our market values rising by 12.4% annually. Scroll up to inspect detailed SVG metrics.";
      } else if (lower.includes('villa')) {
        replyText = "Showing our highest-end luxury villas. Feel free to use the sliders to specify location details.";
        onFilterUpdate('Villa');
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="chat-widget">
      <button 
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Concierge Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-toggle-btn open" style={{ width: 40, height: 40, animation: 'none' }}>
              <Bot size={20} />
            </div>
            <div className="chat-header-info">
              <div className="chat-header-title">Aetheria AI</div>
              <div className="chat-header-status">
                <span className="status-dot"></span>
                <span>Active Concierge</span>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-suggestions">
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(sug)}
              >
                {sug}
              </button>
            ))}
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              className="chat-input"
              placeholder="Ask about properties or request tours..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            />
            <button 
              className="chat-send-btn"
              onClick={() => handleSendMessage(inputValue)}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
