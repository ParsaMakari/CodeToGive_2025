import { FaAnglesRight } from "react-icons/fa6";
import { useDonation } from "./DonationForm";
import { useEffect } from "react";

export default function DonationDetails() {
  const { formData, updateFormData, nextStep, prevStep } = useDonation();

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
    nextStep();
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return cleaned;
  };

  useEffect(()=>{
    updateFormData({isAnonymous:false});
    console.log(formData.isAnonymous)
  },[])

  return (
    <>
      <h2 className="section-title">Your Informations</h2>

      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              placeholder="John"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="form-row-imbalanced">
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData({ phoneNumber: formatPhoneNumber(e.target.value.slice(0, 14)) })}
              placeholder="(555) 123-4567"
            />
          </div>          
        </div>



        <div className="form-group">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            className="form-input"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="123 Main Street"
          />
        </div>

        <div className="form-row-imbalanced">
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-input"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="New York"
            />
          </div>

          <div className="form-group">
            <label className="form-label">ZIP Code</label>
            <input
              title="zip_code"
              type="text"
              className="form-input"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value.slice(0, 6) })}
              placeholder="J10RK1"
            />
          </div>
        </div>

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={formData.taxReceipt}
            onChange={(e) => updateFormData({ taxReceipt: e.target.checked })}
            className="checkbox-input"
          />
          <span className="checkmark-box"></span>
          <span className="checkbox-label">Send me tax receipts for donations</span>
        </label>
      </div>

    <div className="bottom-btns">
      <div className="bottom-left" onClick={()=>{
            updateFormData({isAnonymous:true});
            nextStep();
            }}>
        <p>Stay Annonymous</p>
        <FaAnglesRight size={12}/>
      </div>
      <div className="button-group">
          <button className="btn-cancel" onClick={prevStep}>
            Back
          </button>
          <button className="btn-save" onClick={handleNext}>
            Next
          </button>
      </div>
    </div>

    </>
  );
}