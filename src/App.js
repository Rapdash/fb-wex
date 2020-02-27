import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { FirebaseContext } from "./firebase/firebase";
import { AuthUserContext } from "./firebase/authUser";

function App() {
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
          <Route path="/login" component={LoginPage} />
        </Layout>
      </Router>
    </AuthUserContext.Provider>
  );
}

export default App;
