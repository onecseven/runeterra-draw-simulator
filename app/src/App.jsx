import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux'
import store from "./store"
import {DeckInput} from "./features/deck-code/DeckInput"
import './App.css';
import { DeckList } from './features/deck-code/DeckList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <h1> Submit deck code </h1>
          <DeckInput/>
          <DeckList/>
        </Provider>
      </div>
    );
  }
}

export default hot(module)(App);
