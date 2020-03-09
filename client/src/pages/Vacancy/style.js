import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  display: flex;
  margin: 10px auto;
  flex-direction: column;
`;

export const Background = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 200px);
`

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
`

export const Label = styled.p`
  font-size: 17px;
`
export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Textarea = styled.p`
  font-size: 17px;  
  margin-left: 0.5vw;
  color: #000;
`;

export const Form = styled.form`
  width: 50%;
  margin: 25px;
  padding: 30px;
`

export const WrapButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`