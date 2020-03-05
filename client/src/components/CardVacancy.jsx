import React from "react";
import styled from "styled-components";

const CardVacancy = (props) => {
  return (
    <Card>
      <Group>
        <Label>Nome da empresa:</Label>
        <Textarea>{props.enterpriseName}</Textarea>
      </Group>
      <Group>
        <Label>Título:</Label>
        <Textarea>{props.name}</Textarea>
      </Group>
      <Group>
        <Label>Funções:</Label>
        <Textarea>{props.function}</Textarea>
      </Group>
      <Group>
        <Label>Requisitos:</Label>
        <Textarea>{props.requirements}</Textarea>
      </Group>
      <Group>
        <Label>Endereço:</Label>
        <Textarea>{props.location}</Textarea>
      </Group>
      <Group>
        <Label>Cachê:</Label>
        <Textarea>{props.cache}</Textarea>
      </Group>
      <Group>
        <Label>Período:</Label>
        <Textarea>{props.period}</Textarea>
      </Group>
    </Card>
);
};

export default CardVacancy;

// export const Container = styled.div`
//   border-radius: 8px;
//   box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
//   border: 1px solid transparent;
//   transition: border 300ms ease-in;
//   min-width: 22vw;
//   min-height: 34vh;
//   margin-top: 2vh;

//   &:hover {
//     border: 1px solid #200112;
//   }
// `;
export const Card = styled.div`
  min-width: 22vw;
  min-height: 30vh;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 1vh 1vh;
  background-color: #fff;
  border-radius: 8px;
`;
export const Textarea = styled.p`
  font-size: 16px;  
`;
export const Label = styled.label`
  font-size: 16px;
  margin-right: 1vw;
`;
export const Group = styled.div`
  display: flex;
  margin: 0.4vw 0;
`;