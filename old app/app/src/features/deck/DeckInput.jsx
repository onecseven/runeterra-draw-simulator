import React, {useState} from "react"
import { useDispatch } from "react-redux"
import {add} from "./deckSlice"

export const DeckInput = () => {
  const dispatch = useDispatch()
  const [label, setLabel] = useState("CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA")
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(add({code: label}))
  }

  return (
    <div>
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
