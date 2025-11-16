import "./css/Quiz.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Quiz finished!");
    }
  };

  return (
    <div className="container">
      <Card className="quiz-card">
        <Card.Header>Quiz</Card.Header>
        <Card.Body>
          {questions.map((q, idx) => (
            <div
              key={q.id}
              style={{ display: idx === currentIndex ? "block" : "none" }}
            >
              <Card.Title>{q.question}</Card.Title>
              <hr />
              <Card.Text>
                <ul>
                  {q.options.map((option, i) => {
                    let bgColor = "";
                    if (selectedAnswer !== null) {
                      if (i === q.correctOptionIndex) bgColor = "#8fd19e"; 
                      else if (i === selectedAnswer) bgColor = "#f5a3a3"; 
                    }

                    return (
                      <li
                        key={i}
                        onClick={() => handleSelect(i)}
                        style={{
                          backgroundColor: bgColor,
                          cursor: selectedAnswer === null ? "pointer" : "default",
                        }}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
                <div className="index">
                  {currentIndex + 1} of {questions.length} Questions
                </div>
              </Card.Text>
              <button
                className="next-button"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                Next
              </button>

              {selectedAnswer !== null && (
                <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#333" }}>
                  {q.explanation}
                </p>
              )}
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}