import React from 'react';
import loading from '../../assets/loading.svg';
import './style.css';

export default function Loading()
{
    return(
        <div className={'general-loading'}>
            <img src={loading} alt={''}/>
        </div>
    );
}
