import React from 'react';
import loading from '../../assets/loading.svg';

export default function Loading(){
    return(
        <div className="carregando">
            <center>
            <br/><br/>
            <img src={loading} alt="Imagem de carregando"/>
            <br/>
            <p><b>Carregando...</b></p>
            </center>
        </div>
    );
}
