import React, { useState } from "react";
import "./css/PaymentSettings.scss";
import { FaApple, FaGoogle, FaPaypal } from "react-icons/fa";
import { useDonation } from "./DonationForm";
import { useTranslation } from "react-i18next";
import axios from "axios";
import PopupWindow from "./PopupWindow";
import DonationCompletion from "./DonationCompletion";
import WelcomeScreen from "./WelcomeScreen";
import { useAuth } from "../context/authContext";

export default function DonationPayment() {
    const { t } = useTranslation();
    const { formData, updateFormData, prevStep } = useDonation();
    const [isOpenPopup,setIsOpenPopup] = useState(false);
    const {user} = useAuth();

    const handleSubmit = async () => {
        if (
            !formData.isAnonymous &&
            (!formData.cardNumber ||
                !formData.cardholderName ||
                !formData.expirationDate ||
                !formData.securityCode)
        ) {
            alert(t("donationForm.payment.validation.required"));
            return;
        }

        handleApiCall(formData);
    };

    const handleApiCall = async () => {
        try {
            const finalAmount = formData.customAmount || formData.amount;

            const payload = {
                amount: finalAmount,
                currency: formData.currency,
                is_recurring: formData.donationType==="monthly"? true : false,
                message: "donation",
                user:user
            };

            const response = await axios.post("http://localhost:8000/api/donations/", payload)

            if (response.status===201) {
                const typeLabel =
                    formData.donationType === "monthly"
                        ? t("donationForm.payment.type.monthly")
                        : t("donationForm.payment.type.oneTime");
                setIsOpenPopup(true)
            } else {
                alert(t("donationForm.payment.alert.error"));
            }
        } catch (err) {
            console.error(err);
            alert(t("donationForm.payment.alert.error"));
        }
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, "");
        const formatted = cleaned.match(/.{1,4}/g);
        return formatted ? formatted.join(" ") : cleaned;
    };

    const formatExpiration = (value) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + " / " + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const totalAmount = formData.customAmount || formData.amount;

    return (
        <>
            <PopupWindow isOpen={isOpenPopup} onClose={()=>setIsOpenPopup(false)}>
                <DonationCompletion onClose={()=>setIsOpenPopup(false)}/>
            </PopupWindow>

            <h2 className="section-title">
                {t("donationForm.payment.title")}
            </h2>

            {/* Payment methods */}
            <div className="payment-methods">
                <button
                    type="button"
                    className={`method-btn ${
                        formData.paymentMethod === "credit-card" ? "active" : ""
                    }`}
                    onClick={() =>
                        updateFormData({ paymentMethod: "credit-card" })
                    }
                >
                    {t("donationForm.payment.methods.creditCard")}
                </button>

                <button
                    type="button"
                    className={`method-btn icon-btn ${
                        formData.paymentMethod === "paypal" ? "active" : ""
                    }`}
                    onClick={() =>
                        updateFormData({ paymentMethod: "paypal" })
                    }
                    aria-label={t("donationForm.payment.methods.paypal")}
                >
                    <FaPaypal size={24} />
                </button>

                <button
                    type="button"
                    className={`method-btn icon-btn ${
                        formData.paymentMethod === "apple" ? "active" : ""
                    }`}
                    onClick={() =>
                        updateFormData({ paymentMethod: "apple" })
                    }
                    aria-label={t("donationForm.payment.methods.applePay")}
                >
                    <FaApple size={24} />
                </button>

                <button
                    type="button"
                    className={`method-btn icon-btn ${
                        formData.paymentMethod === "google" ? "active" : ""
                    }`}
                    onClick={() =>
                        updateFormData({ paymentMethod: "google" })
                    }
                    aria-label={t("donationForm.payment.methods.googlePay")}
                >
                    <FaGoogle size={24} />
                </button>
            </div>

            {/* Payment fields */}
            <div className="form-container">
                <div className="form-group">
                    <label className="form-label">
                        {t("donationForm.payment.labels.cardNumber")}
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.cardNumber}
                        onChange={(e) =>
                            updateFormData({
                                cardNumber: formatCardNumber(
                                    e.target.value.slice(0, 19)
                                )
                            })
                        }
                        placeholder={t(
                            "donationForm.payment.placeholders.cardNumber"
                        )}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        {t("donationForm.payment.labels.cardholderName")}
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.cardholderName}
                        onChange={(e) =>
                            updateFormData({ cardholderName: e.target.value })
                        }
                        placeholder={t(
                            "donationForm.payment.placeholders.cardholderName"
                        )}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.payment.labels.expirationDate")}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.expirationDate}
                            onChange={(e) =>
                                updateFormData({
                                    expirationDate: formatExpiration(
                                        e.target.value.slice(0, 7)
                                    )
                                })
                            }
                            placeholder={t(
                                "donationForm.payment.placeholders.expirationDate"
                            )}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            {t("donationForm.payment.labels.securityCode")}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.securityCode}
                            onChange={(e) =>
                                updateFormData({
                                    securityCode: e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 4)
                                })
                            }
                            placeholder={t(
                                "donationForm.payment.placeholders.securityCode"
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="bottom-btns">
                <div className="amount-donation">
                    <p>
                        {t("donationForm.payment.summary.total")}{" "}
                        {totalAmount} {formData.currency}
                    </p>

                    <p className="payment-type">
                        {t("donationForm.payment.summary.type", {
                            type:
                                formData.donationType === "monthly"
                                    ? t("donationForm.payment.type.monthly")
                                    : t("donationForm.payment.type.oneTime")
                        })}
                    </p>
                </div>

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
                        onClick={handleSubmit}
                    >
                        {t("donationForm.common.donate")}
                    </button>
                </div>
            </div>
        </>
    );
}
