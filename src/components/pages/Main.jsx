import styled from "styled-components";

const StyledMain = styled.main`
  height: calc(100vh - 83px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  > h1 {
    font-size: 3rem;
    margin: 0;
  }
  > p {
    width: 60%;
    font-size: 1.3rem;
    text-align: justify;
    line-height: 150%;
  }
`;

const Main = () => {
  return (
    <StyledMain>
      <h1>Forum</h1>
      <p>
      Forum is a community of passionate and dedicated programmers, both experienced and beginners. Here, you'll find a platform to ask questions, offer advice, share resources and explore topics related to the world of programming.
      </p>
    </StyledMain>
  );
}
 
export default Main;