import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/app';
import Chat from './components/chat';
import Login from './components/login';

const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ Login } />
      <Route path='/chat' component={ Chat } />
    </Route>
  </Router>
);

export default Routes;