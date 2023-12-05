import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import UsersContext from "../../contexts/UserContext";
import AddAnswer from "./AddAnswer";

const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border: solid black 1px;

  .questionSummary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 3px;

    > div {
      display: flex;
      gap: 5px;
    }
  }
`;
const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border: solid red 1px;

  .oneAnswer {
    display: flex;
    border: 2px blue solid;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 3px;

    > div {
      display: flex;
      gap: 5px;
    }
  }
`;

const OneQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const { setQuestions, QuestionsActionTypes } = useContext(
    ForumQuestionsContext
  );
  const { loggedInUser } = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (!data.title) {
          navigate("/");
        }
        setQuestion(data);
      });
  }, []);

  return (
    question && (
      <>
        {loggedInUser.id === question.creatorId && (
          <>
            {/* <button onClick={() => navigate(`/games/edit/${id}`)}>Edit</button> */}
            <button
              onClick={() => {
                setQuestions({ type: QuestionsActionTypes.remove, id: id });
                navigate("/questions/allQuestions");
              }}
            >
              Delete
            </button>
          </>
        )}
        <QuestionContainer>
          <div className="questionSummary">
            <div>
              <span>{question.numberOfLikes}</span>
              <span>votes</span>
            </div>
          </div>
          <div className="questionContent">
            <h3>{question.title}</h3>
            <p>{question.question}</p>
            <p>Created: {question.createdDate}</p>
          </div>
          <Link to={`/questions/${id}/addAnswer`}>
            <button>Add Answer</button>
          </Link>
        </QuestionContainer>
        <AnswersContainer>
          {question.answers.map((answer) => (
            <div key={answer.id} className="oneAnswer">
              <div>
                <span>{answer.numberOfLikes}</span>
                <span>votes</span>
              </div>
              <div className="answerContent">
                <p>{answer.answer}</p>
                <p>Created: {answer.createdDate}</p>
              </div>
            </div>
          ))}
        </AnswersContainer>
      </>
    )
  );
};

export default OneQuestion;
