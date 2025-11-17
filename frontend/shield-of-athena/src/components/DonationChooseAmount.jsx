import { useEffect, useState } from "react";
import { useDonation } from "./DonationForm";
import { useTranslation } from "react-i18next";
import { MdEmergency, MdNightShelter} from "react-icons/md";
import { FaChildReaching, FaGraduationCap } from "react-icons/fa6";

export default function DonationChooseAmount() {
    const { t } = useTranslation();
    const { formData, updateFormData, clearFormData, nextStep } = useDonation();
    const presetAmounts = ["10", "25", "50", "100"];

    const [currency, setCurrency] = useState(0);
    const currencies = [
        { name: "CAD", sign: "$" },
        { name: "USD", sign: "$" },
        { name: "EUR", sign: "€" },
        { name: "GBP", sign: "£" }
    ];
    const [resultMetric,setResultMetric] = useState(1);


    const goodCauses = [
        {
            title:t("donationForm.amount.goodCauses.causes.emergencyAndSafety"),
            icon:<MdNightShelter/>,
            baseMonthyAmounImpact:4,
            baseUniqueAmounImpact:2,
            rephrase:"a shelter",
        },
        {
            title:t("donationForm.amount.goodCauses.causes.counsel&Healing"),
            icon:<MdEmergency/>,
            baseMonthyAmounImpact:2,
            baseUniqueAmounImpact:1,
            rephrase:"healthcare",
        },
        {
            title:t("donationForm.amount.goodCauses.causes.childrenAndYouth"),
            icon:<FaChildReaching/>,
            baseMonthyAmounImpact:5,
            baseUniqueAmounImpact:3,
            rephrase:"secutity",
            
        },
        {
            title:t("donationForm.amount.goodCauses.causes.communityEducation"),
            icon:<FaGraduationCap/>,
            baseMonthyAmounImpact:4,
            baseUniqueAmounImpact:2,
            rephrase:"education",
        }                
    ]

    const handleNext = () => {
        const finalAmount = formData.customAmount || formData.amount;
        if (!finalAmount || finalAmount === "0") {
            alert(t("donationForm.amount.validation.noAmount"));
            return;
        }
        nextStep();
    };

    const calculateResultMetric= ()=>{

        const amount = formData.amount || formData.customAmount;
        let baseAmountImpact = 1;

        if(formData.donationType === "monthly"){
            baseAmountImpact = goodCauses.find((cause)=>cause.title===formData.selectedCause)?.baseMonthyAmounImpact
        }else{
            baseAmountImpact = goodCauses.find((cause)=>cause.title===formData.selectedCause)?.baseUniqueAmounImpact;
        }
        
        return Math.floor((amount*baseAmountImpact)/10)
    }

    useEffect(()=>{
        const result_metric = calculateResultMetric();
        setResultMetric(result_metric);
    },[formData])

    return (
        <>
            <h2 className="section-title">
                {t("donationForm.amount.title")}
            </h2>

            <div className="form-container">
                {/* Donation type toggle */}
                <div className="form-row">
                    <button
                        className={`type-btn ${
                            formData.donationType === "one-time" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => updateFormData({ donationType: "one-time" })}
                    >
                        {t("donationForm.amount.type.oneTime")}
                    </button>
                    <button
                        className={`type-btn ${
                            formData.donationType === "monthly" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => updateFormData({ donationType: "monthly" })}
                    >
                        {t("donationForm.amount.type.monthly")}
                    </button>
                </div>

                {/* Amount input */}
                <div className="amount-input">
                    <div className="amount-input__left">
            <span className="currency-symbol">
              {currencies.at(currency).sign}
            </span>
                        <input
                            name="amount-input"
                            type="text"
                            placeholder="0"
                            value={formData.customAmount || formData.amount}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "");
                                updateFormData({ customAmount: value, amount: "" });
                            }}
                            className="amount-field"
                            aria-label={t("donationForm.amount.aria.amount")}
                        />
                    </div>

                    <select
                        value={currency}
                        onChange={(e) => {
                            const idx = Number(e.target.value);
                            updateFormData({ currency: currencies.at(idx).name });
                            setCurrency(idx);
                        }}
                        className="currency-select"
                        aria-label={t("donationForm.amount.aria.currency")}
                    >
                        {currencies.map((curr, idx) => (
                            <option value={idx} key={idx}>
                                {curr.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Preset amounts */}
                <div className="preset-amounts">
                    {presetAmounts.map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            className={`preset-btn ${
                                formData.amount === preset && !formData.customAmount
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                updateFormData({ amount: preset, customAmount: "" })
                            }
                        >
                            {currencies.at(currency).sign} {preset}
                        </button>
                    ))}
                </div>
                <div className="form-group">
                    <label className="form-label">
                        {t("donationForm.amount.goodCauses.title")}
                    </label>
                    <select 
                        value={formData.selectedCause}
                        onChange={(e) => {updateFormData({ selectedCause: e.target.value })}}
                        className="form-selection"
                        >
                        <option value={""} >
                            Select an option
                        </option>
                        {goodCauses.map((cause,i)=>(
                            <option value={cause.title} 
                                    key = {i}
                                    type="button"
                                className={`form-selection-grid-item ${
                                formData.selectedCause === cause.title
                                    ? "item-selected"
                                    : ""
                            }`}
                            >
                                {cause.title}
                            </option>
                        ))}
                    </select>
                </div>

                {  formData.selectedCause != "" &&
                    <div className="form-group impact-goup">
                        <div className="form-selection-grid-icon">
                            {goodCauses.find((c)=>c.title === formData.selectedCause).icon}
                        </div>
                        <label className="form-label impact-label">
                            Give 
                            <b>
                            {" " + resultMetric.toString() + " " }
                            {
                            formData.selectedCause===t("donationForm.amount.goodCauses.causes.childrenAndYouth")?
                                "young people "
                            :
                                "people "
                            }                            
                            </b>

                            Access to 
                            {
                                " " + goodCauses.find((c)=>c.title === formData.selectedCause).rephrase
                            }
                            
                        </label>                    
                    </div>
                }

            </div>

            {/* Bottom buttons */}
            <div className="button-group">
                <button
                    className="btn-cancel"
                    type="button"
                    onClick={() => {
                        alert(t("donationForm.amount.cancelMessage"));
                        clearFormData();
                    }}
                >
                    {t("donationForm.common.cancel")}
                </button>
                <button
                    className="btn-save"
                    type="button"
                    onClick={handleNext}
                >
                    {t("donationForm.common.next")}
                </button>
            </div>
        </>
    );
}
