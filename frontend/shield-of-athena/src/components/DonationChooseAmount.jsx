import { useState } from "react";
import { useDonation } from "./DonationForm";
import { useTranslation } from "react-i18next";
import { MdHealthAndSafety, MdOutlineCastForEducation, MdOutlineChildCare, MdOutlineEmergency, MdOutlineHealthAndSafety } from "react-icons/md";

export default function DonationChooseAmount() {
    const { t } = useTranslation();
    const { formData, updateFormData, nextStep } = useDonation();

    const presetAmounts = ["10", "25", "50", "100"];

    const [currency, setCurrency] = useState(0);
    const currencies = [
        { name: "CAD", sign: "$" },
        { name: "USD", sign: "$" },
        { name: "EUR", sign: "€" },
        { name: "GBP", sign: "£" }
    ];

    const goodCauses = [
        {
            title:t("donationForm.amount.goodCauses.causes.emergencyAndSafety"),
            icon:<MdOutlineEmergency/>
        },
        {
            title:t("donationForm.amount.goodCauses.causes.counsel&Healing"),
            icon:<MdOutlineHealthAndSafety/>
        },
        {
            title:t("donationForm.amount.goodCauses.causes.childrenAndYouth"),
            icon:<MdOutlineChildCare/>
        },
        {
            title:t("donationForm.amount.goodCauses.causes.communityEducation"),
            icon:<MdOutlineCastForEducation/>
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
                    <div className="form-selection-grid">
                        {goodCauses.map((cause,i)=>(
                            <button key={cause.title} 
                                    type="button"
                                className={`form-selection-grid-item ${
                                formData.selectedCause === cause.title
                                    ? "item-selected"
                                    : ""
                            }`}
                            onClick={() => {updateFormData({ selectedCause: cause.title }) ; console.log(cause.title)}}
                            >
                                <div className="form-selection-grid-icon">
                                    {cause.icon}
                                </div>
                                {cause.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom buttons */}
            <div className="button-group">
                <button
                    className="btn-cancel"
                    type="button"
                    onClick={() => alert(t("donationForm.amount.cancelMessage"))}
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
