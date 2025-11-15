import React, { useState,useContext,createContext } from 'react';
import './css/DonationForm.scss';
import DonationChooseAmount from './DonationChooseAmount';
import DonationDetails from './DonationDetails';
import DonationPayment from './DonationPayment';

// Context for managing form data across steps
const DonationContext = createContext();

export const useDonation = () => {
    const context = useContext(DonationContext);
    if (!context) {
        throw new Error('useDonation must be used within DonationProvider');
    }
    return context;
};

export default function DonationForm() {


    const [formData, setFormData] = useState({
        // Step 1: Amount
        donationType: 'monthly',
        amount: '50',
        customAmount: '',
        currency: 'USD',
        isAnonymous: false,
        donorName: '',
        
        // Step 2: Details
        donorType: 'individual',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        zipCode: '',
        donationFrequency: 'monthly',
        newsletter: true,
        taxReceipt: true,
        
        // Step 3: Payment
        paymentMethod: 'credit-card',
        cardNumber: '',
        cardholderName: '',
        expirationDate: '',
        securityCode: '',
        saveCard: true
    });
    const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 3) setCurrentStep(step);
  };  

  return (
    <DonationContext.Provider value={{ formData, updateFormData, nextStep, prevStep, goToStep, currentStep }}>
        <div className="payment-card">
          <StepIndicator />
          {currentStep === 1 && <DonationChooseAmount />}
          {currentStep === 2 && <DonationDetails />}
          {currentStep === 3 && <DonationPayment />}
        </div>
    </DonationContext.Provider>
  );
}



// Step Indicator Component
function StepIndicator() {
  const { currentStep, goToStep } = useDonation();
  
  const steps = [
    { number: 1, title: 'Choose amount' },
    { number: 2, title: 'Details' },
    { number: 3, title: 'Payment' }
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            onClick={() => currentStep > step.number && goToStep(step.number)}
            style={{ cursor: currentStep > step.number ? 'pointer' : 'default' }}
          >
            <div className="step-circle">
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className="step-title">{step.title}</span>
          </div>
          {index < steps.length - 1 && <div className="step-divider"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}