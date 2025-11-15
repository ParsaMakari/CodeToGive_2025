import React, { useState } from 'react';
import './css/PaymentSettings.css';
import { FaApple, FaGoogle, FaMoneyBill, FaPaypal } from 'react-icons/fa';
import { useDonation } from './DonationForm';

/**
 * Last step of the donation process, the user confirm the payment method
 * @returns 
 */
export default function DonationPayment() {
  const { formData, updateFormData, prevStep } = useDonation();

  const handleSubmit = async () => {
    if (!formData.isAnonymous && (!formData.cardNumber || !formData.cardholderName || !formData.expirationDate || !formData.securityCode)) {
      alert('Please fill in all payment details');
      return;
    }
  
    handleApiCall(formData);
  };


  const handleApiCall = async(formData)=>{

    // fields = ["id", "amount", "currency", "is_recurring", "date", "user", "impact_pathway_slug","message"]
    try{
      const finalAmount = formData.customAmount || formData.amount;

      const payload = {
        amount:finalAmount,
        currency:formData.currency,
        is_recurring:(formData.donationType),
        message:"",
      }

      const response = await fetch("http://127.0.0.1:8000" + "/api/donations/",{
          method:"POST",
          body:JSON.stringify(payload),
      });

      if(response.ok){
        console.log(response.message)

        // Thak you message here
        alert(`Thank you for your ${formData.donationType} donation of $${finalAmount} 
          ${formData.currency}!\n\nDonation Summary:\nName: ${formData.firstName} 
          ${formData.lastName}\nEmail: ${formData.email}\nAmount: $${finalAmount} ${formData.currency}`);        
      }
    }catch(err){
      console.log(err.message)
    }
  }

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g);
    return formatted ? formatted.join(' ') : cleaned;
  };

  const formatExpiration = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + ' / ' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
      <>
        <h2 className="section-title">Payment Settings</h2>

        <div className="payment-methods">
          <button
            className={`method-btn ${formData.paymentMethod === 'credit-card' ? 'active' : ''}`}
            onClick={() => updateFormData({ paymentMethod: 'credit-card' })}
          >
            Credit Card
          </button>
          <button
            className={`method-btn icon-btn ${formData.paymentMethod === 'paypal' ? 'active' : ''}`}
            onClick={() => updateFormData({ paymentMethod: 'paypal' })}
          >
            <FaPaypal size={24}/>
          </button>
          <button
            className={`method-btn icon-btn ${formData.paymentMethod === 'apple' ? 'active' : ''}`}
            onClick={() => updateFormData({ paymentMethod: 'apple' })}
          >
            <FaApple size={24}/>
          </button>
          <button
            className={`method-btn icon-btn ${formData.paymentMethod === 'google' ? 'active' : ''}`}
            onClick={() => updateFormData({ paymentMethod: 'google' })}
          >
            <FaGoogle size={24}/>
          </button>
        </div>

        <div className="form-container">
          <div className="form-group">
            <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.cardNumber}
                onChange={(e) => updateFormData({ cardNumber: formatCardNumber(e.target.value.slice(0, 19)) })}
                placeholder="1234 5678 9012 3456"
              />
          </div>

          <div className="form-group">
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.cardholderName}
              onChange={(e) => updateFormData({ cardholderName: e.target.value })}
              placeholder="As shown on card"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiration Date</label>
              <input
                type="text"
                className="form-input"
                value={formData.expirationDate}
                onChange={(e) => updateFormData({ expirationDate: formatExpiration(e.target.value.slice(0, 7)) })}
                placeholder="MM / YY"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Security Code</label>
              <input
                type="text"
                className="form-input"
                value={formData.securityCode}
                onChange={(e) => updateFormData({ securityCode: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="CVV"
              />
            </div>
          </div>
        </div>

      <div className='bottom-btns'>
        <div className="amount-donation">
          <p>Total: {formData.amount || formData.customAmount} {formData.currency}</p>

          <p className='payment-type'>
            * {formData.donationType[0].toUpperCase()+formData.donationType.substring(1)} Payment
          </p>
        </div>
        <div className="button-group">
          <button className="btn-cancel" onClick={prevStep}>
            Back
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            Donate
          </button>
        </div>

      </div>
      </>
  );
}