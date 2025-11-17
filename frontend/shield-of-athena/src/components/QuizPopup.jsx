import "./css/QuizPopup.scss";
import { Brain, Icon, LucideX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Quiz from "./Quiz";

export default function QuizPopup (){
    const [isOpen,setIsOpen] = useState(false);
    const [isHover,setIsHover] = useState(false);
    const [isHoverClose,setIsHoverClose] = useState(false);    
    const [isIconVisible,setIsIconVisible] = useState(true);
    const  [isQuizFinished,setIsQuizFinished] = useState(false);
    
    const [flickerTime,setFlickerTime] = useState(3);

    const controls = useAnimation();

    const triggerShake = () => {
        // change the mouvment intensity for the brain here
        controls.start({
            x: [0, -5, 5, -5, 5, 0],
            y: [0, 5, -5, 5, -5, 0],
            transition: { duration: 0.5 }
        });
    };

    const handleClose = () =>{
        setIsOpen(false)
        setIsHover(false)
    }
    const handleCloseIcon = () =>{
        setIsIconVisible(false)
    }

    useEffect(()=>{
        if(!isHover && !isQuizFinished && (flickerTime>0)){
            const interval = setInterval(() => {
                setFlickerTime(flickerTime-1);
                triggerShake();
            }, 4000);
            return () => clearInterval(interval); 
        }
    },[isHover,flickerTime,isQuizFinished])

    if(!isIconVisible) return null;

    return(
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}  
            onScrollCapture={()=>handleClose}          
        >
            <motion.div className="quiz-fab-container" 
                    animate={controls}
                    onClick={() => setIsOpen(!isOpen)}            
            >
                <div className="quiz-fab-close" 
                    onClick={handleCloseIcon}
                        onMouseEnter={() => setIsHoverClose(true)}
                        onMouseLeave={() => setIsHoverClose(false)}                    
                    >
                    <LucideX size={13} strokeWidth={2}/>
                </div>       
                {
                    isHover && !isOpen &&
                <p className={isHoverClose ? "quiz-fab-label close-icon" : "quiz-fab-label"} >
                    {
                        isHoverClose?
                        "Close"
                        :
                        "Test your knowledge"
                    }
                    
                </p>
                }
                
                <button
                    type="button"
                    className="quiz-fab"                   
                >                    
                    <Brain size={20}/>
                </button>
            </motion.div>

            {isOpen && (
                <div className="quiz-fab__backdrop" onClick={handleClose}>
                    <div
                        className="quiz-fab__panel"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <button
                            type="button"
                            className="quiz-close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            <X />
                        </button> */}

                        <Quiz onClose={handleClose} setQuizFinished={setIsQuizFinished}/>
                    </div>
                </div>
            )}
        </div>
    )
}