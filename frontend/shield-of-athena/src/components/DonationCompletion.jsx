import {FaFacebookF, FaInstagram, FaShieldHeart, FaTwitter, FaWhatsapp, FaX } from "react-icons/fa6";
import ConfettiEffect from "./Confetti";
import "./css/DonationCompletion.scss"
import { useDonation } from "./DonationForm";

export default function DonationCompletion({onClose}){
    const {formData} = useDonation();
    const onDownloadReceipt = () =>{

    }

    function handleBadgeMove(e) {
        const badge = e.currentTarget;
        const rect = badge.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        // Set CSS vars for gradient position
        badge.style.setProperty("--mx", `${percentX}%`);
        badge.style.setProperty("--my", `${percentY}%`);

        const maxTilt = 10; // max degrees of tilt

        // Rotate so the corner under the mouse goes "down" (away)
        const rotateX = ((50 - percentY) / 50) * maxTilt; // top -> +tilt, bottom -> -tilt
        const rotateY = ((50 - percentX) / 50) * maxTilt; // left -> +tilt, right -> -tilt

        badge.style.setProperty("--tiltX", `${rotateX}deg`);
        badge.style.setProperty("--tiltY", `${rotateY}deg`);
        // Slight scale-in to feel pressed
        badge.style.setProperty("--scale", `0.97`);
    }

    function handleBadgeLeave(e) {
        const badge = e.currentTarget;
        badge.style.setProperty("--mx", `50%`);
        badge.style.setProperty("--my", `50%`);
        badge.style.setProperty("--tiltX", `0deg`);
        badge.style.setProperty("--tiltY", `0deg`);
        badge.style.setProperty("--scale", `1`);
    } 

    return(
      <div className="ty-card">
            <ConfettiEffect trigger={true}/>
            <button type="button" className="ty-close" onClick={onClose}>
                <FaX/>
            </button>
            <div className="ty-left">
            <p className="ty-overline">Thank you</p>
            <h2 className="ty-title">
                {formData.firstName!= ""? formData.firstName : "Donor"}, your gift truly matters.
            </h2>
                <p className="ty-amount">
                You just gave <span>${formData.amount || formData.customAmount}</span> to protect women and children.
                </p>

            <p className="ty-impact">
                Tonight, someone will feel safer because of you. Your support helps
                provide shelter, counselling and vital resources to survivors of
                domestic violence.
            </p>

            <div className="ty-stats-row">
                <div className="ty-stat">
                <span className="ty-stat-value">92%</span>
                <span className="ty-stat-label">to direct services</span>
                </div>
                <div className="ty-stat">
                <span className="ty-stat-value">4,312</span>
                <span className="ty-stat-label">people helped this year</span>
                </div>
                <div className="ty-stat">
                <span className="ty-stat-value">1</span>
                <span className="ty-stat-label">life changed by you</span>
                </div>
            </div>

            <div className="ty-actions-main">
                <button
                className="ty-btn ty-btn-primary"
                onClick={onDownloadReceipt}
                >
                Download receipt
                </button>
                <button className="ty-btn ty-btn-ghost">
                See how your gift helps
                </button>
            </div>
                <p className="ty-left-subtle">
                    Want to help in other ways?{" "}
                    <a href="#volunteer">Discover volunteering and advocacy options.</a>
                </p>
                <div className="ty-progress-block">
                    <div className="ty-progress-head">
                    <span>Monthly goal: 100 protected families</span>
                    <span className="ty-progress-value">62% funded</span>
                    </div>
                    <div className="ty-progress-bar">
                    <div className="ty-progress-fill" style={{ width: "62%" }} />
                    </div>
                </div>
            </div>     

            <div className="ty-right">
                <div className="ty-right-inner">
                    <p className="ty-right-text">
                        Make your impact around you by sharing your badge {" "}
                        <strong>with your friends</strong>.
                    </p>                    
                    <div
                        className="ty-badge"
                        onMouseMove={handleBadgeMove}
                        onMouseLeave={handleBadgeLeave}
                    >
                        <div className="ty-badge-header">
                            <span className="ty-badge-label">Donor status</span>
                            <span className="ty-badge-title">Protector</span>
                        </div>

                        <FaShieldHeart size={80}/>
                        <div className="ty-badge-footer">
                            <span className="ty-badge-label">
                                Shield of Athena
                            </span>
                        </div>
                    </div>
                    <div className="ty-btn-group">
                        <button className="ty-btn ty-btn-secondary">
                            <FaFacebookF size={16}/>
                        </button>
                        <button className="ty-btn ty-btn-secondary">
                            <FaInstagram size={16}/>
                        </button>      
                        <button className="ty-btn ty-btn-secondary">
                            <FaTwitter size={16}/>
                        </button>        
                        <button className="ty-btn ty-btn-secondary">
                            <FaWhatsapp size={16}/>
                        </button>                                                          
                    </div>


                </div>
            </div>                           
            {/* <div className="donation-complete__left">
                <h3>Your donator card</h3>
            </div> */}
        </div>
    )
}