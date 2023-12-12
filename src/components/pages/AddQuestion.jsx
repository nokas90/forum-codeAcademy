import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UserContext";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import FormikInput from "../UI/FormitInput";
import Typewriter from "../UI/TypeWriter";


const StyledAddFormPage = styled.main`
  height: calc(100vh - 91px);

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

const AddQuestion = () => {
  const { setQuestions, QuestionsActionTypes } = useContext(
    ForumQuestionsContext
  );
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const values = {
    title: "",
    question: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(100, "Reached maximum 100 words")
      .required("This field must be filled")
      .trim(),
    question: Yup.string()
      .min(10, "Minimum length 10 symbols")
      .required("This field must be filled")
      .trim(),
  });

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      const finalValues = {
        id: uuid(),
        creatorId: loggedInUser.id,
        createdDate: new Date().toISOString(),
        creatorName: loggedInUser.userName,
        ...values,
        numberOfLikes: 0,
        isEdited: false,
      };
      // console.log(finalValues);
      setQuestions({
        type: QuestionsActionTypes.add,
        data: finalValues,
      });
      navigate("/questions/allQuestions");
    },
  });

  return (
    <StyledAddFormPage>
      <StyledHeader><Typewriter text={"Add New Question"} speed={50} /></StyledHeader>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput type="text" name="title" formik={formik} />
        <FormikInput
          type="textarea"
          rows={10}
          columns={30}
          name="question"
          formik={formik}
        />
        <button type="Submit">Create Question</button>
      </form>
    </StyledAddFormPage>
  );
};

export default AddQuestion;
