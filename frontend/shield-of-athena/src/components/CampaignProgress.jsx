import React from "react";
import { Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../css/CampaignProgress.scss";

function formatCurrency(amount) {
    return `$${amount.toLocaleString("en-CA", {
        maximumFractionDigits: 0
    })}`;
}

function CampaignProgress({
                              titleKey,
                              subtitleKey,
                              raisedLabelKey,
                              goalLabelKey,
                              currentAmount,
                              goalAmount
                          }) {
    const { t } = useTranslation();
    const progress = Math.min((currentAmount / goalAmount) * 100, 100);

    return (
        <div className="impact-progress-card">
            <h2>{t(titleKey)}</h2>

            <p className="impact-progress-subtitle">
                {t(subtitleKey)}
            </p>

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
            {formatCurrency(currentAmount)}
          </span>
                </div>
                <div>
          <span className="impact-progress-label">
            {t(goalLabelKey)}
          </span>
                    <span className="impact-progress-value">
            {formatCurrency(goalAmount)}
          </span>
                </div>
            </div>

            <button
                className="share-button"
                onClick={() => {
                    if (navigator.share) {
                        navigator
                            .share({
                                title: t("impactJourney.progress.title"),
                                text: t("impactJourney.actions.shareButton"),
                                url: window.location.href
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
