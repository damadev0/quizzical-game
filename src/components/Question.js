import { useState, useEffect } from 'react'
import Option from "./Option"
import '../css/Question.css'

function Question(props) {

    return(
        <div className="question">
            <h3>{props.question}</h3>
            <div className="options">
                {
                props.options?.map((option, index) => (
                    <Option 
                    key={index}
                    updateSelected={props.updateSelected}
                    questionIndex={props.index}
                    value={option}
                    isSelected={props.selected === option}
                    isCorrectOption={props.correct_answer === option}
                    quizChecked={props.quizChecked}
                    />
                    ))
                }
            </div>
        </div>
    )
}
export default Question;