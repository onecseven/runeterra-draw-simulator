import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import store from "./store"
import { DeckInput } from "./features/deck/DeckInput"
import "./nes.min.css"
import { DeckList } from "./features/deck/DeckList"
import {MulliganQueryBuilder} from "./features/mulligan/MulliganQueryBuilder"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
              <h1> Submit deck code</h1>
          <div className="grid-container">
            <div className="deck">
              <DeckInput />
              <DeckList />
            </div>
              <MulliganQueryBuilder/>
          </div>
        </Provider>
      </div>
    )
  }
}

export default hot(module)(App)
