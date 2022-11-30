import '../css/Option.css'

function Option(props) {

    const optionClasses = `option ${props.isSelected ? "selected" : ""} ${(props.quizChecked && props.isCorrectOption) ? "isCorrect" : ""} ${(props.quizChecked && props.isSelected) && !props.isCorrectOption ? "isIncorrect" : ""}`
    console.log(`quizChecked: ${props.quizChecked}
                isSelected: ${props.isSelected}
                isCorrectOption: ${props.isCorrectOption}
                `)
    return(
        <button onClick={() => !props.quizChecked && props.updateSelected(props.questionIndex, props.value)} className={optionClasses}>
            {props.value}
        </button>
    )
}
export default Option;