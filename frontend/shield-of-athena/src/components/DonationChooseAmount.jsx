import { useState } from "react";
import { useDonation } from "./DonationForm";

export default function DonationChooseAmount() {
  const { formData, updateFormData, nextStep } = useDonation();
  const presetAmounts = ['10', '25', '50', '100'];
  
  const [currency, setCurrency] = useState(0);
    const currencies = [
    {
        name:"CAD",
        sign:"$"
    },
    {
        name:"USD",
        sign:"$"
    },
    {
        name:"EUR",
        sign:"€"
    },
    {
        name:"GBP",
        sign:"£"
    },

  ]


  const handleNext = () => {
    const finalAmount = formData.customAmount || formData.amount;
    if (!finalAmount || finalAmount === '0') {
      alert('Please select or enter an amount');
      return;
    }
    nextStep();
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g);
    return formatted ? formatted.join(' ') : cleaned;
  };

  return (
    <>  
        <h2 className="section-title">Choose amount</h2>

      <div className="form-container">
        
        <div className="form-row">
          <button
            className={`type-btn ${formData.donationType === 'one-time' ? 'active' : ''}`}
            onClick={() => updateFormData({ donationType: 'one-time' })}
          >
            One-Time
          </button>
          <button
            className={`type-btn ${formData.donationType === 'monthly' ? 'active' : ''}`}
            onClick={() => updateFormData({ donationType: 'monthly' })}
          >
            Monthly 
          </button>
        </div>
        <div className="amount-input">
            <div className='amount-input__left'>
                <span className="currency-symbol">{currencies.at(currency).sign}</span>
                <input
                    name='amount-input'
                    type="text"
                    placeholder="0"
                    value={formData.customAmount || formData.amount}
                    onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    updateFormData({ customAmount: value, amount: '' });
                    }}
                    className="amount-field"
                />                
            </div>
            <select 
                value={currency} 
                onChange={(e) => {
                    updateFormData({currency: currencies.at(e.target.value).name });
                    setCurrency(e.target.value);
            }}
                className="currency-select"
            >
                {
                    currencies.map((curr,idx)=>(
                        <option value={idx} key={idx}>{curr.name}</option>
                    ))
                }
            </select>
        </div>

        <div className="preset-amounts">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              className={`preset-btn ${formData.amount === preset && !formData.customAmount ? 'selected' : ''}`}
              onClick={() => updateFormData({ amount: preset, customAmount: '' })}
            >
            {currencies.at(currency).sign} {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="button-group">
        <button className="btn-cancel" onClick={() => alert('Donation cancelled')}>
          Cancel
        </button>
        <button className="btn-save" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
}