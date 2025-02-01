import axios from "axios"

export const fetchQuestions = async () => {
  const response = await axios.get(
    // Add session token to not get repeated questions
    "https://opentdb.com/api.php?amount=4&category=9&difficulty=easy&type=multiple"
  )

  return response.results
}
