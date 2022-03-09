import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import arrayShuffle from 'array-shuffle';
import Start from './components/Start';
import Question from './components/Question';

export default function App() {
  const [started, setStarted] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cagetoryName, setCategoryName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [allAnswersSelected, setAllAnswersSelected] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  function getCategories() {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((json) => {
        const allCategories = json.trivia_categories;
        allCategories.map((category) => {
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              id: category.id,
              name: category.name,
            },
          ]);
        });
      })
      .catch((error) => console.log('Error: ' + error));
  }

  useEffect(() => {
    getCategories();
  }, []);

  function handleSelectCategory(category) {
    const categoryId = categories.find((cat) => cat.name === category).id;
    setCategoryName(category);
    setSelectedCategory(categoryId);
  }

  function getQuestions() {
    fetch(`https://opentdb.com/api.php?amount=5&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((json) => {
        const results = json.results;
        for (let i = 0; i < results.length; i++) {
          const shuffledAnswers = arrayShuffle([
            {
              id: nanoid(),
              answer: results[i].correct_answer,
              isCorrect: true,
              isSelected: false,
              isRight: false,
              isWrong: false,
            },
            {
              id: nanoid(),
              answer: results[i].incorrect_answers[0],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false,
            },
            {
              id: nanoid(),
              answer: results[i].incorrect_answers[1],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false,
            },
            {
              id: nanoid(),
              answer: results[i].incorrect_answers[2],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false,
            },
          ]);

          setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
              question: results[i].question,
              questionId: nanoid(),
              answers: [
                shuffledAnswers[0],
                shuffledAnswers[1],
                shuffledAnswers[2],
                shuffledAnswers[3],
              ],
            },
          ]);
        }
      })
      .catch((error) => console.log('Error' + error.message));
  }

  useEffect(() => {
    if (newGame) {
      getQuestions();
    }
  }, [newGame]);

  useEffect(() => {
    questions.map((question) => {
      const answers = question.answers;
      if (answers.filter((ans) => ans.isSelected).length === 1) {
        setAllAnswersSelected(true);
      } else {
        setAllAnswersSelected(false);
      }
    });
  }, [questions]);

  function selectAnswer(id, questionId) {
    if (!endGame) {
      setQuestions((prevQuestions) => {
        let answers = prevQuestions.find(
          (question) => question.questionId === questionId
        ).answers;
        answers.map((answer) => (answer.isSelected = false));
        answers.find((answer) => answer.id === id).isSelected = true;
        return [...prevQuestions];
      });
    }
  }

  function checkAnswers() {
    if (endGame) {
      setQuestions([]);
      setNewGame(true);
      setEndGame(false);
      setStarted(false);
    } else {
      setQuestions((prevQuestions) => {
        prevQuestions.map((question) => {
          let answers = question.answers;
          for (let answer in answers) {
            if (answers[answer].isSelected && answers[answer].isCorrect) {
              answers[answer].isRight = true;
              setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
            } else if (
              answers[answer].isSelected &&
              !answers[answer].isCorrect
            ) {
              answers[answer].isSelected = false;
              answers[answer].isWrong = true;
            } else if (
              !answers[answer].isSelected &&
              answers[answer].isCorrect
            ) {
              answers[answer].isSelected = true;
            }
          }
        });
        return [...prevQuestions];
      });
      setNewGame(false);
      setEndGame(true);
    }
  }

  function startGame() {
    setNewGame(true);
    setStarted(true);
  }

  const renderQuestions = questions.map((question) => {
    return (
      <Question
        key={question.questionId}
        question={decode(question.question)}
        answer1={decode(question.answers[0])}
        answer2={decode(question.answers[1])}
        answer3={decode(question.answers[2])}
        answer4={decode(question.answers[3])}
        selectAnswer={selectAnswer}
        questionId={question.questionId}
      />
    );
  });

  return (
    <div>
      {!started ? (
        <Start
          startGame={startGame}
          categories={categories}
          handleSelectCategory={handleSelectCategory}
        />
      ) : (
        <div className="questions-container">
          <h3>{cagetoryName}</h3>
          {renderQuestions}
          <div className="col-full">
            <div className="col-half">
              {endGame && (
                <h4>You scored {correctAnswers}/5 correct answers</h4>
              )}
            </div>
            <div className="col-half">
              {!endGame ? (
                <button
                  disabled={!allAnswersSelected}
                  onClick={() => checkAnswers()}
                >
                  Check answers
                </button>
              ) : (
                <button onClick={() => checkAnswers()}>New game</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
