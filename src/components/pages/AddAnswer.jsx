import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../contexts/UserContext";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
import FormikInput from "../UI/FormitInput";
import Typewriter from "../UI/TypeWriter";

const StyledAddFormPage = styled.main`
    height: calc(100vh - 100px);


  display: flex;
  flex-direction: column;
  align-items: center;

  > form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div {
      display: grid;
      grid-template-columns: 1fr 3fr;

      > p {
        grid-column: span 2;
      }
    }
  }
`;
const StyledHeader = styled.h1`
  text-align: center;
  color: #420b3b;

  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  margin: 15px 0px;
`;

const AddAnswer = () => {
  const { id } = useParams();

  const { setAnswers, AnswersActionTypes } = useContext(
    ForumAnswersContext
  );
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const initialValues = {

    answer: "",
  };

  const validationSchema = Yup.object({
    answer: Yup.string()
      .min(3, "Minimum length 3 symbols")
      .max(500, "Reached maximum 500 words")
      .required("This field must be filled")
      .trim(),
  });

  const formik = useFormik({
    initialValues: initialValues ,
    validationSchema,
    onSubmit: async (values) => {
      const answerData = {
        id: uuid(),
        questionId: id,
        creatorId: loggedInUser.id,
        creatorName: loggedInUser.userName,
        answer: values.answer,
        numberOfLikes: 0,
        isEdited: false,
        createdDate: new Date().toISOString(),
      };
      // console.log("Question ID before setAnswers:", id);
      // console.log(answerData);
      setAnswers(({
        type: AnswersActionTypes.add,
        data: answerData
      }));
      // console.log("State after update:", answers);
      navigate(`/questions/${id}`);
      // console.log("Question ID after navigate:", id);
    },
  });

  return (
    <StyledAddFormPage>
      <StyledHeader><Typewriter text={"Add Answer"} speed={50} /></StyledHeader>
      <form onSubmit={formik.handleSubmit}>
      <FormikInput
          type="textarea"
          rows={10}
          columns={30}
          name="answer"
          formik={formik}
        />
        <button type="submit">Submit Answer</button>
      </form>
    </StyledAddFormPage>
  );
};

export default AddAnswer;
