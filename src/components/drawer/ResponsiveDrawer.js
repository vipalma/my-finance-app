import React from 'react';
import clsx from 'clsx';
import useGlobal from "../../store";
import { useStyles } from '../../styles';
import { useStylesDrawer } from './styles'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {  navigation, config_nav } from '../../helpers/navigation';
import { setText } from '../../i18n/utils';
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react';


export default function ResponsiveDrawer() {
  const [globalState, globalActions] = useGlobal();
  const classes = useStyles();
  const local = useStylesDrawer();
  const theme = useTheme();
  const { setOpen } = globalActions.actDrawer;
  const { drawer, intl, dropdownMonthList, selectedDate, fireBase } = globalState;
  const { open } = drawer;

  const getText = (id) => {
    return setText(intl, id);
  }



  const handleDrawerOpen = () => {
    
    setOpen(true);
  };

  const handleDrawerClose = () => {
    
    setOpen(false);
  };

  return (
    <div className={classes.root} id='drawerMenu'>
    <CssBaseline />
      <AppBar position="static">
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={local.title}>
          </Typography>
          <Dropdown
                        placeholder='Selecionar Mês'
                        // fluid
                        search
                        selection
                        value={selectedDate}
                        onChange={(e, target) => globalActions.actDates.selectDate(e, target.value) }
                        options={dropdownMonthList}
                      />
            
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />
        <List>
          {navigation.map((obj, index) => (
            <ListItem button key={obj.title_id} component={Link} to={obj.route}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={getText(obj.title_id)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {config_nav.map((obj, index) => (
            <ListItem button key={obj.title_id} component={Link} to={obj.route}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={getText(obj.title_id)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button key='Sair' onClick={ () => fireBase.signOut()} >
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary='Sair' />
        </ListItem>        
      </Drawer>
    </div>
  );
}