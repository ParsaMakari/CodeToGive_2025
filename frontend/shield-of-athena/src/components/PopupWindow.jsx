import {  X } from "lucide-react";
import "../css/ChatFloating.scss";
import "./css/PopupWindow.scss";

function PopupWindow({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <>
        <div className="popup-window__backdrop" onClick={onClose}>
            <div
                className="popup-window__container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* <button
                    type="button"
                    className="chat-close-btn"
                    onClick={onClose}
                >
                    <X />
                </button> */}

                <div className="popup-body">
                    {children} 
                </div>
            </div>
        </div>
        </>
    );
}

export default PopupWindow;
