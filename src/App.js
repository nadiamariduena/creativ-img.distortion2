import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
import Home from "./components/curtain_slider/Home";

//
//
function App() {
  //
  //

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/*" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// lazy/locootive scroll:  https://www.npmjs.com/package/locomotive-scroll?activeTab=versions
