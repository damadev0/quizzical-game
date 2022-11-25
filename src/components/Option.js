import '../css/Option.css'

function Option(props) {

    const isSelectedStyle = {
        backgroundColor: props.isSelected ? "#CCAA2F" : "transparent",
        color: props.isSelected ? "#ffffff" :  "#2B2C31",
        border: props.isSelected ? "1.6px solid #CCAA2F" : "1.6px solid #2B2C31"
    }
    return(
        <button onClick={() => props.updateSelected(props.questionIndex, props.value)} className="option" style={isSelectedStyle}>
            {props.value}
        </button>
    )
}
export default Option;