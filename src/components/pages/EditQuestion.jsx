import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../contexts/UserContext";
import ForumQuestionsContext from "../../contexts/ForumQuestionsContext";
import FormikInput from "../UI/FormitInput";

const StyledEditFormPage = styled.main`
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

const EditQuestion = () => {
  const { setQuestions, QuestionsActionTypes } = useContext(
    ForumQuestionsContext
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    title: "",
    question: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(!data.title){
          // navigate('/');
        }
        setFormValues({
          ...data,
        });
      })
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(50, "Maximum length 50 symbols")
      .required("This field must be filled")
      .trim(),
    question: Yup.string()
      .min(10, "Minimum length 10 symbols")
      .required("This field must be filled")
      .trim(),
  });

  // const formik = Formik({
  //   initialValues: formValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     // console.log(values);
  //     const finalValues = {
  //       ...values,
  //       editedDate: new Date().toLocaleString(),
  //       isEdited: true,
  //     };
  //     // console.log(finalValues);
  //     setQuestions({
  //       type: QuestionsActionTypes.edit,
  //       id: id,
  //       data: finalValues,
  //     });
  //     console.log(finalValues);
  //     // navigate('/questions/allQuestions');
  //   },
  // });

  return (
    <StyledEditFormPage>
      <h1>Edit Game</h1>
      {
        formValues.title && <Formik
          initialValues = {formValues}
          validationSchema = {validationSchema}
          onSubmit = {(values) => {
            // console.log(values);
            const finalValues = {
              ...values,
              isEdited: true,
              editedDate: new Date().toLocaleString(),

              
            };
            console.log(finalValues);
            setQuestions({
              type: QuestionsActionTypes.edit,
              id: id,
              data: finalValues
            });
            navigate(`/questions/${id}`);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
            <FormikInput type="text" name="title" formik={props} />
            <FormikInput type="text" name="question" formik={props} />
            <button type="Submit">Edit Question</button>
          </form>
          )}
        </Formik>
      }
    </StyledEditFormPage>
  );
};

export default EditQuestion;
