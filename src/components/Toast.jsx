import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import './Toast.css';

export function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'info':
        return <Info size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  return (
    <div className={`toast-item ${toast.type || 'info'}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        <div className="toast-msg">{toast.message}</div>
      </div>
      <button className="toast-close" onClick={() => onClose(toast.id)}>
        <X size={14} />
      </button>
      <div className="toast-progress">
        <div 
          className="toast-progress-fill" 
          style={{ 
            animation: `shrinkWidth ${toast.duration || 4000}ms linear forwards` 
          }}
        />
      </div>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
