import axios from 'axios'

export const fetchQuestions = async () => {
    console.log("Fetching Questions")
    const response = await axios.get("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    console.log(response)
    const questions = response.results

    return questions
}