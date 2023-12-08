import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import UsersContext from "../../contexts/UserContext";
import AddAnswer from "./AddAnswer";
import VoteComponent from "../UI/VoteComponent";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import AnswerCard from "../UI/AnswerCard";

const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border: solid black 1px;
  > p h3 {
    margin-top: 0;
  }

  .questionSummary {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 3px;

    > div {
      display: flex;
      gap: 5px;
    }
  }
  .questionsDate {
    border: yellowgreen 1px solid;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 0.8rem;
  }
`;

const AbsoluteButton = styled.button`
  font-size: 0.7rem;
  position: absolute;
`;

const OneQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const [localAnswers, setLocalAnswers] = useState([]);
  const { questions, setQuestions, QuestionsActionTypes } = useContext(
    ForumQuestionsContext
  );
  const { answers, setAnswers, AnswersActionTypes } =
    useContext(ForumAnswersContext);
  const { loggedInUser } = useContext(UsersContext);
  // console.log(answers);

  useEffect(() => {
    if (id) {
      // Fetch question
      fetch(`http://localhost:8080/questions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Fetched Question Data:", data);
          if (!data.title) {
            navigate("/");
          }
          setQuestion(data);
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
        });
    }
  }, [id, setQuestions]);

  return (
    question &&(
      <>
        <QuestionContainer>
          {loggedInUser.id === question.creatorId && (
            <>
              <AbsoluteButton
                style={{ right: "3px", top: "3px", color: "blue" }}
                onClick={() => navigate(`/questions/${id}/edit`)}
              >
                Edit
              </AbsoluteButton>
              <AbsoluteButton
                style={{ right: "3px", top: "30px", color: "red" }}
                onClick={() => {
                  if (window.confirm("Delete?")) {
                    setQuestions({ type: QuestionsActionTypes.remove, id: id });
                    navigate("/questions/allQuestions");
                  }
                }}
              >
                Delete
              </AbsoluteButton>
            </>
          )}
          <div className="questionSummary">
            <VoteComponent />
            <div>
              <span>{question.numberOfLikes}</span>
              <span>votes</span>
            </div>
          </div>
          <div className="questionContent">
            <h3>{question.title}</h3>
            <p>{question.question}</p>
            <div className="questionsDate">
              <span>Created: {question.createdDate}</span>
              {question.isEdited && <span>Edited: {question.editedDate}</span>}
            </div>
          </div>
          {loggedInUser && (
            <div>
              <Link to={`/questions/${id}/addAnswer`}>
                <AbsoluteButton style={{ bottom: "5px", right: "5px" }}>
                  Answer
                </AbsoluteButton>
              </Link>
            </div>
          )}
        </QuestionContainer>
        <div>
          {answers &&
            answers
              .filter((answer) => {
                const isMatch = answer.questionId === question.id;
                // console.log("Answer:", answer, "Is Match:", isMatch);
                return isMatch;
              })
              .map((answer) => {
                // console.log("Rendering Answer:", answer);
                return <AnswerCard key={answer.id} data={answer} />;
              })}
        </div>
      </>
    )
  );
};

export default OneQuestion;
