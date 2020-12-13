import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import { Router, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import history from '../history';
import Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <ToastProvider placement="bottom-center">
      <Router history={history}>
        <div className="App">
          <nav>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
          <Redirect path="/" to="/login" />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
