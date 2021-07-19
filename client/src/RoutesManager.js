import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import UpdateDetails from "./components/UpdateDetails";
import Err from "./pages/Err";
import MainPage from "./pages/MainPage";
  

const RoutesManager = () => {
    
    return (
        <Router>
            <Switch>
          <Route path="/" exact>
            <MainPage/>
          </Route>
          <Route path="/cms">
            <UpdateDetails/>
          </Route>
          <Route path='/404'>
              <Err type="The page not found."/>
          </Route>
            <Redirect from='*' to='/404' />
        </Switch>
        </Router>
    )
}

export default RoutesManager