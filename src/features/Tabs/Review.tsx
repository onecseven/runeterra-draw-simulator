import React from "react"
import { MulliganList } from "../rules/mulligan/MulliganList"
import { TagList } from "../rules/tags/tag displays/TagList"
import "./review.scss"

export const Review = (props) => {
  return (
    <div className="review">
      <div className="mulligan">
        <h3>Mulligan Rules</h3>
        <MulliganList/>
      </div>
      <div className="counter">
        <h3>Counters</h3>
        <TagList/>
      </div>
    </div>
  )
}
