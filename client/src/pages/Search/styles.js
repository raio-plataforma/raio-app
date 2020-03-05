import styled from 'styled-components';

export const TitleSearch = styled.h1`
  text-transform: uppercase;
  color: #fc9b44;
  text-align: center;
  font-size: 40px;
  margin: 2vh 0;
   
`

export const SubTitle = styled.h3`
  text-transform: uppercase;
  color: #fc9b44;
  text-align: center;
  font-size: 20px;
  margin-bottom: 2vh;
`

export const Container = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: 95%;
  display: block;
  margin: 10px auto;
`;

export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  margin: 2vh 0;
`

export const Label = styled.p`
  font-size: 17px;
`
export const Group = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin: 0.4vw 0;
  justify-content: space-between;
  color: #fc9b44;
`;

export const Textarea = styled.p`
  font-size: 17px;  
  margin-left: 0.5vw;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapperResultSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const SearchResultEnterprise = styled.div`
  color: wheat;
  @media(min-width: 576px) {
    width: 500px;
  }
`;

export const Form = styled.form`
  width: 50%;
  padding: 20px;
`

export const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

export const Text = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Link = styled.a`
  margin-left: 1vh;
  color: #FFFFFF;
  text-decoration: underline;
`
