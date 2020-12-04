import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  user: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  bot: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  messageWrapper: {
    padding: '20px',
  }
}));

const Message = (props) => {
  const classes = useStyles()
  const {message} = props

  return (
    <Grid xs={10} md={5} item className={message.user !== 'bot'? classes.user : classes.bot}>
      <Paper className={classes.messageWrapper}>
        <Grid container>
          <Grid item xs={3}>
            {message.user === 'bot'? <Avatar className={classes.orange}>B</Avatar> : <Avatar className={classes.purple}>U</Avatar>}
          </Grid>
          <Grid item xs={9}>
            {message.message}
          </Grid>
        </Grid>
      </Paper>
    </Grid>    
  )
}

export default Message