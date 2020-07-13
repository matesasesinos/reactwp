import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <section>
        <Router>
          <Switch>
            <Home exact path="/" />
            <Route path="/post/:id-:slug" component={SinglePost} />
            <Route path="/login" component={Login} />
            <Route path="/panel/:userName" component={Dashboard} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;
