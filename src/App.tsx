import React, { Component } from "react"
// import { hot } from "react-hot-loader"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { DeckInput } from "./features/deck/DeckInput"
import "./App.scss"
import { DeckList } from "./features/deck/DeckList"
import { TabsContainer } from "./features/TabsContainer"
import ReactGA from "react-ga"

ReactGA.initialize("UA-200558230-1", {
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
})

ReactGA.pageview(window.location.pathname + window.location.search)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="rotate">
          <img
            src={"./assets/icon-horizontal.png"}
            alt={"please rotate your cellphone"}
            width="100" 
            height="60"
            className="rotate-img" 
          />
        </div>

        <Provider store={store}>
          <div className="header">
            <h1>Tati's LOR Mulligan Simulator</h1>
          </div>
          <div className="grid-container">
            <div className="deck">
              <DeckInput />
              <DeckList />
            </div>
            <div className="rules">
              <TabsContainer />
            </div>
          </div>
        </Provider>
      </div>
    )
  }
}

// export default hot(module)(App)
export default App
