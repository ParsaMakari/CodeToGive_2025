import React, { useEffect, useState } from "react";
import { Heart, FolderOpen, HandFist, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import TimelineStep from "./TimelineStep";
import CampaignProgress from "./CampaignProgress";
import { fetchImpactJourney } from "../api/impactJourney";
import "../css/ImpactJourney.scss";

const STEP_ICON_MAP = {
  DONATION_RECEIVED: Heart,
  FUNDS_ALLOCATED: FolderOpen,
  IMMEDIATE_IMPACT: HandFist,
  LONG_TERM_IMPACT: TrendingUp,
};

function ImpactJourney({
  amount = 100,
  pathwaySlug = "emergency-shelter-safety",
}) {
  const { t, i18n } = useTranslation();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchImpactJourney({
          amount,
          pathway: pathwaySlug,
          lang: i18n.language || "en",
        });
        if (isMounted) setJourney(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Error loading impact journey");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [amount, pathwaySlug, i18n.language]);

  if (loading) {
    return (
      <div className="impact-page">
        <p>{t("impactJourney.loading")}</p>
      </div>
    );
  }

  if (error || !journey) {
    return (
      <div className="impact-page">
        <p>{t("impactJourney.error", { message: error || "Unknown error" })}</p>
      </div>
    );
  }

  const { campaign, steps, pathway } = journey;

  return (
    <div className="impact-page">
      <div className="impact-page-header">
        <div className="impact-header">
            <div className="impact-header-title-group">
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
                {t("impactJourney.title")}
            </h1>
                <p
                    className="text-sm font-medium text-muted-foreground tracking-wide uppercase"
                    data-testid="text-top-message"
                >
                    {t("impactJourney.subtitle")}
                </p>
            </div>
        </div>
      </div>

      <div className="impact-layout">
        <div className="impact-main">
          <div className="impact-timeline">
            {steps.map((step, index) => {
              const Icon = STEP_ICON_MAP[step.code] ?? Heart;
              const isLast = index === steps.length - 1;

              return (
                <TimelineStep
                  key={step.code + index}
                  stepNumber={index + 1}
                  totalSteps={steps.length}
                  icon={Icon}
                  title={t(`impactJourney.steps.${step.code}.title`)}
                  description={t(
                    `impactJourney.steps.${step.code}.description`,
                    {
                      amount: journey.donation.amount,
                    },
                  )}
                  programName={
                    step.programCode
                      ? t(`impactJourney.programs.${step.programCode}`, {
                          defaultValue: "",
                        })
                      : null
                  }
                  isLast={isLast}
                />
              );
            })}
          </div>

          <div className="impact-cta-row">
            {/* extra buttons later if you want */}
          </div>
        </div>

        <aside className="impact-sidebar">
          <CampaignProgress
            titleKey="impactJourney.campaign.title"
            subtitleKey="impactJourney.campaign.subtitle"
            raisedLabelKey="impactJourney.campaign.raisedLabel"
            goalLabelKey="impactJourney.campaign.goalLabel"
            currentAmount={campaign.currentAmount}
            goalAmount={campaign.goalAmount}
          />
        </aside>
      </div>
    </div>
  );
}

export default ImpactJourney;
