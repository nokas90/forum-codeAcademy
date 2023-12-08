import "./App.css";
import NavBar from "./components/UI/NavBar";
import Login from "./components/pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Main from "./components/pages/Main";
import OneQuestion from "./components/pages/OneQuestion";
import AllQuestions from "./components/pages/AllQuestions";
import AddQuestion from "./components/pages/AddQuestion";
import AddAnswer from "./components/pages/AddAnswer";
import EditQuestion from "./components/pages/EditQuestion";
import EditAnswer from "./components/pages/EditAnswer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/questions">
          <Route path="allQuestions" element={<AllQuestions />} />
          <Route path="newQuestion" element={<AddQuestion />} />
          <Route path=":id">
            <Route index element={<OneQuestion />} />
            <Route path="addAnswer" element={<AddAnswer />} />
            <Route path="edit" element={<EditQuestion />} />
            <Route path="edit/:id" element={<EditAnswer />} />
          </Route>
        </Route>
        <Route path="/user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
