import React from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink, TrendingUp } from "lucide-react";

export default function MatchResultCard({
                                            programName,
                                            description,
                                            impactMetric,
                                            beneficiaryStory,
                                            matchScore,
                                            yourImpactLabel,
                                            storyLabel,
                                            donateLabel,
                                            learnMoreLabel,
                                            onDonate,
                                            onLearnMore,
                                        }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="matcher-card">
                <div className="matcher-card-header">
          <span className="match-badge">
            <TrendingUp className="w-3 h-3" style={{ marginRight: 4 }} />
              {matchScore}% Match
          </span>
                    <div>
                        <h2 className="match-card-title">{programName}</h2>
                        <p className="match-card-description">{description}</p>
                    </div>
                </div>

                <div className="matcher-card-body">
                    <div className="match-impact-box">
                        <div className="match-impact-icon">
                            <Heart className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="match-impact-label">{yourImpactLabel}</p>
                            <p className="match-impact-value">{impactMetric}</p>
                        </div>
                    </div>

                    <div className="match-story-box">
                        <p className="match-story-label">{storyLabel}</p>
                        <p className="match-story-text">"{beneficiaryStory}"</p>
                    </div>

                    <div className="matcher-card-actions">
                        <button
                            type="button"
                            onClick={onDonate}
                            className="matcher-btn matcher-btn-primary"
                            data-testid="button-donate-now"
                        >
                            <Heart className="w-5 h-5" />
                            <span>{donateLabel}</span>
                        </button>

                        <button
                            type="button"
                            onClick={onLearnMore}
                            className="matcher-btn matcher-btn-secondary"
                            data-testid="button-learn-more-program"
                        >
                            <span>{learnMoreLabel}</span>
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
