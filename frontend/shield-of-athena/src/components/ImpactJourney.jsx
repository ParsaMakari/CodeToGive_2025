import React from "react";
import { Heart, FolderOpen, HandFist, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import TimelineStep from "./TimelineStep";
import CampaignProgress from "./CampaignProgress";
import "../css/ImpactJourney.scss";
import LanguageToggle from "./LanguageToggle";

const timelineSteps = [
    {
        icon: Heart,
        titleKey: "impactJourney.steps.1.title",
        descriptionKey: "impactJourney.steps.1.description"
    },
    {
        icon: FolderOpen,
        titleKey: "impactJourney.steps.2.title",
        descriptionKey: "impactJourney.steps.2.description",
        programNameKey: "impactJourney.steps.2.programName"
    },
    {
        icon: HandFist,
        titleKey: "impactJourney.steps.3.title",
        descriptionKey: "impactJourney.steps.3.description"
    },
    {
        icon: TrendingUp,
        titleKey: "impactJourney.steps.4.title",
        descriptionKey: "impactJourney.steps.4.description"
    }
];

function ImpactJourney() {
    const { t } = useTranslation();

    return (
        <div className="impact-page">
            <div className="impact-page-header">
                <div className="impact-header">
                    <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
                        {t("impactJourney.header.title")}
                    </h1>
                    <p
                        className="text-sm font-medium text-muted-foreground tracking-wide uppercase"
                        data-testid="text-top-message"
                    >
                        {t("impactJourney.header.subtitle")}
                    </p>
                </div>

                <LanguageToggle />
            </div>


            <div className="impact-layout">
                <div className="impact-main">
                    <div className="impact-timeline">
                        {timelineSteps.map((step, index) => (
                            <TimelineStep
                                key={step.titleKey}
                                stepNumber={index + 1}
                                totalSteps={timelineSteps.length}
                                icon={step.icon}
                                title={t(step.titleKey)}
                                description={t(step.descriptionKey)}
                                programName={
                                    step.programNameKey ? t(step.programNameKey) : undefined
                                }
                                isLast={index === timelineSteps.length - 1}
                            />
                        ))}
                    </div>

                    <div className="impact-cta-row">
                        {/*<button*/}
                        {/*    className="impact-primary-button"*/}
                        {/*    onClick={() => {*/}
                        {/*        console.log("See full impact journey clicked");*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {t("impactJourney.actions.seeFullJourney")}*/}
                        {/*</button>*/}

                        {/*<button*/}
                        {/*    className="impact-secondary-button"*/}
                        {/*    onClick={() => {*/}
                        {/*        console.log("Back to donation page clicked");*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {t("impactJourney.actions.backToDonation")}*/}
                        {/*</button>*/}
                    </div>
                </div>

                <aside className="impact-sidebar">
                    <CampaignProgress
                        titleKey="impactJourney.progress.title"
                        subtitleKey="impactJourney.progress.subtitle"
                        raisedLabelKey="impactJourney.progress.raisedLabel"
                        goalLabelKey="impactJourney.progress.goalLabel"
                        currentAmount={3250000}
                        goalAmount={5000000}
                    />
                </aside>
            </div>
        </div>
    );
}

export default ImpactJourney;
