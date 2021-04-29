import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OtherPage from "OtherPage";
import Home from "Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-Header">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
        </header>
        <Switch>
          <Route exact path="/other">
            <OtherPage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
