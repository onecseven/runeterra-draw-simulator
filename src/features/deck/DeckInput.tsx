import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"
import { addDeck } from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"

export const DeckInput = () => {
  const dispatch = useDispatch()
  const deckCode = useSelector((state) => state.data.deck.code)
  const notif = useSelector((state) => state.ui.deckInputNotif)
  const handleSubmit = (code) => {
    event.preventDefault()
    dispatch(addDeck({ code }))
  }

  return (
    <>
      <h2>Import deck code</h2>
      <InputBox
        className={`deck-input ${notif ? notif : ""}`}
        onSubmit={handleSubmit}
        placeholder={deckCode ? deckCode : "Paste your deck code here"}
        type="text"
        buttonText="Import"
      />
    </>
  )
}
