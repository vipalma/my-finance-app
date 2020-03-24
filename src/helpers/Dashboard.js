import React from 'react';
import CallMade from '@material-ui/icons/CallMade';
import CallReceived from '@material-ui/icons/CallReceived';
import AttachMoney from '@material-ui/icons/AttachMoney';

const saida = {
    backgroundColor: 'red',
  };
  
  const entrada = {
    backgroundColor: 'green',
  };

export const cardOptions = 
[
    { 
        titleID: 'saldoInicial',
        icon: <AttachMoney />,
        // iconColor: blue,
    },
    { 
        titleID: 'entradas',
        icon: <CallMade />,
        iconColor: entrada,
    },
    { 
        titleID: 'saidas',
        icon: <CallReceived />,
        iconColor: saida,
    },    
    { 
        titleID: 'saldoFinal',
        icon: <AttachMoney />,
        // iconColor: entrada,
    },        
]
