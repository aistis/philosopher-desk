import React, { useContext, createContext, useState } from "react";

const fakeAuth = {
  isAuthenticated: false,
  signin(email, password, cb) {
    if(password === 'buba') {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    }
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password, cb) => {
    return fakeAuth.signin(email, password, () => {
      setUser(email);
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}
