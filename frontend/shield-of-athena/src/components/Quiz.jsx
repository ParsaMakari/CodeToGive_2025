import "./css/Quiz.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { LucideX } from "lucide-react";
import QuizCompletion from "./QuizCompletion";

export default function Quiz({onClose,setQuizFinished}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect,setIsAnswerCorrect] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/quiz-questions/");
        if (!response.ok) throw new Error("Network was not ok");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, []);

  const handleSelect = (optionIndex) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(optionIndex);
    }
  };

  const checkAnswer =(selected)=>{
    if (selectedAnswer === null) {
      const q = questions.at(currentIndex);
      if (selected !== null) {
        if (selected === q.correctOptionIndex) setIsAnswerCorrect(true); 
        else setIsAnswerCorrect(false);        
      }    
    }
  }
  const handlePrevious = ()=>{
    setSelectedAnswer(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowCompletion(true);
      setQuizFinished && setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setShowCompletion(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };  


  if(showCompletion) return (
        <QuizCompletion
          onClose={onClose} 
          onRestart={handleRestart}
        />
      ) 

  return (
    <div className="container">
      <Card className="quiz-card">
        <Card.Header className="quiz-header">
          Learn about family violence
          {onClose && <div className="quiz-panel-close-btn" onClick={onClose}>
            <LucideX size={20}/>
          </div>}
        </Card.Header>
      
        <div className="question-number">
          <span className="label">Question: <b>{currentIndex + 1}</b> of <b>{questions.length}</b></span>
        </div>

        <Card.Body className="quiz-content">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              style={{ display: idx === currentIndex ? "block" : "none" }}
            >
            
              {/* <Card.Title> </Card.Title> */}
            <div className="question-card">
              <h2 className="question-text">
                {q.question}
              </h2>
              <div className="question-icon">?</div>  
            </div> 

              <hr />
              <div className="quiz-answer-checker">
                { selectedAnswer !== null &&

                <div className="quiz-answer-status">

                    {isAnswerCorrect!==null && isAnswerCorrect ?
                      <span className="correct-answer">
                        Correct
                      </span>
                      :
                      <span className="incorrect-answer">
                        Incorrect
                      </span>
                      }
                    <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#333" }}>
                      {q.explanation}
                    </p>                      

                </div>
                }
              </div>

            <div className="options-container">
              {q.options.map((option,i) => (
                <div
                  key={i}
                  className={`option ${selectedAnswer === i ? 'selected' : ''}`}
                  onClick={() => {
                    handleSelect(i);
                    checkAnswer(i)
                  }
                  }
                >
                  <span className="option-letter">{i+1}</span>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>              
            <button
              className="next-button"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              Next
            </button>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}