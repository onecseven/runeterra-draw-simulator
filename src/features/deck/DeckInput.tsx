import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"
import { addDeck } from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"
import { deckCodeTranslation } from "../utils/Deck-Code-Lookup"
import { setDeckInputFailure, setDeckInputSuccess } from "../../store/uiSlice"

export const DeckInput = ({analytics}) => {
  const dispatch = useDispatch()
  const deckCode = useSelector((state) => state.data.deck.code)
  const notif = useSelector((state) => state.ui.deckInputNotif)
  const handleSubmit = async (code) => {
    event.preventDefault()
    try {
      let cards = await deckCodeTranslation(code)
      analytics(code)
      dispatch(addDeck({cards, code}))
      dispatch(setDeckInputSuccess())
    } catch (e) {
      console.error(e)
      dispatch(setDeckInputFailure())
    }
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
