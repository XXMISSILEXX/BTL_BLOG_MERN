import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './trivia.css';

function Trivia() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(-1);

  // Fetch trivia data from the API
  useEffect(() => {
    axios.get('/trivia')
      .then(response => {
        const data = response.data[0];
        setQuestion(data.question);
        const shuffledOptions = shuffle([...data.incorrect_answers, data.correct_answer]);
        setOptions(shuffledOptions);
        setCorrectIndex(shuffledOptions.indexOf(data.correct_answer));
      })
      .catch(error => console.error(error));
  }, []);

  // Handle selection of an answer option
  function handleOptionSelect(option, index) {
    setSelectedOption(index);
    setIsCorrect(index === correctIndex);
  }

  return (
    <div className="container">
      <h1 className="header">Trivia</h1>
      <p className="question">{question}</p>
      <div className="answer-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option, index)}
            className={`answer-option ${selectedOption !== null && index === correctIndex ? 'trivia-correct' : selectedOption === index ? isCorrect ? 'trivia-correct' : 'trivia-incorrect' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null && (
        <p className={`feedback-text ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? "Congratulations, you're right!" : "Sorry, that's incorrect."}
        </p>
      )}
    </div>
  );
}

// Helper function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Trivia;
