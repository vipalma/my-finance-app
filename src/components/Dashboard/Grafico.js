import React, { useEffect } from "react";
import useGlobal from "../../store";
import { Chart } from "react-google-charts";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { setText } from "../../i18n/utils";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    //   display:'flex',
      width:  '100%',
      height: '100%',
      // textAlign: 'center',
      // color: theme.palette.text.secondary,
      fontWeight: "bold",
    },
  }));

const PredictionTable = () => {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();
  const { setChartWrapper } = globalActions.actChart;

  const { prediction, intl, drawer, chartWrapper } = globalState;
  
  const getText = id => {
    return setText(intl, id);
  };

  const draw = () => {
  if (chartWrapper !== null) {      
      chartWrapper.draw();
    }
}


  useEffect(() => {
    document.addEventListener('mousemove', draw);
    // document.getElementById("grafico").addEventListener('mousemove', draw);
    draw()
  }, [drawer.open]);  

  const data = [["Mês", "Entradas", "Saídas", "Saldo Final"]];

  prediction.forEach(item => {
    const line = [];

    const obj = JSON.parse(JSON.stringify(item));

    line.push(obj.date);
    delete obj.date;

    obj.entradas += obj.saldoInicial;
    delete obj.saldoInicial;

    Object.keys(obj).forEach(key => {
      line.push(Number(obj[key]));
    });

    data.push(line);
  });


   return (
    // xs={9} sm={9} md={9}
    //  <Box className={classes.root} id='grafico'  >
        <Grid className={classes.root}  item xs={12} sm={12} md={9}>
        <Paper className={classes.paper}>
            <Chart 
            width={'auto'}
            height={"400px"}
            chartType="ComboChart"
            loader={<div>{getText("loading")}</div>}
            data={data}
            getChartWrapper={chartWrapper => setChartWrapper(chartWrapper) }
            options={{
                chartArea: { left: '10%', top: '10%', width: '80%', height: "75%"  },                
                isStacked: false,
                seriesType: "bars",
                legend: { position: "bottom" },
                series: { 2: { type: "line" } },
            }}
            />  
    </Paper>                                
  </Grid>
//   </Box> 
  );
};

export default PredictionTable;
