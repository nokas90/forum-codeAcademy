import React from 'react';
import { styled } from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  background-color: lightcoral;

  .logo{
    font-weight:700;
    font-size:1.3rem;
    margin: 0;
  }


`



const NavBar = () => {
  return (
    <StyledHeader>
      <div>
        <p className='logo'>Forum</p>
      </div>
      <div>
        <input type="search" placeholder="Search" />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100px'
      }}>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </StyledHeader>
  );
};

export default NavBar;
