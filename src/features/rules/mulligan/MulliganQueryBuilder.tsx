import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/generic/UI/Dropdown"
import { CONDITIONS, ACTIONS } from "../../../store/constants"
import { addMulligan } from "../../../store/dataSlice"
import { RadioChoices } from "../../utils/generic/UI/RadioChoices"
import { deckFilter } from "../../utils/deckFilter"
import { useStateCallback } from "../../utils/generic/useStateCallback"

type BuilderProps = {
  goDormant: Function
}

export const MulliganQueryBuilder = ({ goDormant }: BuilderProps) => {
  const deck = useSelector((state) => state.data.deck.cards)
  const dispatch = useDispatch()
  const [action, setAction] = useStateCallback<mulliganAction | null>("KEEP_ALL")
  const [condition, setCondition] = useStateCallback<mulliganCondition | null>(
    "ALWAYS"
  )
  const [referenceCard, setReferenceCard] = useStateCallback<
    Card["code"] | null
  >(null)
  const [mainCard, setMainCard] = useStateCallback<Card["code"] | null>(null)
  // prettier-ignore
  const handleSubmit = () => {
    dispatch(addMulligan({mulliganAction: action, condition, reference: referenceCard, referent: mainCard }))
    goDormant()
  }

  if (deck.length == 0) return null

  let deckOptions = deckFilter(deck)
  deckOptions.unshift({ value: "", name: "Choose a card." })
  return (
    <div>
      <br />
      <Dropdown
        options={deckOptions}
        name={"reference"}
        onSelectedChange={setMainCard}
      />
      <RadioChoices
        options={ACTIONS}
        name={"actions"}
        onSelectedChange={setAction}
      />
      <RadioChoices
        options={CONDITIONS}
        name={"conditions"}
        onSelectedChange={setCondition}
      />
      {condition === "ALWAYS" ? null : (
        <Dropdown
          options={deckOptions}
          name={"deck"}
          onSelectedChange={setReferenceCard}
        />
      )}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
