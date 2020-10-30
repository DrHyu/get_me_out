import SearchPage from "./pages/Search";
import LandingPage from "./pages/Landing";
import NavBar from "./components/nav/NavBar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/search" component={SearchPage} exact />
      </Switch>
    </div>
  );
}

export default App;
