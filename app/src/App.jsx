import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux'
import store from "./store"
import {DeckInput} from "./features/deck-code/DeckInput"
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <DeckInput/>
          <h1> Hello, World!!! </h1>
        </Provider>
      </div>
    );
  }
}

export default hot(module)(App);
