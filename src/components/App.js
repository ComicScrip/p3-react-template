import './App.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContactList from './ContactList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Link to="/contacts">Contacts</Link>
        <Switch>
          <Route exact path="/contacts" component={ContactList} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
