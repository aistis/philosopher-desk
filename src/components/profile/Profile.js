import React, { useState, useEffect } from "react";
import db from '../../services/db';
import { useAuth } from "../../auth/useAuth";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  }
}));

const Profile = () => {
  const classes = useStyles();
  const auth = useAuth();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    return name? true : false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true)
    const timer = setTimeout(() => {
      db.profile
      .put({id: auth.user, name})
      .then(() => setSubmitted(false))
    }, 1500);
    return () => clearTimeout(timer);
    
  }

  const loadProfile = async () => {
    const data = await db.table('profile').where("id").equalsIgnoreCase(auth.user).toArray()
    setName(data[0].name)
  }

  useEffect(() => {
    loadProfile()
  },[])

  return (
    <div className={classes.root}>
      <Paper>
        
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h2" gutterBottom>Profifle{submitted ? <LinearProgress /> : name ? `: ${name}` : ''}</Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='name'
                label='Your name'
                name='name'
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={!validateForm()}
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Profile