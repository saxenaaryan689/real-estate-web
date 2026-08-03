import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Calendar, Landmark } from 'lucide-react';
import './MortgageCalculator.css';

export default function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMonthlyPayment = () => {
    const principal = homeValue - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;

    if (principal <= 0) return 0;
    if (monthlyRate === 0) return principal / totalPayments;

    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    return isNaN(payment) ? 0 : Math.round(payment);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <div className="calc-title-area">
          <Calculator size={22} className="calc-icon" />
          <div>
            <h3>Mortgage & Finance Estimator</h3>
            <span className="calc-subtitle">Estimate monthly plans for luxury acquisitions</span>
          </div>
        </div>
      </div>

      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="calc-input-group">
            <div className="input-label-area">
              <label>Property Price</label>
              <span>{formatCurrency(homeValue)}</span>
            </div>
            <input 
              type="range" 
              className="filter-slider" 
              min="1000000" 
              max="15000000" 
              step="250000"
              value={homeValue} 
              onChange={(e) => setHomeValue(parseInt(e.target.value))} 
            />
          </div>

          <div className="calc-input-group">
            <div className="input-label-area">
              <label>Down Payment</label>
              <span>{formatCurrency(downPayment)}</span>
            </div>
            <input 
              type="range" 
              className="filter-slider" 
              min="100000" 
              max={homeValue - 500000} 
              step="50000"
              value={downPayment} 
              onChange={(e) => setDownPayment(parseInt(e.target.value))} 
            />
          </div>

          <div className="calc-row-inputs">
            <div className="calc-input-subgroup">
              <label>Interest Rate (%)</label>
              <div className="number-input-wrapper">
                <Percent size={14} />
                <input 
                  type="number" 
                  min="0.1" 
                  max="15" 
                  step="0.1" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)} 
                />
              </div>
            </div>

            <div className="calc-input-subgroup">
              <label>Duration (Years)</label>
              <div className="select-wrapper">
                <select value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))}>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="calc-results">
          <div className="result-main-glow">
            <span className="result-label">Estimated Monthly Payment</span>
            <span className="result-value">{formatCurrency(monthlyPayment)}</span>
            <span className="result-details">Principal & Interest only</span>
          </div>

          <div className="calc-summary-metrics">
            <div className="metric-row">
              <div className="metric-lbl">
                <Landmark size={14} />
                <span>Total Loan Amount</span>
              </div>
              <span className="metric-val">{formatCurrency(homeValue - downPayment)}</span>
            </div>
            <div className="metric-row">
              <div className="metric-lbl">
                <Calendar size={14} />
                <span>Total Payments</span>
              </div>
              <span className="metric-val">{loanTerm * 12} Mos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
