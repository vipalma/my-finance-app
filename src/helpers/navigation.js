import React from 'react';
import Dashboard from '@material-ui/icons/Dashboard'; 
import Home from '@material-ui/icons/Home'; 
import Dehaze from '@material-ui/icons/Dehaze'; 
import DataUsage from '@material-ui/icons/DataUsage'; 
import DeviceHub from '@material-ui/icons/DeviceHub'; 
import Equalizer from '@material-ui/icons/Equalizer'; 

export const navigation = 
[
    { 
        title_id: 'inicio',
        route: '/' ,
        icon: <Home />,
    },
    { 
        title_id: 'analise',
        route: '/Analise',
        icon: <Dashboard />,
    },
    { 
        title_id: 'extrato',
        route: '/Extrato' ,
        icon: <Dehaze />,
    },    
]

export const config_nav = 
[
    { 
        title_id: 'categorias',
        route: '/ConfigCateg' ,
        icon: <DataUsage />,
    }, 
    { 
        title_id: 'tpConta',
        route: '/ConfigTpConta',
        icon: <DeviceHub />,
    },
    { 
        title_id: 'projetado',
        route: '/ConfigProjetado' ,
        icon: <Equalizer />,
    },    
]