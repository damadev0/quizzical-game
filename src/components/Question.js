import { useState, useEffect } from 'react'
import Option from "./Option"
import '../css/Question.css'

function Question(props) {

    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions([...props.incorrect_answers, props.correct_answer].sort(() => Math.random() - 0.4))
    }, [])


    return(
        <div className="question">
            <h3>{props.question}</h3>
            <div className="options">
                {console.log(props)}
                {
                options.map((option, index) => (
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