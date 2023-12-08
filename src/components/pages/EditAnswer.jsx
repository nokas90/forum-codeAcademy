import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../contexts/UserContext";
import ForumAnswersContext from "../../contexts/ForumAnswersContext";
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

const EditAnswer = ({ data, setEditClick }) => {
  const { answers, setAnswers, AnswersActionTypes } =
    useContext(ForumAnswersContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    answer: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/answers/${data.id}`)
      .then(res => res.json())
      .then(newData => {
        console.log("Fetched Data:", newData);
  
        if (!newData.title) {
          // navigate('/');
        }
  
        setFormValues({
          ...newData
        });
      });
  }, [formValues.answer]);
  // console.log("Cia yra formValues",formValues)
  const validationSchema = Yup.object({
    answer: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(50, "Maximum length 50 symbols")
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
  //     setAnswers({
  //       type: AnswersActionTypes.edit,
  //       id: id,
  //       data: finalValues,
  //     });
  //     console.log(finalValues);
  //     // navigate('/questions/allQuestions');
  //   },
  // });


  return (
    <StyledEditFormPage>
      <h1>Edit Answer</h1>
      {formValues.answer && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const finalValues = {
              ...values,
              isEdited: true,
              editedDate: new Date().toLocaleString()
            };
          
            console.log("Before setAnswers:", finalValues);
          
            setAnswers({
              type: AnswersActionTypes.edit,
              id: id,
              data: finalValues
            });
          
            console.log("After setAnswers:", answers);
          
            setEditClick(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput type="text" name="answer" formik={props} />

              <button type="Submit">Edit Answer</button>
            </form>
          )}
        </Formik>
      )}
    </StyledEditFormPage>
  );
};

export default EditAnswer;
