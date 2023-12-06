import React, { useContext, useState } from "react";
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
const FiltersContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 10px;
  justify-content: center;
  align-items: center;
  > label {
    padding-left: 3px;
    font-size: 0.8rem;
    color: #f00000;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 5px;
`;

const AllQuestions = () => {
  const { loggedInUser } = useContext(UsersContext);
  const { questions } = useContext(ForumQuestionsContext);

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
    : questions.filter((question) => question.answers.length === 0);

  const sortedQuestions =
    sortCriteria === "date"
      ? filteredAndSortedQuestions.sort(compareDates)
      : filteredAndSortedQuestions.sort(compareVotes);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Questions</h1>
      <div>
        {loggedInUser && (
          <Link to="/questions/newQuestion">
            <button>Ask Question</button>
          </Link>
        )}
        <FiltersContainer>
          <h3>Filters</h3>
          <label>
            <StyledCheckbox
              type="checkbox"
              checked={showAnswered}
              onChange={() => setShowAnswered(!showAnswered)}
            />
            Show Answered Questions
          </label>
          <label>
            <StyledCheckbox
              type="checkbox"
              checked={sortOrder === "asc"}
              onChange={toggleSortOrder}
            />
            Sort Ascending by Date
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
      </div>

      <StyledQuestions>
        {sortedQuestions.map((question) => (
          <QuestionCard key={question.id} data={question} />
        ))}
      </StyledQuestions>
    </>
  );
};

export default AllQuestions;
