import React from "react"
import { RegulatedInput } from "../../../utils/generic/UI/RegulatedInput"

export const CardAmountPicker = () => {

  return (
    <div  className="cardAmount">
      <p>How many cards should we keep track of?</p>
      <RegulatedInput
        name="cardAmountInput"
        onSelectedChange={() => null}
        max={5}
        min={1}
      />
    </div>
  )
}
