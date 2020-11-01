import SearchPage from "./pages/Search";
import LandingPage from "./pages/Landing";
import NavBar from "./components/nav/NavBar";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/search" component={SearchPage} exact />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
