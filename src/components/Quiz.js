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
        setQuestions(prevQuestions => prevQuestions.map(question => {
            console.log()
        }))
    }

    function updateSelected(id, value) {
        setQuestions(prevQuestions => prevQuestions.map((question, index) => {
            return index === id ? {...question, selected: value} : question
        }))
    }

    function checkAnswers() {
        if (questions?.every(question => {
            return question.selected !== ""
        })) {
            //FIX SUM 1 TO SCORE
            setQuestions(prevQuestions => prevQuestions.map(question => {
                question.correct_answer === question.selected && setScore(prevScore => prevScore + 1)
                return {...question, isCorrect: question.correct_answer === question.selected ? true : false}
            }))
            setQuizChecked(true)
        }
        
    }

    function playAgain() {
        // MODIFY ARRAY FOR FETCH
        // setQuestions([
        // {
        //     question: "How would one say goodbye in German?",
        //     correct_answer: "Tchus",
        //     options: ["Tchus", "Hola", "Au Revoir", "Salir"],
        //     selected: "",
        //     isCorrect: false,
        // },
        // {
        //     question: "Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
        //     correct_answer: "Cabbage Patch Kids",
        //     options: ["Cabbage Patch Kids", "Transformers", "Care Bears", "Rubik’s Cube"],
        //     selected: "",
        //     isCorrect: false,
        // },
        // {
        //     question: "What is the hottest planet in our Solar System?",
        //     correct_answer: "Venus",
        //     options: ["Mercury", "Venus", "Mars", "Saturn"],
        //     selected: "",
        //     isCorrect: false,
        // },
        // {
        //     question: "In which country was the caesar salad invented?",
        //     correct_answer: "Italy",
        //     options: ["Italy", "Portugal", "Mexico", "France"],
        //     selected: "",
        //     isCorrect: false,
        // },
        // {
        //     question: "How Many Hearts Does An Octopus Have?",
        //     correct_answer: "Three",
        //     options: ["One", "Two", "Three", "Four"],
        //     selected: "",
        //     isCorrect: false,
        // },])
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
        options={question.options}
        selected={question.selected}
        updateSelected={updateSelected}
        />
    ))

    return (
        <div className="quiz">
            {renderQuestions}
            <div className="control-btns">
                {/* DELETE THE DIVIDER OF THE SCORE */}
                {quizChecked && <h4>You Scored {score/2}/5 correct answers</h4>}
                {quizChecked ? <button onClick={playAgain} className="play-again-btn">Play again</button> : <button onClick={checkAnswers} className="check-btn">Check Answers</button>}
                <button onClick={props.changeGameState} className="finish-btn">Finish Game</button>
            </div>
        </div>
    )
}

export default Quiz;