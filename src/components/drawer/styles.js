import { makeStyles } from '@material-ui/core/styles';

export const useStylesDrawer = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    pointer: {
      cursor: "pointer",
    }
  }));