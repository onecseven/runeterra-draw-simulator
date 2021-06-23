import React, { useState } from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"
import { runMulligan, tagInitialState, runTags} from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"
import { setSpinnerOn } from "../../store/uiSlice"
import { countTags } from "../utils/simulateCounter"
import { getMulliganedHands, getNumberOfTurns } from "../utils/simulateMulligan"
import { useStateCallback } from "../utils/generic/useStateCallback"

export const NumberSimInput = () => {
  const dispatch = useDispatch()
  const mulliganQueries = useSelector((state) => state.data.mulliganQueries)
  const deck = useSelector((state) => state.data.deck.cards)
  const counters = useSelector((state) => state.data.tags.counters)

  const handleSubmit = (numberOfSimulations) => {
    event.preventDefault()
    setTimeout(() => dispatch(setSpinnerOn()), 1)
    setTimeout(() => {
      if (numberOfSimulations > 100000) numberOfSimulations = 100000
      let turns = getNumberOfTurns(counters)
      let hands = getMulliganedHands({deck, numberOfSimulations, mulliganQueries}).map(hand => hand.slice(0, turns+4))
      for (let index in counters) {
        let tag = counters[index].tag
        let hits = countTags({ hands, tag })
        dispatch(runTags({index: Number(index), hits, hands: hands.length}))
      }
    }, 2)
  }

  return (
    <>
      <InputBox
        onSubmit={handleSubmit}
        type="number"
        placeholder="Amount of hands to calculate"
        buttonText="Calculate"
        className="deck-input normalpointer"
      />
    </>
  )
}
