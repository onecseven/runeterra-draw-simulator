import React from "react"
import {
useAppDispatch as useDispatch,
useAppSelector as useSelector,
} from "../../../../store/hooks"
import { KeywordTagCreator } from "./KeywordTagCreator"
import { ExtensibleCardChooser } from "./ExtensibleCardChooser"

export const TypeSwitcher = () => {
  const tag = useSelector(state => state.ui.tagQuery.type)
  if (tag === "KEYWORD") {
    return <KeywordTagCreator />
  } else if (tag === "WITH" || tag === "WITHOUT" || tag === "SEQUENCE" || tag === "ANY") {
    return (
      <ExtensibleCardChooser />
    )
  } else return null
}
