import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './ContactList';
import Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/contacts" component={ContactList} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
