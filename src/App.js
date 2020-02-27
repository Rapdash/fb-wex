import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/login" component={LoginPage} />
      </Layout>
    </Router>
  );
}

export default App;
