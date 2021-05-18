import React from "react"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import { RemoveButton } from "../../../utils/RemoveButton"
import {Tag} from "./Tag"

export const TagList = () => {
  const queries = useSelector((state) => state.data.tags.counters)
  if (Object.keys(queries).length == 0) return null
  let queryElements: Tag[] = []
  for (let key in queries) {
    let tag = queries[key].tag
    queryElements.push(tag)
  }

  return (<ul>
    {...queryElements.map((query, index) => {
      return (
        <li>
          <Tag tag={query}/>
          <RemoveButton type="TAG" index={index}/>
        </li>
      )
    })}
  </ul>)
}
