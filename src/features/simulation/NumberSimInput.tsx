import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"

export const NumberSimInput = () => {
  const dispatch = useDispatch()
  const [label, setLabel] = useState(0)
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    // dispatch(run({code: label}))
  }

  return (
    <div className="deck-input">
      <form onSubmit={handleSubmit}>
        <input 
        type="number"
        value={label}
        onChange={(e) => setLabel(Number(e.target.value))}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}