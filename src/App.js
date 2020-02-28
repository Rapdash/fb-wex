import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { FirebaseContext } from "./firebase/firebase";
import { AuthUserContext } from "./firebase/authUser";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoute } from "./components/PrivateRoute";

export const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const Firebase = useContext(FirebaseContext);
  useEffect(() => {
    const listener = Firebase.auth.onAuthStateChanged(user => {
      user ? setAuthUser(user) : setAuthUser(null);
    });
    return () => listener();
  }, [Firebase.auth]);
  
  return (
     <AuthUserContext.Provider value={authUser}>
      <Router>
        <Layout>
          <Route path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={LoginPage} />
          <Route path="/password-reset" component={PasswordResetPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
        </Layout>
      </Router>
    </AuthUserContext.Provider>
  );
}
