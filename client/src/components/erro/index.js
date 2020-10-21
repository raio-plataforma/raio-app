import { Button } from '@material-ui/core';
import React from 'react';
import { Title } from '../../pages/Signup/styles';
import './style.css';

export default function Erro({ erro }) {
    return (
        <center>
            <br />
            <Title style={{ color: '#fbcc94' }}>
                ERRO: {erro}
            </Title>
            <br />
            <Button onClick={() => { window.location.reload() }} variant="contained" color="primary">Tentar novamente!</Button>

        </center>
    );
}
