import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { DeckInput } from "./features/deck/DeckInput"
import "./nes.min.css"
import "./App.css"  
import { DeckList } from "./features/deck/DeckList"
import { MulliganContainer } from "./features/mulligan/MulliganContainer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <h1>Submit deck code</h1>
          <br />
          <div className="grid-container">
            <div className="deck">
              <DeckInput />
              <DeckList />
            </div>
            <div className="rules">
              <MulliganContainer/>
            </div>
          </div>
        </Provider>
      </div>
    )
  }
}

export default hot(module)(App)
