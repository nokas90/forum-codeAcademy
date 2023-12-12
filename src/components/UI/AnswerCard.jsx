import { useState, useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UserContext";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import EditAnswer from "../pages/EditAnswer";
import {CalculateTimeAgo, FormatDate} from "../helperFunctions/DataManipulation";

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 600px;
  background-color: #e23e57;
  border-radius: 3px;
  margin: 0 auto;
  padding: 10px;
  border: solid lightcoral 1px;
  box-shadow: 3px 0px 20px 5px #522546;

  .answer {
    color: #dfdfdf;
    position: relative;

    p {
      font-size: 0.8rem;
    }
  }

  .oneAnswer {
    position: relative;
    display: flex;
    gap: 10px;
    flex-grow: 3;
    padding-right: 80px;
    color: #deffde;

    justify-content: space-between;
    align-items: start;
    font-size: 0.9rem;

    > div {
      display: flex;
      gap: 5px;
    }
  }
  .answerDate {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    align-self: end;
    color: #522546;
  }

  .answerSummary {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #dfdfdf;
    margin-bottom: 10px;
    > div {
      display: flex;
      gap: 5px;
    }
  }
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const AbsoluteButton = styled.button`
  font-size: 0.7rem;
  position: absolute;
`;
const VoteButton = styled.button`
  font-size: 0.7rem;
`;

const AnswerCard = ({ data }) => {
  const { setAnswers, AnswersActionTypes } = useContext(ForumAnswersContext);
  const { loggedInUser } = useContext(UsersContext);
  const [editClick, setEditClick] = useState(false);
  const [userVotes, setUserVotes] = useState(
    JSON.parse(localStorage.getItem("userVotesAnswer")) || {}
  );
  const [isUserVoted, setIsUserVoted] = useState(
    userVotes[data.id] === "upvote" || userVotes[data.id] === "downvote"
      ? userVotes[data.id]
      : null
  );
  const [votes, setVotes] = useState("");

  const handleUpvote = () => {
    if (!isUserVoted) {
      const newVoteCount = data.numberOfLikes + 1;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: "upvote" });
      localStorage.setItem(
        "userVotesAnswer",
        JSON.stringify({ ...userVotes, [data.id]: "upvote" })
      );
      setIsUserVoted("upvote");
      setVotes(newVoteCount);
    } else if (isUserVoted === "upvote") {
      const newVoteCount = data.numberOfLikes - 1;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: null });
      localStorage.setItem(
        "userVotesAnswers",
        JSON.stringify({ ...userVotes, [data.id]: null })
      );
      setIsUserVoted(null);
      setVotes(newVoteCount);
    } else {
      const newVoteCount = data.numberOfLikes + 2;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: "upvote" });
      localStorage.setItem(
        "userVotesAnswer",
        JSON.stringify({ ...userVotes, [data.id]: "upvote" })
      );
      setIsUserVoted("upvote");
      setVotes(newVoteCount);
    }
  };

  const handleDownvote = () => {
    if (!isUserVoted) {
      const newVoteCount = data.numberOfLikes - 1;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: "downvote" });
      localStorage.setItem(
        "userVotesAnswer",
        JSON.stringify({ ...userVotes, [data.id]: "downvote" })
      );
      setIsUserVoted("downvote");
      setVotes(newVoteCount);
    } else if (isUserVoted === "downvote") {
      const newVoteCount = data.numberOfLikes + 1;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: null });
      localStorage.setItem(
        "userVotesAnswer",
        JSON.stringify({ ...userVotes, [data.id]: null })
      );
      setIsUserVoted(null);
      setVotes(newVoteCount);
    } else {
      const newVoteCount = data.numberOfLikes - 2;

      fetch(`http://localhost:8080/answers/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfLikes: newVoteCount }),
      });

      setAnswers((prevAnswersData) => ({
        ...prevAnswersData,
        numberOfLikes: newVoteCount,
      }));

      setUserVotes({ ...userVotes, [data.id]: "downvote" });
      localStorage.setItem(
        "userVotesAnswer",
        JSON.stringify({ ...userVotes, [data.id]: "downvote" })
      );
      setIsUserVoted("downvote");
      setVotes(newVoteCount);
    }
  };

  return (
    data && (
      <>
        <AnswersContainer>
          <div className="answer">
            {loggedInUser.id === data.creatorId && (
              <>
                <AbsoluteButton
                  style={{ right: "-8px", top: "18px", color: "red" }}
                  onClick={() => {
                    if (window.confirm("Delete?")) {
                      setAnswers({
                        type: AnswersActionTypes.remove,
                        id: data.id,
                      });
                    }
                  }}
                >
                  Delete
                </AbsoluteButton>
                <AbsoluteButton
                  style={{ right: "-8px", top: "-8px", color: "blue" }}
                  onClick={() => setEditClick(true)}
                >
                  Edit
                </AbsoluteButton>
              </>
            )}

            <div className="answerSummary">
              {loggedInUser && (
                <VoteButton
                  onClick={handleDownvote}
                  disabled={isUserVoted === "downvote"}
                >
                  Down
                </VoteButton>
              )}

              <div>
                <span>{data.numberOfLikes}</span>
                <span>votes</span>
              </div>
              {loggedInUser && (
                <VoteButton
                  onClick={handleUpvote}
                  disabled={isUserVoted === "upvote"}
                >
                  Up
                </VoteButton>
              )}
            </div>
            <div className="answerContent">
              <p>{data.answer}</p>
            </div>
          </div>
          <div className="answerDate">
          <span>Created: {FormatDate(data.createdDate)}</span>
          {data.isEdited && (
            <span>Edited: {CalculateTimeAgo(data.editedDate)}</span>

      )}
          </div>
        </AnswersContainer>
        {editClick && <EditAnswer data={data} setEditClick={setEditClick} />}
      </>
    )
  );
};

export default AnswerCard;
