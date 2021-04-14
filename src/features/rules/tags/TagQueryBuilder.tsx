import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { deckFilter } from "../../utils/deckFilter"
import { Dropdown } from "../../utils/Dropdown"
import { ExtensibleDropdown } from "../../utils/ExtensibleDropdown"
import { RadioChoices } from "../../utils/RadioChoices"
import { useStateCallback } from "../../utils/useStateCallback"
import { TAG_TYPES, add, TIMING} from "./tagSlice"

type BuilderProps = {
  selectedCard: Card
  goDormant: Function
}

export const TagQueryBuilder = ({ selectedCard, goDormant }: BuilderProps) => {
  const deck = useSelector((state) => state.deck.cards)
  const dispatch = useDispatch()
  const [timing, setTiming] = useStateCallback<UIElementIterator["value"]>(TIMING.map(({value}) => value)[0])
  const [type, setType] = useStateCallback<UIElementIterator["value"]>(TAG_TYPES.map(({value}) => value)[0])
  const [reference, setReferenceCard] = useStateCallback<Card["code"][] | null>(null)

  if (!deck || !selectedCard) return null
  
  const handleSubmit = () => {
    console.log(`
    timing: ${timing}
    type: ${type}
    referece: ${reference}`)
    dispatch(add(
{      timing, type, reference
}      ))
    goDormant()
  }

  let referenceVisibility = (type === "WITH" || type === "WITHOUT" || type === "SEQUENCE") 

  return (
    <div>
      <Dropdown
        options={TAG_TYPES}
        name={"types"}
        onSelectedChange={setType}
      />
      <RadioChoices
        options={TIMING}
        name={"timing"}
        onSelectedChange={setTiming}
      />
       {referenceVisibility ? (
        <ExtensibleDropdown
          options={deckFilter(deck)}
          name={"deck"}
          onSelectedChange={setReferenceCard}
        />
      ) : null}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
