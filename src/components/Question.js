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
                    index={index}
                    updateSelected={props.updateSelected}
                    questionIndex={props.index}
                    value={option}
                    isSelected={props.selected === option}
                    />
                    ))
                }
            </div>
        </div>
    )
}
export default Question;