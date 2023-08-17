import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage";
import HomePage from "./components/Home/homePage";
import DeatilDogs from "./components/Deatil/deatilDog";
import Form from "./components/Form/Form";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/HomePage" component={HomePage} />
          <Route path="/deatilDogs/:id" component={DeatilDogs} />
          <Route path="/FormPage" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
