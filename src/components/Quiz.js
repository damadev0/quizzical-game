import { useState, useEffect } from "react";
import { useQuery } from 'react-query'
import Question from './Question'
// import { fetchQuestions } from '../fetchers/questions.js'
import '../css/Quiz.css'

function Quiz(props) {
    const [questions, setQuestions] = useState([])
    const [quizChecked, setQuizChecked] = useState(false)
    const [score, setScore] = useState(0)
    
    //Fetch new questions
    const fetchQuestions = async () => {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        const results = await (await response.json()).results

        //Insert shuffled options for each question
        const questionsData = await results.map(question => {
            return {
                ...question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.4)
            }
        })
        return await questionsData
    }
    
    
    const { data, status, error, refetch } = useQuery('questions', fetchQuestions)


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
        //I don't Know if refetch is working
        refetch()
        setQuizChecked(false)
        setScore(0)
    }

    const renderQuestions = data?.map((question, index) => (
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
            {status === "loading" && <div>Loading...</div>}
            {status === "error" && <div>{error.message}</div>}
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