import styled from "styled-components";
import { Link } from "react-router-dom";
import {CalculateTimeAgo, FormatDate} from "../helperFunctions/DataManipulation";



const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px 20px;
  /* border: solid #dfdfdf 1px; */
  border-radius: 3px;
  background-color: #522546;
  color: #dfdfdf;
  box-shadow: 3px 0px 20px 5px #E23E57;
  
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
    /* border: yellowgreen 1px solid; */
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 3px;
    font-size: 0.8rem;
    color: #E23E57;
    
  }
  .questionContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;

    h3 {
      margin-bottom: 10px;
      /* text-align: center; */
    color: green;
    }
    p{
      color: #dfdfdf;
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
        <div className="questionsDate">
          <span>Creator: {data.creatorName}</span>
          <span>Created: {FormatDate(data.createdDate)}</span>
          {data.isEdited && (
            <span>Edited: {CalculateTimeAgo(data.editedDate)}</span>

      )}
        </div>
      </div>
    </QuestionContainer>
  );
};

export default QuestionCard;
