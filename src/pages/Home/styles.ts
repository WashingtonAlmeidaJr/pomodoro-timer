import styled from "styled-components";

export const HomeContainer=styled.main`
flex:1;

display:flex;
flex-direction:column;
align-items: center;
justify-content: center;


form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:3.5rem



}

@media(max-width: 800px) {
    flex-direction: column;
    position: relative;
  }

  @media(max-width: 768px) {
    flex-direction: column;
  }
`

