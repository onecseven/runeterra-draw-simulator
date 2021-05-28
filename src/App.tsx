import React, { Component } from "react"
// import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { DeckInput } from "./features/deck/DeckInput"
import "./App.css"  
import { DeckList } from "./features/deck/DeckList"
import { RulesContainer } from "./features/rules/RulesContainer"
import { NumberSimInput } from "./features/simulation/NumberSimInput"
import { CounterList } from "./features/rules/tags/tag displays/CounterList"

import { Test } from "./features/test/Test"

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
              <Test/>
              <DeckList />
            </div>
            <div className="rules">
              <RulesContainer/>
            </div>
            <div className="sim">
              <NumberSimInput/>
              <CounterList/>
            </div>
          </div>
        </Provider>
      </div>
    )
  }
}

// export default hot(module)(App)
export default App
