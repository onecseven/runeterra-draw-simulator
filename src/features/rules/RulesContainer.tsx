import React, { useState } from "react"
import { MulliganContainer } from "./mulligan/MulliganContainer"
import { TagContainer } from "./tags/TagContainer"
import { useAppSelector as useSelector } from "../../store/hooks"

type RULE_SWITCH = "MULLIGAN" | "TAG"

export const RulesContainer = () => {
  const [ruleSwitch, setRuleSwitch] = useState<RULE_SWITCH>("MULLIGAN")
  const deck = useSelector((state) => state.data.deck.cards)
  const handleChange = (event: { target: HTMLInputElement }) => {
    if (event.target.value == "MULLIGAN" || event.target.value == "TAG") {
      setRuleSwitch(event.target.value)
    }
  }
  let switchingElement = (<>
        {ruleSwitch === "MULLIGAN" ? (<MulliganContainer/>) : (<TagContainer/>)}
      </>)
  return (
    <div className="nes-container is-rounded with-title">
      <div className="title" style={{ display: "flex", backgroundColor: "transparent"}} >
        <label style={{backgroundColor: "var(--main-bg-color)", marginTop: "-8px", paddingRight: "15px"}}>
          <input
            type="radio"
            onChange={handleChange}
            className="nes-radio"
            name="answer"
            checked={ruleSwitch === "MULLIGAN"} 
            value="MULLIGAN"
          />
          <span>Mulligan</span>
        </label>
        <hr></hr>
        <label style={{backgroundColor: "var(--main-bg-color)", marginTop: "-8px", paddingRight: "15px"}}>
          <input
            type="radio"
            className="nes-radio"
            onChange={handleChange}
            checked={ruleSwitch === "TAG"} 
            name="answer"
            value="TAG"
          />
          <span>Rules</span>
        </label>
      </div>
      {deck.length > 0 ? switchingElement : null}
    </div>
  )
}
//style={{ marginLeft: "45%" }}