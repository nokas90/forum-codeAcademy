import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px 50px;
  height: 60px;
  align-items: center;
  background-color: #311D3F;
  /* margin-bottom: 20px; */
  box-shadow: 0 20px 100px #047500f0;

  .logo {
    font-size: 1.7rem;
    margin: 0;
  }
  ul {
    margin: 0px;
    padding-left:0;

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
    justify-content: center;
    gap: 20px;
    color: #dfdfdf;
    > img {
      border-radius:50%;
      height: 40px;
      width:40px;
      object-fit: cover;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items:center;
    justify-content:center;
    gap:10px;
    height: 158px;
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
            
              
            
              <LogoutIcon style={{cursor:'pointer'}} onClick={() => {
                setLoggedInUser("");
                navigate("/");
              }}/>
            
          </div>
        </div>
      )}
    </StyledHeader>
  );
};

export default NavBar;
