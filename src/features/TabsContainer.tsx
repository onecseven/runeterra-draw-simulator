import React from "react"
import "./rules.scss"
import { MulliganList } from "./rules/mulligan/MulliganList"
import { MulliganQueryBuilder } from "./Tabs/MulliganQueryBuilder"
import { TagList } from "./rules/tags/tag displays/TagList"
import { TagQueryBuilder } from "./Tabs/TagQueryBuilder"
import { Tabs } from "./utils/generic/UI/Tabs/Tabs"
import { Review } from "./Tabs/Review"
import { Help } from "./Tabs/Help"
import { CalculateTab } from "./Tabs/CalculateTab"


export const TabsContainer = () => {
  return (
    <Tabs 
    labels={["Mullligan", "Counters", "Review", "Calculate", "HELP"]}
    >
        <MulliganQueryBuilder />
        <TagQueryBuilder />
        <Review/>
        <CalculateTab/>
        <Help/>
    </Tabs>
  )
//the fragment allows us to group two components in a single tab
}
