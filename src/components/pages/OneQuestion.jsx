import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import UsersContext from "../../contexts/UserContext";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import AnswerCard from "../UI/AnswerCard";
import Typewriter from "../UI/TypeWriter";

const TopWrapper = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #88304e;
`;

const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  padding-right: 50px;

  /* border: solid #dfdfdf 1px; */
  border-radius: 3px;
  background-color: #522546;
  color: #dfdfdf;
  box-shadow: 3px 0px 20px 5px #e23e57;

  > p h3 {
    margin-top: 0;
  }

  .questionSummary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

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
    font-size: 0.8rem;
    color: #e23e57;
  }
  .questionContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 70%;

    > h3 {
      margin-bottom: 10px;
      text-align: start;
      color: green;
    }
    > p {
      font-size: 0.9rem;
      color: #dfdfdf;
    }
  }
`;
const VoteButton = styled.button`
  font-size: 0.7rem;
`;

const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledHeader = styled.h1`
  text-align: center;
  color: #420b3b;

  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  margin: 15px 0px;
`;

const AbsoluteButton = styled.button`
  font-size: 0.7rem;
  position: absolute;
`;

const OneQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const { setQuestions, QuestionsActionTypes } = useContext(
    ForumQuestionsContext
  );
  const [userVotes, setUserVotes] = useState(
    JSON.parse(localStorage.getItem("userVotes")) || {}
  );
  const [isUserVoted, setIsUserVoted] = useState(
    userVotes[id] === "upvote" || userVotes[id] === "downvote"
      ? userVotes[id]
      : null
  );
  const { answers, setAnswers } = useContext(ForumAnswersContext);
  const [votes, setVotes] = useState("");
  const { loggedInUser } = useContext(UsersContext);

  const handleUpvote = () => {
    if (!isUserVoted) {
      const newVoteCount = question.numberOfLikes + 1;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: "upvote" });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: "upvote" })
      );
      setIsUserVoted("upvote");
      setVotes(newVoteCount);
    } else if (isUserVoted === "upvote") {
      const newVoteCount = question.numberOfLikes - 1;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: null });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: null })
      );
      setIsUserVoted(null);
      setVotes(newVoteCount);
    } else {
      const newVoteCount = question.numberOfLikes + 2;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: "upvote" });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: "upvote" })
      );
      setIsUserVoted("upvote");
      setVotes(newVoteCount);
    }
  };

  const handleDownvote = () => {
    if (!isUserVoted) {
      const newVoteCount = question.numberOfLikes - 1;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: "downvote" });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: "downvote" })
      );
      setIsUserVoted("downvote");
      setVotes(newVoteCount);
    } else if (isUserVoted === "downvote") {
      const newVoteCount = question.numberOfLikes + 1;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: null });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: null })
      );
      setIsUserVoted(null);
      setVotes(newVoteCount);
    } else {
      const newVoteCount = question.numberOfLikes - 2;

      fetch(`http://localhost:8080/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setQuestion((prevQuestionData) => ({
        ...prevQuestionData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [id]: "downvote" });
      localStorage.setItem(
        "userVotes",
        JSON.stringify({ ...userVotes, [id]: "downvote" })
      );
      setIsUserVoted("downvote");
      setVotes(newVoteCount);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch question
      fetch(`http://localhost:8080/questions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.title) {
            navigate("/");
          }
          setQuestion(data);
          localStorage.setItem("questionData", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
        });
    }
  }, [setQuestions]);

  return (
    question && (
      <TopWrapper>
        <StyledHeader>
          <Typewriter text={"Question"} speed={50} />
        </StyledHeader>
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
            {loggedInUser && (
              <VoteButton
                onClick={handleUpvote}
                disabled={isUserVoted === "upvote"}
              >
                Up
              </VoteButton>
            )}

            <div>
              <span>{question.numberOfLikes}</span>
              <span>votes</span>
            </div>
            {loggedInUser && (
              <VoteButton
                onClick={handleDownvote}
                disabled={isUserVoted === "downvote"}
              >
                Down
              </VoteButton>
            )}
          </div>
          <div className="questionContent">
            <h3>{question.title}</h3>
            <p>{question.question}</p>
            <div className="questionsDate">
              {question.Creator && <span>Creator: {question.creatorName}</span>}
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
        <AnswersWrapper>
          {answers &&
            answers
              .filter((answer) => {
                const isMatch = answer.questionId === question.id;
                return isMatch;
              })
              .map((answer) => {
                return <AnswerCard key={answer.id} data={answer} />;
              })}
        </AnswersWrapper>
      </TopWrapper>
    )
  );
};

export default OneQuestion;
