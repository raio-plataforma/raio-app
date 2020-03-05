import React from "react";
import styled from "styled-components";

const CardProfessional = (props) => {
  return (
    <Container>
      <Card>
        <Group>
          <Name>{props.name}</Name>
          <Destac>{props.email}</Destac>
          <Textarea>{props.address}</Textarea>
          <Textarea>{props.phone}</Textarea>
          <Textarea>{props.cnpj}</Textarea>
          <Textarea>{props.pcd}</Textarea>
          <Textarea>{props.gender}</Textarea>
          <Textarea>{props.self_declaration}</Textarea>
          <Bio>{props.bio}</Bio>
          <Destac>{props.links}</Destac>
        </Group>
      </Card>
    </Container>
  );
};

export default CardProfessional;

export const Container = styled.div`
    border-radius: 8px;
    box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
    border: 1px solid transparent;
    transition: border 300ms ease-in;
    min-width: 100%;
    margin-top: 2vh;

    &:hover {
        border: 1px solid #fc9b44;
    }
`;
export const Card = styled.div`
  padding: 20px;
`;
export const Textarea = styled.p`
    font-size: 16px;  
    color: #FFDEAD;
    margin-top: 1vh;
`;
export const Group = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.4vw 0;
`;
export const Name = styled.p`
    color: #FFDEAD;
    font-size: 28px;
    margin-top: 1vh;
`;
export const Destac = styled.p`
    color: #fc9b44;
    font-size: 16px;
    margin-top: 1vh;
`;
export const Bio = styled.p`
  width: 500px;
  display: flex;
  flex-wrap: wrap;
`;
