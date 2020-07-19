import {
    NotFound,
    Signin,
} from './pages';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import AppProvider from './components/AppProvider/AppProvider';
import Dashboard from './containers/Dashboard';
import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import { loadUser } from './actions/auth';

store.dispatch(loadUser())
render(
    <Provider store={store}>
        <AppProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/404" component={NotFound} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </AppProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
