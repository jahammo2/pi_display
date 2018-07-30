import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory as history } from 'history';
import {
  Redirect,
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
        <Route path={routes.DIGIT} render={(props) => <AppContainer {...props} />} />

        <Route
          path={routes.ROOT}
          exact
          render={() => {
            // TODO: bring in pathify to better utilize the constants
            return <Redirect to="/digits/1" />;
          }}
        />
      </Switch>
    </Router>
  );
}

Routes.propTypes = propTypes;

export default Routes;
