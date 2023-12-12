import { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import UsersContext from "../../contexts/UserContext";
import FormikInput from "../../components/UI/FormitInput";
import Typewriter from "../UI/TypeWriter";

const StyledLoginPage = styled.main`
  height: calc(100vh - 100px);

  display: flex;
  flex-direction: column;
  align-items: center;

  > form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > div{
      display: grid;
      grid-template-columns: 1fr 3fr;

      > p{
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

const Login = () => {

  const navigate = useNavigate();
  const { users, setLoggedInUser } = useContext(UsersContext);
  const [failedToLogin, setFailedToLogin] = useState(false);

  const formValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Field must be a valid email')
      .required('Field must be filled')
      .trim(),
    password: Yup.string()
      .required('Field must be filled')
      .trim()
  });
  
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.email === values.email && bcrypt.compareSync(values.password, user.password));

      if(loggedInUser === undefined) {
        setFailedToLogin(true);
        // console.log('failed to login')
      } else {
        setLoggedInUser(loggedInUser);
        // console.log('logged in')
        navigate('/questions/allQuestions');
      }
    }
  });

  return (
    <StyledLoginPage>
      <StyledHeader><Typewriter text={'Login'} speed={50}/></StyledHeader>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="email"
          name="email"
          formik={formik}
          placeholder="Enter your account email"
        />
        <FormikInput
          type="password"
          name="password"
          formik={formik}
          placeholder="Enter your account password"
        />
        <button type="submit">Login</button>
      </form>
      {
        failedToLogin && <p>No user with such credentials</p>
      }
    </StyledLoginPage>
  );
}
 
export default Login;