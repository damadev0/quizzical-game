import { useState, useEffect, useQuery } from "react";
import Question from './Question'
// import { fetchQuestions } from '../fetchers/questions.js'
import '../css/Quiz.css'

function Quiz(props) {
    const [questions, setQuestions] = useState([])
    const [quizChecked, setQuizChecked] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(function() {
        fetchQuestions()
    }, [])

    function fetchQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then((res) => res.json())
        .then((data) => data.results)
        .then((questionsData) => setQuestions(questionsData))
        //Insert the options propperty
        .then(() => {
            setQuestions(prevQuestions => prevQuestions.map(question => (
                {
                ...question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.4)
                }
            )))
        })
    }

    function updateSelected(questionId, value) {
        //Update selected option of a question
        setQuestions(prevQuestions => prevQuestions.map((question, index) => {
            return index === questionId ? {...question, selected: value} : question
        }))
    }

    function checkAnswers() {
        //Check all questions have been answered
        if (questions?.every(question => {
            return question.selected !== undefined
        })) {
            //Check if answers are correct and update score
            questions.map(question => {
                question.correct_answer === question.selected && setScore(prevScore => prevScore + 1)
            })
            setQuizChecked(true)
        }
    }

    function playAgain() {
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

    return (
        <div className="quiz">
            {renderQuestions}
            <div className="control-btns">
                {/* DELETE THE DIVIDER OF THE SCORE */}
                {quizChecked && <h4>You Scored {score}/5 correct answers</h4>}
                {quizChecked ? <button onClick={playAgain} className="play-again-btn">Play again</button> : <button onClick={checkAnswers} className="check-btn">Check Answers</button>}
                <button onClick={props.changeGameState} className="finish-btn">Finish Game</button>
            </div>
        </div>
    )
}

export default Quiz;