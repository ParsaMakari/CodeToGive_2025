import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";
import ImpactAreaCard from "./ImpactAreaCard";
import GivingPreferenceChip from "./GivingPreferenceChip";
import MatchResultCard from "./MatchResultCard";
import ProgressIndicator from "./ProgressIndicator";
import ConfettiEffect from "./Confetti";
import {
    Baby,
    Home,
    Scale,
    ShoppingBag,
    Heart,
    Users,
    DollarSign,
    Calendar,
    Gift,
    Package,
    HandHeart,
    Megaphone,
    ArrowLeft,
    Loader2,
} from "lucide-react";
import "../css/Matcher.scss";
import { useTranslation } from "react-i18next";

const impactAreas = [
    { id: "children", icon: Baby },
    { id: "housing", icon: Home },
    { id: "legal", icon: Scale },
    { id: "essentials", icon: ShoppingBag },
    { id: "mothers", icon: Heart },
    { id: "newcomers", icon: Users },
];

const givingPreferences = [
    { id: "onetime", icon: DollarSign },
    { id: "monthly", icon: Calendar },
    { id: "adopt", icon: Gift },
    { id: "inkind", icon: Package },
    { id: "volunteer", icon: HandHeart },
    { id: "advocacy", icon: Megaphone },
];

const matchPrograms = [
    {
        id: "children_program",
        area: "children",
        baseScore: 96,
    },
    {
        id: "housing_program",
        area: "housing",
        baseScore: 93,
    },
    {
        id: "legal_program",
        area: "legal",
        baseScore: 91,
    },
];

function Matcher() {
    const [step, setStep] = useState("welcome");
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    const toggleArea = (id) => {
        setSelectedAreas((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const togglePreference = (id) => {
        setSelectedPreferences((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleNextFromValues = () => {
        if (selectedAreas.length > 0) setStep("preferences");
    };

    const pickMatchProgram = () => {
        // Prefer programs whose area is in the selected areas
        const relevantAreas =
            selectedAreas.length > 0 ? selectedAreas : impactAreas.map((a) => a.id);

        const candidates = matchPrograms.filter((p) =>
            relevantAreas.includes(p.area)
        );

        const pool = candidates.length > 0 ? candidates : matchPrograms;

        // Simple deterministic-ish “random” using lengths as a seed
        const seed =
            selectedAreas.join("").length + selectedPreferences.join("").length || 1;
        const index = seed % pool.length;

        return pool[index];
    };

    const handleNextFromPreferences = () => {
        if (selectedPreferences.length === 0) return;

        const chosenMatch = pickMatchProgram();
        setSelectedMatchId(chosenMatch.id);

        setStep("loading");
        setTimeout(() => {
            setStep("results");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1200);
        }, 1600);
    };

    const getCurrentStepNumber = () => {
        if (step === "values") return 1;
        if (step === "preferences") return 2;
        if (step === "loading" || step === "results") return 3;
        return 0;
    };

    const currentStepNumber = getCurrentStepNumber();
    const totalSteps = 3;
    const percentComplete =
        currentStepNumber > 0
            ? Math.round((currentStepNumber / totalSteps) * 100)
            : 0;

    // Small per-language labels for the progress bar
    const stepLabelMap = {
        en: `Step ${currentStepNumber} of ${totalSteps}`,
        fr: `Étape ${currentStepNumber} sur ${totalSteps}`,
        es: `Paso ${currentStepNumber} de ${totalSteps}`,
        it: `Passaggio ${currentStepNumber} di ${totalSteps}`,
        de: `Schritt ${currentStepNumber} von ${totalSteps}`,
        ru: `Шаг ${currentStepNumber} из ${totalSteps}`,
    };

    const completeLabelMap = {
        en: `${percentComplete}% Complete`,
        fr: `${percentComplete} % complété`,
        es: `${percentComplete} % completado`,
        it: `${percentComplete} % completato`,
        de: `${percentComplete} % abgeschlossen`,
        ru: `${percentComplete} % выполнено`,
    };

    const stepLabel = stepLabelMap[currentLang] || stepLabelMap.en;
    const completeLabel =
        completeLabelMap[currentLang] || completeLabelMap.en;

    const stepNames = [
        t("steps.values"),
        t("steps.preferences"),
        t("steps.match"),
    ];

    const currentMatch =
        selectedMatchId && matchPrograms.find((m) => m.id === selectedMatchId);

    const matchId = currentMatch?.id || "children_program";
    const matchScore = currentMatch?.baseScore || 95;

    const matchName = t(`matches.${matchId}.name`);
    const matchDescription = t(`matches.${matchId}.description`);
    const matchImpact = t(`matches.${matchId}.impactMetric`);
    const matchStory = t(`matches.${matchId}.story`);

    return (
        <div className="impact-dark">
            <ConfettiEffect trigger={showConfetti} />

            <AnimatePresence mode="wait">
                {/* WELCOME */}
                {step === "welcome" && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >

                        <WelcomeScreen
                            pillText={t("welcome.pill")}
                            title={t("welcome.title")}
                            subtitle={t("welcome.subtitle")}
                            footerText={t("welcome.footer")}
                            primaryCtaLabel={t("welcome.primaryCta")}
                            secondaryCtaLabel={t("welcome.secondaryCta")}
                            onStart={() => setStep("values")}
                        />
                    </motion.div>
                )}

                {/* VALUES STEP */}
                {step === "values" && (
                    <motion.div
                        key="values"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="matcher-section"
                    >
                        <div className="matcher-inner">
                            <ProgressIndicator
                                currentStep={currentStepNumber}
                                totalSteps={totalSteps}
                                stepLabel={stepLabel}
                                completeLabel={completeLabel}
                                stepNames={stepNames}
                            />

                            <div className="matcher-heading">
                                <h2>{t("values.title")}</h2>
                                <p>{t("values.subtitle")}</p>
                            </div>

                            <div className="matcher-grid">
                                {impactAreas.map((area) => (
                                    <ImpactAreaCard
                                        key={area.id}
                                        icon={area.icon}
                                        title={t(`impactAreas.${area.id}.title`)}
                                        description={t(
                                            `impactAreas.${area.id}.description`
                                        )}
                                        selected={selectedAreas.includes(area.id)}
                                        onToggle={() => toggleArea(area.id)}
                                    />
                                ))}
                            </div>

                            <div className="matcher-footer">
                                <button
                                    type="button"
                                    className="matcher-link"
                                    onClick={() => setStep("welcome")}
                                    data-testid="button-back"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>{t("buttons.back")}</span>
                                </button>

                                <button
                                    type="button"
                                    className="matcher-cta"
                                    onClick={handleNextFromValues}
                                    disabled={selectedAreas.length === 0}
                                    data-testid="button-next-from-values"
                                >
                                    {t("buttons.continue")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* PREFERENCES STEP */}
                {step === "preferences" && (
                    <motion.div
                        key="preferences"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="matcher-section"
                    >
                        <div className="matcher-inner">
                            <ProgressIndicator
                                currentStep={currentStepNumber}
                                totalSteps={totalSteps}
                                stepLabel={stepLabel}
                                completeLabel={completeLabel}
                                stepNames={stepNames}
                            />

                            <div className="matcher-heading">
                                <h2>{t("preferences.title")}</h2>
                                <p>{t("preferences.subtitle")}</p>
                            </div>

                            <div className="matcher-chips">
                                {givingPreferences.map((pref) => (
                                    <GivingPreferenceChip
                                        key={pref.id}
                                        icon={pref.icon}
                                        label={t(`givingPreferences.${pref.id}`)}
                                        selected={selectedPreferences.includes(pref.id)}
                                        onToggle={() => togglePreference(pref.id)}
                                    />
                                ))}
                            </div>

                            <div className="matcher-footer">
                                <button
                                    type="button"
                                    className="matcher-link"
                                    onClick={() => setStep("values")}
                                    data-testid="button-back-from-preferences"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>{t("buttons.back")}</span>
                                </button>

                                <button
                                    type="button"
                                    className="matcher-cta"
                                    onClick={handleNextFromPreferences}
                                    disabled={selectedPreferences.length === 0}
                                    data-testid="button-find-match"
                                >
                                    {t("buttons.findMatch")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* LOADING */}
                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="matcher-loading"
                    >
                        <div className="matcher-loading-card">
                            <Loader2 className="w-16 h-16 matcher-spinner" />
                            <h3 className="matcher-loading-title">
                                {t("loading.title")}
                            </h3>
                            <p className="matcher-loading-subtitle">
                                {t("loading.subtitle")}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* RESULTS */}
                {step === "results" && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="matcher-section"
                    >
                        <div className="matcher-inner">
                            <ProgressIndicator
                                currentStep={currentStepNumber}
                                totalSteps={totalSteps}
                                stepLabel={stepLabel}
                                completeLabel={completeLabel}
                                stepNames={stepNames}
                            />

                            <div className="matcher-results-header">
                                <div className="matcher-results-pill">
                                    <span>{t("results.pill")}</span>
                                </div>

                                <div className="matcher-result-icon">
                                    <Heart className="w-7 h-7" />
                                </div>

                                <h2 className="matcher-results-title">
                                    {t("results.title")}
                                </h2>

                                <p className="matcher-results-subtitle">
                                    {t("results.subtitle")}
                                </p>
                            </div>

                            <div className="matcher-results-body">
                                <MatchResultCard
                                    programName={matchName}
                                    description={matchDescription}
                                    impactMetric={matchImpact}
                                    beneficiaryStory={matchStory}
                                    matchScore={matchScore}
                                    yourImpactLabel={t("results.yourImpact")}
                                    storyLabel={t("results.storyFromField")}
                                    donateLabel={t("buttons.donateNow")}
                                    learnMoreLabel={t("buttons.learnMore")}
                                    onDonate={() => console.log("Donate clicked")}
                                    onLearnMore={() => console.log("Learn more clicked")}
                                />
                            </div>

                            <div className="matcher-footer matcher-footer-center">
                                <button
                                    type="button"
                                    className="matcher-link"
                                    onClick={() => {
                                        setStep("welcome");
                                        setSelectedAreas([]);
                                        setSelectedPreferences([]);
                                        setSelectedMatchId(null);
                                    }}
                                    data-testid="button-start-over"
                                >
                                    {t("buttons.startOver")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Matcher;
