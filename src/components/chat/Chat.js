import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import db from '../../services/db';
import presetAnswers from '../../services/answers';
import Message from "./Message";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ERROR_MESSAGE = {valid: true, errorMessage: ''}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexWrap: 'nowrap',
    flexDirection: 'column',
  },
  formWrapper: {
    padding: 10,
    alignItems: 'center',
    '& .MuiGrid-item:first-of-type': {
      textAlign: 'right',
    }
  },
  button: {
    minWidth: 'unset',
    '& .MuiButton-endIcon': {
      margin: 0,
    }
  },
  chatControl: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    left: 0,
  },
  bottomSpace: {
    marginBottom: '100px',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
}));
 
const Chat = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dummy = useRef();
  const [chat, setChat] = useState([]);
  const [answers, setAnswers] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(ERROR_MESSAGE);
  let history = useHistory();

  const loadAnswers=()=>{
    setAnswers(presetAnswers);
  }

  const loadChat = async () => {
    const data = await db.table('chats').get({id})
    setChat(data.messages)
    setLoading(false)
  }
  const updateChat = async (newMessage) => {
    const { messages } = await db.table('chats').get({id})
    messages.push(newMessage)
    db.table('chats').update(id, {messages})
      .then(() => {
        setMessage('')
        setChat(messages)
      })
    return true
  }
  const postAnswer = async () => {
    const { messages } = await db.table('chats').get({id})
    const randomId = Math.floor(Math.random() * 100)
    const randomAnswer = answers[randomId]
    if (randomAnswer) {
      messages.push({user: 'bot', message: randomAnswer})
    } else {
      messages.push({user: 'bot', message: 'Try to google'})
    }
    setLoading(true)
    const timer = setTimeout(() => {
      db.table('chats').update(id, {messages})
      .then(() => {
        setChat(messages)
        setLoading(false)
      })
    }, 1500);
    return () => clearTimeout(timer);
  }
  const handlePost = async (e) => {
    e.preventDefault();
    if(message !=='') {
      updateChat({
        user: 'user',
        message
      })
        .then(() => postAnswer())
      return true
    } else {
      setError({
        valid:false,
        errorMessage: 'Can`t be blank',
      })
    }
  }

  const showChat = (chat) => {
    return chat.length > 0 ? chat.map((message, i) => <Message key={i} message={message}/>) : null
  }

  useEffect(()=>{
    loadAnswers()
    loadChat()
  },[])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat])

  return (
  <Container maxWidth="md">
    <Typography variant="h6" className={classes.title}>Begining of the chat</Typography>
    <Grid container className={classes.root}>
      {showChat(chat)}
      {loading ? <LinearProgress /> : null}
      <span ref={dummy}></span>
    </Grid>
    <Paper className={classes.chatControl}>
      <Grid container className={classes.formWrapper}>
        <Grid item xs={1}>
          <Button 
            color="secondary"
            endIcon={<ArrowBackIosIcon />}
            onClick={() => history.replace('/chats')}
            className={classes.button}
          >
        </Button>
        </Grid>
        <Grid item xs>
          <form className={classes.root} autoComplete="off" onSubmit={(e) => handlePost(e)}>
            <TextField
            error={!error.valid}
            id="outlined-basic" 
            label={!error.valid ? error.errorMessage : "Enter Your Message" }
            variant="outlined"
            value={message}
            onChange={(e) => {
              setError(ERROR_MESSAGE)
              setMessage(e.target.value)
              }}
            />
          </form>
        </Grid>
        <Grid item xs={1}>
          <Button
              color="primary"
              className={classes.button}
              size="large"
              endIcon={<Send />}
              onClick={(e) => handlePost(e)}
            >
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
  )
}

export default Chat