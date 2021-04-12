import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
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
  const [timing, setTiming] = useState<UIElementIterator>(TIMING[0])
  const [type, setType] = useState<UIElementIterator>(TAG_TYPES[0])
  const [referenceCard, setReferenceCard] = useState<Card["code"] | null>(null)
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
      {/* {condition === "ALWAYS" ? null : (
        <Dropdown
          options={deckOptions}
          name={"deck"}
          onSelectedChange={deckCallback}
        />
      )} */}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
