import React from "react"
import "./rules.scss"
import { MulliganQueryBuilder } from "./Tabs/MulliganQueryBuilder"
import { TagQueryBuilder } from "./Tabs/TagQueryBuilder"
import { Tabs } from "./utils/generic/UI/Tabs/Tabs"
import { Review } from "./Tabs/Review"
import { Help } from "./Tabs/Help"
import { CalculateTab } from "./Tabs/CalculateTab"
import { useAppDispatch as useDispatch } from "../store/hooks"
import { clearUI } from "../store/uiSlice"

export const TabsContainer = () => {
  const dispatch = useDispatch()
  const handleChange = () => {
    dispatch(clearUI())
  }
  return (
      <Tabs
        onChange={handleChange}
        labels={["Mullligan", "Counters", "Review", "Calculate", "HELP"]}
      >
        <MulliganQueryBuilder />
        <TagQueryBuilder />
        <Review />
        <CalculateTab />
        <Help />
      </Tabs>
  )
  //the fragment allows us to group two components in a single tab
}
