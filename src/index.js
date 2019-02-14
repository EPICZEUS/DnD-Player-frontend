import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import ws from './ws';

const store = createStore(reducer);

ws.addEventListener('message', message => {
	const data = JSON.parse(message.data);

	if (data.type === "ping") return;

	// console.log(message, data);

	if (data.message) store.dispatch(data.message);
});

// function reducer(state = {}, action) {
// 	switch(action.type) {
// 	case "TODO":
// 		return null;
// 	case "LOAD_CREATURES":
// 		return { ...state, creatures: action.payload };
// 	case "LOAD_CAMPAIGNS":
// 		return { ...state, campaigns: action.payload };
// 	case "ADD_CAMPAIGN":
// 		return { ...state, campaigns: [ ...state.campaigns, action.payload ]};
// 	case "SELECT_CREATURE":
// 		return { ...state, selectedCreature: action.payload };
// 	case "DELETE_CAMPAIGN":
// 		return { ...state, campaigns: state.campaigns.filter(c => c.id !== action.payload) };
// 	case "LOGIN":
// 		localStorage.token = action.payload.token;
// 		return { ...state, user: action.payload.user };
// 	case "LOGOUT":
// 		return { ...state, user: undefined };
// 	default:
// 		return state;
// 	}
// }

if (localStorage.token && localStorage.token !== "undefined") {
	fetch("http://localhost:3000/api/v1/retrieve", { headers: { Authorization: "Bearer " + localStorage.token }})
		.then(r => r.json())
		.then(payload => store.dispatch({ type: "LOGIN", payload }));
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
