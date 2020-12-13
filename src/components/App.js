import './App.css';

import { Router, Route, Switch, NavLink } from 'react-router-dom';
import history from '../history';
import ContactList from './ContactList';
import Login from './Login';
import Profile from './Profile';

function App() {
  console.log('render');
  return (
    <Router history={history}>
      <div className="App">
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <Switch>
          <Route path="/contacts" component={ContactList} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
