import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Chat from "./Chat";
import "../css/ChatFloating.scss";

function ChatFloating() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && (
                <button
                    type="button"
                    className="chat-fab"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageCircle className="chat-fab__icon" />
                </button>
            )}
            {isOpen && (
                <div className="chat-fab__backdrop" onClick={() => setIsOpen(false)}>
                    <div
                        className="chat-fab__panel"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="chat-close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            <X />
                        </button>

                        <Chat />
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatFloating;
