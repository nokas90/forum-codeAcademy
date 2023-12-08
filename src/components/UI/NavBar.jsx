import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UserContext";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px 50px;
  align-items: center;
  background-color: #b0a695;
  margin-bottom: 20px;

  .logo {
    font-size: 1.3rem;
    margin: 0;
  }
  ul {
    margin: 0px;
  }
  li {
    list-style-type: none;
    padding: 0px;
    margin-bottom: 5px;
    font-weight: 500;
  }
  a {
    text-decoration: none;
    color: #776b5d;
    font-weight: 700;
  }
  a.active {
    color: green;
  }

  div.userInfo {
    display: flex;
    align-items: center;
    gap: 20px;
    > img {
      height: 30px;
    }
  }
`;

const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div>
        <p className="logo">
          <NavLink to="/">Forum</NavLink>
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/questions/allQuestions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Q and A
            </NavLink>
          </li>
        </ul>
      </nav>
      {!loggedInUser ? (
        <ul>
          <li>
            <NavLink
              to="/user/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      ) : (
        <div>
          <div className="userInfo">
            <img
              src={loggedInUser.profilePic}
              alt={`${loggedInUser.userName} profile picture`}
            />
            <span>{loggedInUser.userName}</span>
            <button
              onClick={() => {
                setLoggedInUser("");
                navigate("/");
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </StyledHeader>
  );
};

export default NavBar;
