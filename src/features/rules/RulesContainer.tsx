import React, { useState } from "react"
import { MulliganContainer } from "./mulligan/MulliganContainer"
import { TagContainer } from "./tags/TagContainer"
import { useAppSelector as useSelector } from "../../store/hooks"
import "./rules.scss"

type RULE_SWITCH = "MULLIGAN" | "TAG"

export const RulesContainer = () => {
  const [ruleSwitch, setRuleSwitch] = useState<RULE_SWITCH>("MULLIGAN")
  const deckLength = useSelector((state) => state.data.deck.cards.length)
  const handleChange = (event: { target: HTMLInputElement }) => {
    if (event.target.value == "MULLIGAN" || event.target.value == "TAG") {
      setRuleSwitch(event.target.value)
    }
  }
  let switchingElement = (
    <>{ruleSwitch === "MULLIGAN" ? <MulliganContainer /> : <TagContainer />}</>
  )

  return (
    <ul className="tabs" role="tablist">
      <li className="tab-li">
        <input type="radio" name="tabs" id="tab1" className="tab-input" checked />
        <label
          htmlFor="tab1"
          role="tab"
          aria-selected="true"
          aria-controls="panel1"
          tabIndex={0}
        >
          Mulligan
        </label>
        <div
          id="tab-content1"
          className="tab-content"
          role="tabpanel"
          aria-labelledby="description"
          aria-hidden="false"
        >
          <MulliganContainer/>
        </div>
      </li>

      <li className="tab-li">
        <input type="radio" name="tabs" className="tab-input" id="tab2" />
        <label
          htmlFor="tab2"
          role="tab"
          aria-selected="false"
          aria-controls="panel2"
          tabIndex={0}
        >
          Tags
        </label>
        <div
          id="tab-content2"
          className="tab-content"
          role="tabpanel"
          aria-labelledby="specification"
          aria-hidden="true"
        >
          <TagContainer/>
        </div>
      </li>
    </ul>
  )
}
