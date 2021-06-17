import React from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { removeMulligan, removeTag } from "../../store/dataSlice"

export const RemoveButton = ({
  type,
  index,
}: {
  type: "TAG" | "MULLIGAN"
  index: number
}) => {
  const dispatch = useDispatch()

  const handleRemove = (event) => {
    event.preventDefault()
    if (type === "MULLIGAN") dispatch(removeMulligan({ index }))
    else if (type === "TAG") dispatch(removeTag({ index }))
  }

  return (
    <>
      <a href="#" style={{"padding": "4px 9px", "color": "red"}} onClick={handleRemove}>
        (Delete)
      </a>
    </>
  )
}
