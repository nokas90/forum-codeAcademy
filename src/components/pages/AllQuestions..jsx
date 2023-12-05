import { useContext } from "react";
import { Link } from "react-router-dom";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import UsersContext from "../../contexts/UserContext";
import { styled } from "styled-components";
import QuestionCard from "../UI/QuestionCard";

const StyledQuestions = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;

`;

const AllQuestions = () => {
  const { loggedInUser } = useContext(UsersContext);

  const { questions } = useContext(ForumQuestionsContext);
  // console.log(questions);

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-around'}}>
        <h1 style={{ textAlign: "center" }}>All Questions</h1>
        {
         loggedInUser && <Link to="/questions/newQuestion"><button>Ask Question</button></Link>

        }
      </div>

      <StyledQuestions>
        {questions.map((question) => {
          return <QuestionCard key={question.id} data={question} />;
        })}
      </StyledQuestions>
    </>
  );
};

export default AllQuestions;
