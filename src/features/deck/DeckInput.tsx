import React, {useState} from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { addDeck } from "../../store/dataSlice"

export const DeckInput = () => {
  const dispatch = useDispatch()
  const [label, setLabel] = useState("CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA")
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(addDeck({code: label}))
  }

  return (
    <div className="deck-input">
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
