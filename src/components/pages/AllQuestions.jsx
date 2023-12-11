import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import UsersContext from "../../contexts/UserContext";
import { styled } from "styled-components";
import QuestionCard from "../UI/QuestionCard";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Typewriter from "../UI/TypeWriter";


const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #311d3f;
  /* border: solid #dfdfdf 1px; */
  padding: 10px;
`;

const StyledHeader = styled.h1`
  text-align: center;
  color: #420b3b;

  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  margin: 15px 0px;
`;

const StyledQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #dfdfdf;

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
    gap: 5px;
    font-size: 0.8rem;
  }
  .questionContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;

    > h3 {
      margin-bottom: 10px;
      text-align: center;
    }
    > p {
      font-size: 0.9rem;
      color: #dfdfdf;
    }
  }
`;
const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  > h3 {
    color: #dfdfdf;
  }
  > label {
    padding-left: 3px;
    font-size: 0.8rem;
    color: #dfdfdf;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const AllQuestions = () => {
  const { loggedInUser } = useContext(UsersContext);
  const { questions, setQuestions, QuestionsActionTypes } = useContext(ForumQuestionsContext);
  const { answers } = useContext(ForumAnswersContext);

  // State
  const [showAnswered, setShowAnswered] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCriteria, setSortCriteria] = useState("date");

  // Event Handlers
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const toggleSortCriteria = () => {
    setSortCriteria((prevCriteria) =>
      prevCriteria === "date" ? "votes" : "date"
    );
  };

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then((res) => res.json())
      .then((data) =>
        setQuestions({
          type: QuestionsActionTypes.get_all,
          data: data,
        })
      );
  }, []);

  // Sorting Functions
  const compareDates = (a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  };

  const compareVotes = (a, b) => {
    return sortOrder === "asc"
      ? a.numberOfLikes - b.numberOfLikes
      : b.numberOfLikes - a.numberOfLikes;
  };

  // Filtered, sorted, and sorted by criteria questions

  const filteredAndSortedQuestions = showAnswered
    ? questions
    : questions.filter(
        (question) =>
          !answers.some((answer) => answer.questionId === question.id)
      );

  const sortedQuestions =
    sortCriteria === "date"
      ? filteredAndSortedQuestions.sort(compareDates)
      : filteredAndSortedQuestions.sort(compareVotes);

  useEffect(() => {
    // code
  }, []);

  return (
    <>
      <StyledHeader><Typewriter text={'All Questions'} speed={50}/></StyledHeader>
      <TopWrapper>
        <FiltersContainer>
          <h3>Filters</h3>
          <label>
            <StyledCheckbox
              type="checkbox"
              checked={!showAnswered}
              onChange={() => setShowAnswered(!showAnswered)}
            />
            Hide Answered
          </label>
          <label>
            <StyledCheckbox
              type="checkbox"
              checked={sortOrder === "asc"}
              onChange={toggleSortOrder}
            />
            Oldest First
          </label>
          <label>
            <StyledCheckbox
              type="checkbox"
              checked={sortCriteria === "votes"}
              onChange={toggleSortCriteria}
            />
            Most Voted
          </label>
        </FiltersContainer>
      </TopWrapper>
      {loggedInUser && (
        <ButtonWrapper>
          <Link to="/questions/newQuestion">
            
            <PostAddIcon fontSize="large"/>
          </Link>
        </ButtonWrapper>
      )}

      <StyledQuestions>
        {sortedQuestions.map((question) => (
          <QuestionCard key={question.id} data={question} />
        ))}
      </StyledQuestions>
    </>
  );
};

export default AllQuestions;
