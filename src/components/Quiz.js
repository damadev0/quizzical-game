import { useState, useEffect } from "react"
import Question from "./Question"
import Loader from "./Loader"
// import { fetchQuestions } from "../fetchers/questions.js"
import "../css/Quiz.css"
let didInit = false

function Quiz(props) {
  const [questions, setQuestions] = useState([])
  const [quizChecked, setQuizChecked] = useState(false)
  const [score, setScore] = useState(0)
  const numberOfQuestions = 4
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(function () {
    if (!didInit) {
      didInit = true
      fetchQuestions()
    }
  }, [])

  function fetchQuestions() {
    fetch(
      "https://opentdb.com/api.php?amount=" +
        numberOfQuestions +
        "&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => data.results)
      .then((questionsData) => setQuestions(questionsData))
      //Insert the options propperty
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) => ({
            ...question,
            options: [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(() => Math.random() - 0.4),
          }))
        )
      })
  }

  function updateSelected(questionId, value) {
    //Update selected option of a question
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) => {
        return index === questionId
          ? { ...question, selected: value }
          : question
      })
    )
  }

  function checkAnswers() {
    //Check all questions have been answered
    if (
      questions?.every((question) => {
        return question.selected !== undefined
      })
    ) {
      //Check if answers are correct and update score
      questions.map((question) => {
        question.correct_answer === question.selected &&
          setScore((prevScore) => prevScore + 1)
      })
      setShowTooltip(false)
      setQuizChecked(true)
    } else {
      setShowTooltip(true)
    }
  }

  function playAgain() {
    setQuestions([])
    fetchQuestions()
    setQuizChecked(false)
    setScore(0)
  }

  const renderQuestions = questions?.map((question, index) => (
    <Question
      key={index}
      index={index}
      question={question.question}
      correct_answer={question.correct_answer}
      incorrect_answers={question.incorrect_answers}
      options={question.options}
      selected={question.selected}
      updateSelected={updateSelected}
      quizChecked={quizChecked}
    />
  ))

  function finishGame() {
    didInit = false
    props.finishGame()
  }

  return (
    <div className="quiz">
      {questions.length > 0 ? (
        <>
          {renderQuestions}
          <div className="control-btns">
            {/* DELETE THE DIVIDER OF THE SCORE */}
            {quizChecked && (
              <h4>
                You Scored {score}/{numberOfQuestions} correct answers
              </h4>
            )}
            {quizChecked ? (
              <>
                <button onClick={playAgain} className="play-again-btn">
                  Play again
                </button>
                <button onClick={finishGame} className="finish-btn">
                  Finish Game
                </button>
              </>
            ) : (
              <button onClick={checkAnswers} className="check-btn">
                Check Answers
              </button>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
      {showTooltip && (
        <div class="tooltip">
          <small>Answers all the questions!</small>
        </div>
      )}
    </div>
  )
}

export default Quiz
