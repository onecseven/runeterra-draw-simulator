import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import store from "./store"
import { DeckInput } from "./features/deck/DeckInput"
import "./nes.min.css"
import { DeckList } from "./features/deck/DeckList"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div className="grid-container">
            <div className="deck">
              <h1> Submit deck code</h1>
              <DeckInput />)
              <DeckList />
            </div>
          </div>
        </Provider>
      </div>
    )
  }
}

export default hot(module)(App)
