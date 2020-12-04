import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(4),
      padding: theme.spacing(2),
      width: '100%',
    },
  },
  button: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  error: {
    color: 'tomato',
  }
}));

const NoMatch = () => {
  const classes = useStyles();
  const history = useHistory()
  let location = useLocation();

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h2" gutterBottom>Page not found <span className={classes.error}>404</span></Typography>
        <Typography variant="subtitle1" gutterBottom> No match for <span className={classes.error}>..{location.pathname}</span></Typography>
        <Button className={classes.button} variant="contained" color="primary" onClick={()=> {history.replace('/chats')}}>Back to main page</Button>
      </Paper>
    </div>
  );
}

export default NoMatch