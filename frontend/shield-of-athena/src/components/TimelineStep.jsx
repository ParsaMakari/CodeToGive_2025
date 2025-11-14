import React from "react";

function TimelineStep({
                          stepNumber,
                          totalSteps,
                          icon: Icon,
                          title,
                          description,
                          programName,
                          isLast
                      }) {
    return (
        <div className="impact-step">
            <div className="impact-step-left">
                <div className="impact-step-badge">
                    <div className="impact-step-badge-icon">
                        {Icon && (
                            <Icon
                                className="impact-step-icon-inner"
                                size={20}
                                strokeWidth={2.1}
                            />
                        )}
                    </div>
                    <div className="impact-step-badge-number">
                        {stepNumber}
                    </div>
                </div>

                {!isLast && <div className="impact-step-connector" />}
            </div>

            <div className="impact-step-card">
                <div className="impact-step-content">
                    <h2>{title}</h2>
                    {programName && (
                        <span className="impact-tag">{programName}</span>
                    )}
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default TimelineStep;
