import React from "react";
import { useAuth } from "../../auth/useAuth";
import { useHistory } from "react-router-dom";
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
  alert: {
    color: 'tomato',
  }
}));

const Welcome = (props) => {
  const { name } = props;
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory()

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h2" gutterBottom>Welcome<span>{name ? `: ${name}` : ''}</span></Typography>
        {
          auth.user ? 
          <Typography variant="subtitle1" gutterBottom>It's been a while since your last visit. Start chating stright away, click on the button bellow.</Typography>
          :
          <Typography variant="subtitle1" gutterBottom>
          It might be that you're visiting the app for the first time. Sigh in (any email you have) by clickicking on the button bellow. Your special secret code: <span className={classes.alert}>"buba"</span>
          </Typography>
        }
        <Button className={classes.button} variant="contained" color="primary" onClick={()=> {history.replace('/chats')}}>See the Chats List</Button>
      </Paper>
    </div>
  );
}

export default Welcome