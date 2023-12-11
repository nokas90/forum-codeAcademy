import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
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
const StyledHeader = styled.h1`
  text-align: center;
  color: #dfdfdf;

  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  margin: 15px 0px;
`;

const EditAnswer = ({ data, setEditClick }) => {
  const { setAnswers, AnswersActionTypes } =
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
  }, [data.id]);
  const validationSchema = Yup.object({
    answer: Yup.string()
      .max(250, "Reached maximum symbols 250")
      .required("This field must be filled")
      .trim(),
  });

  return (
    <StyledEditFormPage>
      <StyledHeader>Edit Answer</StyledHeader>
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
