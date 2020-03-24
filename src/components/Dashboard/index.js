import React from 'react';
import useGlobal from "../../store";
import TopCards from "./TopCards"
import Grafico from "./Grafico"
import PieChart from "./PieChart"
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    // width: '100%',
    padding: theme.spacing(0),
  },
  containerGrafico:{
    display:'flex',
    padding: theme.spacing(0),
  }
}));


export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <TopCards />
      </div>
      <Box className={classes.containerGrafico} >
        <Grafico />
        <PieChart />
      </Box>
    </div>
  );
}