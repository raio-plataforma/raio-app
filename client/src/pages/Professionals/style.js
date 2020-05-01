import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: 95%;
  display: block;
  margin: 10px auto;
`;
export const Title = styled.h1`
  font-size: 22px;  
  color:#fc9b44;
  margin: 2vw 0;
  text-align: center;
`;
export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  min-height: calc(100vh - 200px);
`
export const WrapperChoices = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`

/* STYLES ALLENTERPRISE */

export const WrapperSearchEnterprise = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StyledButtonSearch = styled.button`
  padding: 10px;
  background-color: #6f0000;
  color: #fc9b44;
  `
  export const GroupButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
`;