import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./contexts/UserContext";
import ForumQuestionsContext, {
  ForumQuestionsProvider,
} from "./contexts/ForumQuestionsContext";
import { ForumAnswersProvider } from "./contexts/ForumAnswersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ForumQuestionsProvider>
      <UsersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsersProvider>
  </ForumQuestionsProvider>
);
