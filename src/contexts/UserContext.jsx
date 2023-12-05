import { createContext, useEffect, useReducer, useState } from "react";

const UsersContext = createContext();

const UsersActionTypes = {
  get_all: "get all users from db",
  add: "add new user",
};

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.get_all:
      return action.data;
    case UsersActionTypes.add:
      fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
};

const UsersProvider = ({ children }) => {

  const [users, setUsers] = useReducer(reducer, []);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => setUsers({
        type: UsersActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        UsersActionTypes,
        loggedInUser,
        setLoggedInUser
      }}
    >
      { children }
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;