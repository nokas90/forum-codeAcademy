import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #420b3b;
  color: green;
  text-align: center;
`;

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <FooterContainer>
      &copy; Made by v4lode {currentDate}
    </FooterContainer>
  );
};

export default Footer;
