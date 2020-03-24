import React from 'react';
import useGlobal from "../../store";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {setText} from '../../i18n/utils'
import {convertToMoney} from '../../helpers/general';
import { cardOptions } from '../../helpers/Dashboard'

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    display:'flex',
    height: '100%',
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  title:{
    fontWeight: 900,
  },
  avatar:{
    marginLeft: 'auto',
    backgroundColor: '#3f51b5',
  }
}));



export default function FullWidthGrid() {
  const classes = useStyles();
  const [globalState] = useGlobal();
  const { prediction, selectedDate, intl } = globalState;  
  const filtered = prediction.filter( item => item.date === selectedDate );
  

  const getText = (id) => {
    return  setText(intl, id);
   }
   
  return (
    <div className={classes.root}>    
      <Grid container spacing={3}>
      {
        filtered.map((obj, index) => 
          (
            Object.keys(obj).map((key, index) => { 

              const opt = cardOptions.find(item => item.titleID === key )
              

              return (key !== 'date') ? 
              (
                  <Grid key={index} item xs={12} sm={12} md={3}>
                    <Paper className={classes.paper}>
                      <Box>
                        <Typography className={classes.title} variant="body2" color='textSecondary' component="p" gutterBottom={true}>
                          {getText(key)}
                        </Typography>                      
                        <Typography variant='h5' component="h5">
                        {convertToMoney(obj[key])}
                        </Typography>
                      </Box>
                        <Avatar className={classes.avatar} style={opt.iconColor} >
                          {opt.icon}
                        </Avatar>     
                  </Paper>                            
                  </Grid>
              ) : '' }
          )
        )
        )
      }
      </Grid>
    </div>
  );
}