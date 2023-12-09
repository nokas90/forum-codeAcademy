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
  const [formValues, setFormValues] = useState({
    answer: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/answers/${data.id}`)
      .then((res) => res.json())
      .then((newData) => {
        if (!newData.title) {
        }
        setFormValues({
          ...newData,
        });
      });
  }, []);
  const validationSchema = Yup.object({
    answer: Yup.string()
      .max(250, "Reached maximum symbols 250")
      .required("This field must be filled")
      .trim(),
  });

  return (
    <StyledEditFormPage>
      <h1>Edit Answer</h1>
      {formValues.answer && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const finalValues = {
              ...values,
              isEdited: true,
              editedDate: new Date().toLocaleString(),
            };
            setAnswers({
              type: AnswersActionTypes.edit,
              id: data.id,
              data: finalValues,
            });
            setEditClick(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput
                name="answer"
                value={props.values.answer}
                id="answer"
                type="textarea"
                rows={5}
                columns={10}
                onBlur={props.handleBlur}
                formik={props}
              />
              <button type="Submit">Edit Answer</button>
            </form>
          )}
        </Formik>
      )}
    </StyledEditFormPage>
  );
};

export default EditAnswer;
