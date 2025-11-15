import { FaAnglesRight } from "react-icons/fa6";
import { useDonation } from "./DonationForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DonationDetails() {
    const { t } = useTranslation();
    const { formData, updateFormData, nextStep, prevStep } = useDonation();

    const handleNext = () => {
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phoneNumber
        ) {
            alert(t("donationForm.details.validation.required"));
            return;
        }
        nextStep();
    };

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return cleaned;
    };

    useEffect(() => {
        // default isAnonymous to false when entering step
        updateFormData({ isAnonymous: false });
    }, [updateFormData]);

    return (
        <>
            <h2 className="section-title">
                {t("donationForm.details.title")}
            </h2>

            <div className="form-container">
                {/* Name row */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.firstName")}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.firstName}
                            onChange={(e) =>
                                updateFormData({ firstName: e.target.value })
                            }
                            placeholder={t("donationForm.details.placeholders.firstName")}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.lastName")}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.lastName}
                            onChange={(e) =>
                                updateFormData({ lastName: e.target.value })
                            }
                            placeholder={t("donationForm.details.placeholders.lastName")}
                        />
                    </div>
                </div>

                {/* Email + phone */}
                <div className="form-row-imbalanced">
                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.email")}
                        </label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => updateFormData({ email: e.target.value })}
                            placeholder={t("donationForm.details.placeholders.email")}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.phone")}
                        </label>
                        <input
                            type="tel"
                            className="form-input"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                updateFormData({
                                    phoneNumber: formatPhoneNumber(
                                        e.target.value.slice(0, 14)
                                    )
                                })
                            }
                            placeholder={t("donationForm.details.placeholders.phone")}
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="form-group">
                    <label className="form-label">
                        {t("donationForm.details.labels.address")}
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.address}
                        onChange={(e) => updateFormData({ address: e.target.value })}
                        placeholder={t("donationForm.details.placeholders.address")}
                    />
                </div>

                {/* City + zip */}
                <div className="form-row-imbalanced">
                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.city")}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.city}
                            onChange={(e) => updateFormData({ city: e.target.value })}
                            placeholder={t("donationForm.details.placeholders.city")}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.details.labels.zip")}
                        </label>
                        <input
                            title="zip_code"
                            type="text"
                            className="form-input"
                            value={formData.zipCode}
                            onChange={(e) =>
                                updateFormData({ zipCode: e.target.value.slice(0, 6) })
                            }
                            placeholder={t("donationForm.details.placeholders.zip")}
                        />
                    </div>
                </div>

                {/* Tax receipt checkbox */}
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={formData.taxReceipt}
                        onChange={(e) =>
                            updateFormData({ taxReceipt: e.target.checked })
                        }
                        className="checkbox-input"
                    />
                    <span className="checkmark-box" />
                    <span className="checkbox-label">
            {t("donationForm.details.taxReceipt")}
          </span>
                </label>
            </div>

            {/* Bottom buttons */}
            <div className="bottom-btns">
                <button
                    type="button"
                    className="bottom-left"
                    onClick={() => {
                        updateFormData({ isAnonymous: true });
                        nextStep();
                    }}
                >
                    <p>{t("donationForm.details.stayAnonymous")}</p>
                    <FaAnglesRight size={12} />
                </button>

                <div className="button-group">
                    <button
                        className="btn-cancel"
                        type="button"
                        onClick={prevStep}
                    >
                        {t("donationForm.common.back")}
                    </button>
                    <button
                        className="btn-save"
                        type="button"
                        onClick={handleNext}
                    >
                        {t("donationForm.common.next")}
                    </button>
                </div>
            </div>
        </>
    );
}
