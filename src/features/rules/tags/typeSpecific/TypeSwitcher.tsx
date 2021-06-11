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
  } else {
    return (
      <ExtensibleCardChooser />
    )
  }
}
