import React from 'react';
import LandingPage from './Components/LandingPage';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  return (
    <Router>

      <Switch>

        <Route exact path="/">
          <Redirect to="/main" />
        </Route>


        <Route path="/main">
          <LandingPage />
        </Route>

      </Switch>
    </Router>
  );
}




export default App;
