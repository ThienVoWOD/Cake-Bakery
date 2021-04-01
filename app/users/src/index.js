import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/headerComponent';
import Content from './components/contentComponent';
import Footer from './components/footerComponent';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import store from './storeReducer';

class App extends React.Component {
	render() {
		return (
		  <BrowserRouter>
		  <React.Fragment>
		  	<Header />
		  	<Content />
		  	<Footer />
		  </React.Fragment>
		  </BrowserRouter>
		);
	}
}

ReactDOM.render(<Provider store={createStore(store)}>
				  <App />
				</Provider>, document.getElementById('root'));