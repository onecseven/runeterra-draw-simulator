import React, {useEffect, useState} from "react"

export const MulliganConditionDropdown = ({ onSelectedChange }) => {
  const [localAction, setlocalAction] = useState(null)
  useEffect(() => {
    onSelectedChange(localAction)
    return () => {
    }
  }, [onSelectedChange, localAction])
  return (
    <select name="condition" value={localAction} onChange={(e) => setlocalAction(e.target.value)}>
      <option value="ALWAYS">Always</option>
      <option value="PRESENCE">In the presence of another card</option>
      <option value="ABSENCE">In the absence of another card</option>
    </select>
  )
}
