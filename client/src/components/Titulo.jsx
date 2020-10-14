import { Typography } from '@material-ui/core';
import React from 'react';

export default function Titulo({ children }) {
    return (
        <Typography variant="h2" style={{
            color: '#F9A639',
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            fontSize: '3.0rem',
            fontWeight: '600',
            lineHeight: '1.2',
            color: '#000',
            textAlign: 'center',
            padding: '0px',
            margin: '0px',
            marginTop: '15px',
            marginBottom: '15px',
        }}>
            {children}
        </Typography>
    );
}
