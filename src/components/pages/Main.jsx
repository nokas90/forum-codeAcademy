import styled from "styled-components";

const StyledMain = styled.main`
  height: calc(100vh - 150px);
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 50px;

  > h1 {
    font-size: 6rem;
    margin: 0;
    color: #420b3b;
    font-family: "Times New Roman", Times, serif;
  }
  > p {
    width: 60%;
    font-size: 1.3rem;
    text-align: justify;
    line-height: 150%;
    color: #c0abab;
  }
  @media (max-width: 768px) {

    height: calc(100vh - 248px);

  }
`;

const Main = () => {
  return (
    <StyledMain>
      <h1>Forum</h1>
      <p>
        Forum is a community of passionate and dedicated programmers, both
        experienced and beginners. Here, you'll find a platform to ask
        questions, offer advice, share resources and explore topics related to
        the world of programming.
      </p>
    </StyledMain>
  );
};

export default Main;
