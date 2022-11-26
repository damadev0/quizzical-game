import '../css/Option.css'

function Option(props) {

    const optionClasses = `option ${props.isSelected ? "selected" : ""} ${(props.quizChecked && props.isCorrectOption) ? "isCorrect" : ""} ${(props.quizChecked && props.isSelected) && !props.isCorrectOption ? "isIncorrect" : ""}`
    // isIncorrect
    return(
        <button onClick={() => !props.quizChecked && props.updateSelected(props.questionIndex, props.value)} className={optionClasses}>
            {props.value}
        </button>
    )
}
export default Option;