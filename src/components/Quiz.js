import { useState, useEffect } from "react";
import Question from './Question'
import '../css/Quiz.css'

function Quiz() {
    const [questions, setQuestions] = useState([
        {
            question: "How would one say goodbye in Spanish?",
            correct_answer: "Adiós",
            options: ["Adiós", "Hola", "Au Revoir", "Salir"],
            selected: "Hola"
        },
        {
            question: "Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
            correct_answer: "Cabbage Patch Kids",
            options: ["Cabbage Patch Kids", "Transformers", "Care Bears", "Rubik’s Cube"],
            selected: "Care Bears"
        },
        {
            question: "What is the hottest planet in our Solar System?",
            correct_answer: "Venus",
            options: ["Mercury", "Venus", "Mars", "Saturn"],
            selected: "Mercury"
        },
        {
            question: "In which country was the caesar salad invented?",
            correct_answer: "Italy",
            options: ["Italy", "Portugal", "Mexico", "France"],
            selected: "Portugal"
        },
        {
            question: "How Many Hearts Does An Octopus Have?",
            correct_answer: "Three",
            options: ["One", "Two", "Three", "Four"],
            selected: "Four"
        },
    ])

    useEffect(function() {
        console.log("Effect ran")
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then(res => res.json())
            // .then(data => setQuestions(data.results))
    }, [])
    
    function updateSelected(id, value) {
        setQuestions(prevQuestions => prevQuestions.map((question, index) => {
            return index === id ? {...question, selected: value} : question
        }))
    }

    const renderQuestions = questions.map((question, index) => (
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
        </div>
    )
}

export default Quiz;