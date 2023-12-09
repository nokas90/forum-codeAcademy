import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import UsersContext from "../../contexts/UserContext";
import AddAnswer from "../pages/AddAnswer";
import VoteComponent from "../UI/VoteComponent";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import EditAnswer from "../pages/EditAnswer";

const AnswersContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border: solid red 1px;

  .oneAnswer {
    position: relative;
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

const AbsoluteButton = styled.button`
  font-size: 0.7rem;
  position: absolute;
`;

const AnswerCard = ({ data }) => {
  // console.log("Kas ta data?", data);
  const { answers, setAnswers, AnswersActionTypes } =
    useContext(ForumAnswersContext);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const [editClick, setEditClick] = useState(false);

  return (
    data && (
      <>
        <AnswersContainer>
          <div className="oneAnswer">
            {loggedInUser.id === data.creatorId && (
              <>
                <AbsoluteButton
                  style={{ right: "3px", top: "30px", color: "red" }}
                  onClick={() => {
                    if (window.confirm("Delete?")) {
                      setAnswers({
                        type: AnswersActionTypes.remove,
                        id: data.id,
                      });
                      // navigate("/questions/allQuestions");
                    }
                  }}
                >
                  Delete
                </AbsoluteButton>
                <AbsoluteButton
                  style={{ right: "3px", top: "3px", color: "blue" }}
                  onClick={() => setEditClick(true)}
                >
                  Edit
                </AbsoluteButton>
              </>
            )}

            <div>
              <span>{data.numberOfLikes}</span>
              <span>votes</span>
            </div>
            <div className="answerContent">
              <p>{data.answer}</p>
              <span>Created: {data.createdDate}</span>
              {data.isEdited && <span>Edited: {data.editedDate}</span>}
            </div>
          </div>
        </AnswersContainer>
        {editClick && <EditAnswer data={data} setEditClick={setEditClick} />}
      </>
    )
  );
};

export default AnswerCard;
