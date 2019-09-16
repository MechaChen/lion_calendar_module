import React from "react";
import ReactDOM from "react-dom";
import Calendar from './components/Calendar.jsx';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import "reset.css/reset.css";
import "./styles/style.scss";

const store = configureStore()

class App extends React.Component {
  render() {
    return (
      <Calendar />
    );
  }
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(jsx, document.getElementById("calendar"));
