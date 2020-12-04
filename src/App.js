import React from "react";
import { ProvideAuth, useAuth } from "./auth/useAuth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from "./components/public/Header"
import Profile from "./components/profile/Profile"
import ChatList from "./components/chat/ChatList"
import Chat from "./components/chat/Chat"
import LandingPage from "./components/landingPage/LandinPage"
import LoginPage from "./components/public/LoginPage"
import NoMatch from "./components/landingPage/NoMatch"
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '70px',
    marginBottom: '100px',
  },
}));

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  const classes = useStyles();
  return (
    <ProvideAuth>
      <Router>
        <Header />
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12}>
            <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/chats/:id">
              <Chat />
            </PrivateRoute>
            <PrivateRoute path="/chats">
              <ChatList />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            
            <PrivateRoute path="*">
              <NoMatch />
            </PrivateRoute>
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </ProvideAuth>
  );
}

export default App

