import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory as history } from 'history';
import {
  Route,
  Router,
  Switch
} from 'react-router';
import AppContainer from '../containers/AppContainer';
import routes from '../constants/routes';

const propTypes = {
  store: PropTypes.object.isRequired
};

function Routes() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path={routes.ROOT} render={() => <AppContainer />} />
      </Switch>
    </Router>
  );
}

Routes.propTypes = propTypes;

export default Routes;
