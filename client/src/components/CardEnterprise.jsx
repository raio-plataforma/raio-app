import React from "react"
import styled from "styled-components"
import InputText from "../components/InputText"

const Card = styled.div`
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

const Textarea = styled.p`
  font-size: 16px;  
`;
const Label = styled.label`
  font-size: 16px;
  margin-right: 1vw;
`;
const Group = styled.div`
  display: flex;
  margin: 0.4vw 0;
`;
const GroupCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4vw 0;
`;
const Button = styled.button`
  font-size: 16px;
  background-color: #3CB371;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: #fc9b44;
  &:hover {
    color: #000;
  }
  cursor: pointer;
`;

const CardEnterprise = ({ name, email, phone, id }) => {
  return (
    <Card>
      <GroupCard>
        <Group>
          <Label>Nome:</Label>
          <Textarea>{name}</Textarea>
        </Group>
        <Group>
          <Label>Email:</Label>
          <Textarea>{email}</Textarea>
        </Group>
        <Group>
          <Label>Telefone:</Label>
          <Textarea>{phone}</Textarea>
        </Group>
        <Group>
          <StyledLink to={`/listagem/vagas/${id}`}>
            Lista de vagas postadas
          </StyledLink>
        </Group>
      </GroupCard>
      {/* <Group>
        <form>
          <InputText
            name="name"
            type="text"
            label="Quantidade de vagas"
            placeholder="Insira quantidade de vagas"
          />
          <Button type="submit">Aprovar</Button>
        </form>
      </Group> */}
    </Card>
  );
};

export default CardEnterprise;