import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { FirebaseContext } from "./firebase/firebase";
import { AuthUserContext } from "./firebase/authUser";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ListingsPage } from "./pages/ListingsPage";
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
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/password-reset" exact component={PasswordResetPage} />
          <PrivateRoute path="/listings" exact component={ListingsPage} />
          <PrivateRoute path="/profile" exact component={ProfilePage} />
        </Layout>
      </Router>
    </AuthUserContext.Provider>
  );
}
