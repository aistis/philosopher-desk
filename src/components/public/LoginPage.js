import React, { useState } from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../auth/useAuth';
import { useLocation, useHistory } from 'react-router-dom';
import db from '../../services/db';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignInPage = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();
  let location = useLocation();
  const auth = useAuth();

  let { from } = location.state || { from: { pathname: '/' } };
  let login = async (email, password) => {
    auth.signin(email, password, async () => {
      const user = await db.table('profile').where("id").equalsIgnoreCase(email).toArray()
      const userExists = user.length > 0
      db.profile.put({id: email, name: userExists ? user[0].name : ''})
      .then(() => history.replace(from))
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  }

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const Copyright = () => {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='/'>
          Philosopher desk
        </Link>{' '}
        {moment().format('YYYY')}
        {'.'}
      </Typography>
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={!validateForm()}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignInPage