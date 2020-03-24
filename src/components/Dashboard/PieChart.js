import React, { useEffect } from "react";
import useGlobal from "../../store";
import { Chart } from "react-google-charts";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { setText } from "../../i18n/utils";

const useStyles = makeStyles(theme => ({
    root:{
        padding: theme.spacing(2),  
    },
    paper: {
      padding: theme.spacing(2),
    //   marginLeft:'auto',
      width:  '100%',
      height: '100%',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      fontWeight: "bold",
    },
  }));

const PieChart = () => {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();
  const { prediction, intl, drawer, chartWrapper } = globalState;

  const getText = id => {
    return setText(intl, id);
  };

   return (
        <Grid className={classes.root} item   xs={12} sm={12} md={3}>
            <Paper className={classes.paper} >
                <h1>Teste</h1>    
            </Paper>                                
        </Grid>
  );
};

export default PieChart;
