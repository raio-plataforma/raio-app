import styled from 'styled-components';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Button = styled.button`
  font-size: 16px;
  background-color: #FF4500;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`

export const Group = styled.div`
  display: flex;
  width: 100%;
  margin: 1vh 0;
`

export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  align-self: center;
`

export const Textarea = styled.p`
  font-size: 16px; 
  color: #FFFFFF; 
`;

export const Label = styled.label`
  font-size: 16px;
  margin-right: 1vw;
  color: #FFFFFF;
`;

export const Container = styled.div`
  &.header {
    width: 100%;
    
    > .container {
      align-items: stretch;
    }
    
  }

  .container {
    box-shadow:
    0px 3px 3px -2px rgba(0,0,0,0.2),
    0px 3px 4px 0px rgba(0,0,0,0.14),
    0px 1px 8px 0px rgba(0,0,0,0.12);
    border-radius: 3px;
    background-color: #f7cc94;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .profile {
      flex: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .profile-wrapper {
      display: flex;
      .avatar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 100px;

        .image {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          color: #f7cc94;
          background: #200122;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
        .user-info {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          > * {
            display: flex;
            align-items: center;
            margin: 2px 0;
          }
        }
      }
    }
  }
`

export const GroupButton = styled.div`
  display: flex;
  width: 100%;
  margin: 1vh 0;
  justify-content: flex-end;
`
export const ButtonDelete = styled.button`
  font-size: 16px;
  background-color: #FF4500;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  margin-left: 2vh;
`

export const GroupButtons = styled.div`
  display: flex;
  width: 100%;
  margin: 1vh 0;
  justify-content: flex-end;
`

