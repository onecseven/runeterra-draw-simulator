import React, {useState} from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { addDeck, addMulligan} from "../../store/dataSlice"

export const Test = () => {
  const dispatch = useDispatch()
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(addDeck({code: 'CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA'}))
    dispatch(addMulligan({mulliganAction: "THROW", condition: "ALWAYS", referent: "01SI015", reference: null}))
  }

  return (
    <div className="test">
      <form onSubmit={handleSubmit}>
        <button type="submit">Test</button>
      </form>
    </div>
  )
}