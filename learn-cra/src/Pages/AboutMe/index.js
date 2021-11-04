import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../../components/App';
import configureStore from '../../app/store';

function Routes() {
	return (
		<Switch>
			<Route exact path='/aboutme.html'>
				<h1>This is about me component</h1>
			</Route>
		</Switch>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={configureStore()}>
			<App>
				<Router>
					<Routes />
				</Router>
			</App>
		</Provider>
	</React.StrictMode>,
	document.getElementById('page')
);
