import React from "react";

function ProgressIndicator({
                               currentStep,
                               totalSteps,
                               stepLabel,
                               completeLabel,
                               stepNames,
                           }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="progress-container">
            <div className="progress-top-row">
                <span className="progress-label">{stepLabel}</span>
                <span className="progress-label">{completeLabel}</span>
            </div>

            <div className="progress-track">
                {steps.map((step) => (
                    <div
                        key={step}
                        className={
                            "progress-segment" +
                            (step <= currentStep ? " progress-segment-active" : "")
                        }
                    />
                ))}
            </div>

            <div className="progress-step-labels">
                {steps.map((step, idx) => (
                    <span
                        key={step}
                        className={
                            "progress-step-label" +
                            (step <= currentStep ? " progress-step-label-active" : "")
                        }
                    >
            {stepNames?.[idx] ?? ""}
          </span>
                ))}
            </div>
        </div>
    );
}

export default ProgressIndicator;
