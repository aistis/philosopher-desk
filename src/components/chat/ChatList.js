import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import db from '../../services/db';
import { useAuth } from "../../auth/useAuth";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const cryptoRandomString = require('crypto-random-string');
const chat = {
  messages : [
    {user: 'bot', message: 'Hello My friend. This is a chat application that response to you with the very smart answer. In case you too smart it always has an option to ofer you a Google services. So treat it with patience and enjoy!'}
  ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  floatingButton: {
    position: 'fixed',
    bottom: '60px',
    right: '20px'
  },
}));

const ChatsPage = () => {
  const [chats, setChats] = useState([])
  const [user, setUser] = useState({})
  const auth = useAuth();
  let history = useHistory();

  const linkElement = (chat) => {
    return <Button onClick={()=> {history.replace(`/chats/${chat.id}`)}} size="small" color="primary">Continue chat</Button>
  }
  const deleteElement = (chat) => {
    return <Button onClick={()=> {removeFromChats(chat)}} size="small" color="primary">Remove</Button>
  }

  const addToChats = (chat) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    }
    chat.id = cryptoRandomString({length: 20})
    chat.host = auth.user
    chat.date = new Date()
    chat.image = `https://picsum.photos/id/${getRandomInt(100)}/400/300`
    db.table('chats')
      .add(chat)
    history.replace(`/chats/${chat.id}`)
  }
  const removeFromChats = (chat) => {
    db.table('chats')
      .delete(chat.id)
    loadChats()
  }
  const loadChats = async () => {
    const data = await db.chats.where("host").equalsIgnoreCase(auth.user).limit(20).toArray()
    const userData = await db.profile.where("id").equalsIgnoreCase(auth.user).toArray()
    setUser(userData[0])
    setChats(data)
  }

  useEffect(() => {
    loadChats()
  },[])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {chats.map((chat) => { 
          return (
            <Grid key={chat.id} item sm={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea onClick={()=> {history.replace(`/chats/${chat.id}`)}}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={chat.image ? chat.image : "/logo512.png"}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {user.name? user.name : user.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Messages: {chat.messages.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Created: {moment(chat.date).fromNow()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {linkElement(chat)}
                  {deleteElement(chat)}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
      <Fab 
        className={classes.floatingButton} 
        color="primary" 
        aria-label="add" 
        onClick={() => addToChats(chat)}>
        <AddIcon />
      </Fab>
    </div>
  );
}
export default ChatsPage