import React, { useState } from "react"
import { MulliganContainer } from "./mulligan/MulliganContainer"

type RULE_SWITCH = "MULLIGAN" | "TAG"

export const RulesContainer = () => {
  const [ruleSwitch, setRuleSwitch] = useState<RULE_SWITCH>("MULLIGAN")
  const handleChange = (event: { target: HTMLInputElement }) => {
    console.log(event.target.value)
    if (event.target.value == "MULLIGAN" || event.target.value == "TAG") {
      setRuleSwitch(event.target.value)
    }
  }
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
      <div>
        {ruleSwitch === "MULLIGAN" ? (<MulliganContainer/>) : (null)}
      </div>
    </div>
  )
}
//style={{ marginLeft: "45%" }}