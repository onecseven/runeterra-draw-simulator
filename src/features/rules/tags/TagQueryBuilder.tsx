import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { deckFilter } from "../../utils/deckFilter"
import { Dropdown } from "../../utils/Dropdown"
import { RadioChoices } from "../../utils/RadioChoices"
import { TAG_TYPES, add, TIMING} from "./tagSlice"

type BuilderProps = {
  selectedCard: Card
  goDormant: Function
}

export const TagQueryBuilder = ({ selectedCard, goDormant }: BuilderProps) => {
  const deck = useSelector((state) => state.deck.cards)
  const dispatch = useDispatch()
  const [timing, setTiming] = useState<UIElementIterator["value"]>(TIMING.map(({value}) => value)[0])
  const [type, setType] = useState<UIElementIterator["value"]>(TAG_TYPES.map(({value}) => value)[0])
  const [reference, setReferenceCard] = useState<Card["code"] | null>(null)
  const timingCallback = useCallback((timing) => setTiming(timing), [])
  const typeCallback = useCallback((type) => setType(type), [])
  const deckCallback = useCallback((card) => setReferenceCard(card), [])

  if (!deck || !selectedCard) return null
  
  const handleSubmit = () => {
    dispatch(add(
      "?"
    ))
    goDormant()
  }

  let referenceVisibility = (type === "WITH" || type === "WITHOUT" || type === "SEQUENCE") 

  return (
    <div>
      <Dropdown
        options={TAG_TYPES}
        name={"types"}
        onSelectedChange={typeCallback}
      />
      <RadioChoices
        options={TIMING}
        name={"timing"}
        onSelectedChange={timingCallback}
      />
       {referenceVisibility ? (
        <Dropdown
          options={deckFilter(deck)}
          name={"deck"}
          onSelectedChange={deckCallback}
        />
      ) : null}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
