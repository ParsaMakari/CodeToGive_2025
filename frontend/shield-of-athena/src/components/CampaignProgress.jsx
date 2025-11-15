import React from "react";
import { Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../css/CampaignProgress.scss";

function formatCompactCurrency(amount, decimals = 2, currency = '$') {
    if (amount == null || Number.isNaN(Number(amount))) return '';
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(Number(amount));
    const units = [
        { value: 1e9, suffix: 'B' },
        { value: 1e6, suffix: 'M' },
        { value: 1e3, suffix: 'K' },
    ];

    for (const u of units) {
        if (abs >= u.value) {
            let num = (abs / u.value).toFixed(decimals);
            // remove trailing zeros and optional trailing dot
            num = num.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1');
            return `${sign}${currency}${num}${u.suffix}`;
        }
    }

    // below 1000: show no decimals and localized thousands separator
    return `${sign}${currency}${abs.toLocaleString('en-CA', { maximumFractionDigits: 0 })}`;
}


function CampaignProgress({
                              titleKey,
                              subtitleKey,
                              raisedLabelKey,
                              goalLabelKey,
                              currentAmount,
                              goalAmount,
                          }) {
    const { t } = useTranslation();
    const progress = Math.min((currentAmount / goalAmount) * 100, 100);

    return (
        <div className="impact-progress-card">
            <h2>{t(titleKey)}</h2>

            {subtitleKey && (
                <p className="impact-progress-subtitle">
                    {t(subtitleKey)}
                </p>
            )}

            <div className="impact-progress-bar">
                <div
                    className="impact-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="impact-progress-stats">
                <div>
          <span className="impact-progress-label">
            {t(raisedLabelKey)}
          </span>
                    <span className="impact-progress-value">
            {formatCompactCurrency(currentAmount)}
          </span>
                </div>
                <div>
          <span className="impact-progress-label">
            {t(goalLabelKey)}
          </span>
                    <span className="impact-progress-value">
            {formatCompactCurrency(goalAmount)}
          </span>
                </div>
            </div>

            <button
                className="share-button"
                onClick={() => {
                    if (navigator.share) {
                        navigator
                            .share({
                                title: t("impactJourney.title"),
                                text: t("impactJourney.actions.shareButton"),
                                url: window.location.href,
                            })
                            .catch(() => {});
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert(t("impactJourney.actions.shareCopied"));
                    }
                }}
                data-testid="button-share-support"
            >
        <span className="share-icon">
          <Share2 className="w-4 h-4" />
        </span>
                {t("impactJourney.actions.shareButton")}
            </button>
        </div>
    );
}

export default CampaignProgress;
