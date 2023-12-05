import styled from "styled-components";
import { Link } from "react-router-dom";

const QuestionContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 80%;
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

const QuestionCard = ({ data }) => {
  return (
    <QuestionContainer>
      <div className="questionSummary">
        <div>
          <span>{data.numberOfLikes}</span>
          <span>votes</span>
        </div>
      </div>
      <div className="questionContent">
        <Link
          to={`/questions/${data.id}`}
          style={{
            color: "unset",
            textDecoration: "unset",
          }}
        >
          <h3>{data.title}</h3>
        </Link>

        <p>{data.question}</p>
        <p>Created: {data.createdDate}</p>
      </div>
    </QuestionContainer>
  );
};

export default QuestionCard;
